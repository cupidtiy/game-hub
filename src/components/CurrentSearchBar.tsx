import { Input, InputGroup, InputLeftElement, InputRightElement, Flex, Text } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import useGameQueryStore from '../store';
import useGames from '../hooks/useGames';

const CurrentSearchBar = () => {
  const searchText = useGameQueryStore(s => s.gameQuery.searchText);
  const setSearchText = useGameQueryStore(s => s.setSearchText);
  const gameQuery = useGameQueryStore(s => s.gameQuery);
  const { data, isLoading } = useGames();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // On component mount, sync the URL query parameter with the store
  useEffect(() => {
    const queryParam = searchParams.get('query');
    if (queryParam && queryParam !== searchText) {
      setSearchText(queryParam);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchText = e.target.value;
    
    // Update store
    setSearchText(newSearchText);
    
    // Update URL query parameter
    if (newSearchText) {
      // If we're already on the search page, just update the query param
      if (location.pathname.includes('/games/search')) {
        setSearchParams({ query: newSearchText });
      } else {
        // Navigate to search page if we're not already there
        navigate(`/games/search?query=${encodeURIComponent(newSearchText)}`);
      }
    } else {
      // If search is cleared, remove the query parameter but stay on search page
      if (location.pathname.includes('/games/search')) {
        setSearchParams({});
      }
    }
  };

  // Focus input on mount to show blinking cursor
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Get total count from data
  const totalCount = data?.pages?.[0]?.count || 0;
  
  // Determine if we should show the count (when searching and data has loaded)
  // Note: We'll always show count after loading, even if it's 0 results
  const showCount = searchText && !isLoading && data !== undefined;
  
  return (
    <InputGroup>
      <InputLeftElement>
        <BsSearch />
      </InputLeftElement>
      <Input
        ref={inputRef}
        placeholder="Search games..."
        variant="filled"
        borderRadius="lg"
        value={searchText || ''}
        onChange={handleChange}
        size="md"
        paddingRight={showCount ? "140px" : "4px"}
      />
      {showCount && (
        <InputRightElement width="auto" paddingRight="12px">
          <Flex alignItems="center">
            <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
              Found {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </Text>
          </Flex>
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default CurrentSearchBar;
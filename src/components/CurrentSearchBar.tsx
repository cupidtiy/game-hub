import { Input, InputGroup, InputLeftElement, InputRightElement, Flex, Text, Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { BsSearch, BsX } from 'react-icons/bs';
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

  const handleClear = () => {
    // Clear the search text
    setSearchText('');
    
    // Navigate back to homepage
    navigate('/');
  };

  // Focus input on mount to show blinking cursor
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Get total count from data
  const totalCount = data?.pages?.[0]?.count || 0;
  
  // Determine if we should show the count (when searching and data has loaded)
  const showCount = searchText && !isLoading && data !== undefined;
  
  return (
    <InputGroup>
      <InputLeftElement>
        <BsSearch color="#666" />
      </InputLeftElement>
      <Input
        ref={inputRef}
        placeholder="Search games..."
        variant="filled"
        borderRadius="lg"
        value={searchText || ''}
        onChange={handleChange}
        size="md"
        paddingRight={searchText ? (showCount ? "170px" : "40px") : "4px"}
        bg="#202020"
        _hover={{ bg: "#252525" }}
        _focus={{ bg: "#252525", borderColor: "gray.600" }}
        color="white"
        border="1px solid #333"
      />
      
      {/* Show right elements only when there's search text */}
      {searchText && (
        <InputRightElement width="auto">
          <Flex alignItems="center">
            {/* Circular clear button with X */}
            <Box 
              as="button"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="rgba(80, 80, 80, 0.8)"
              borderRadius="full"
              width="24px"
              height="24px"
              onClick={handleClear}
              marginRight={showCount ? "10px" : "2px"}
              _hover={{ bg: "rgba(100, 100, 100, 0.9)" }}
            >
              <BsX color="white" size={18} />
            </Box>
            
            {showCount && (
              <Text fontSize="sm" color="gray.500" whiteSpace="nowrap" marginRight="8px">
                Found {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </Text>
            )}
          </Flex>
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default CurrentSearchBar;
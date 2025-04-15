import {
    Input,
    InputGroup,
    InputLeftElement,
    Icon
  } from '@chakra-ui/react';
  import React, { useRef, useEffect, useState } from 'react';
  import { BsSearch } from 'react-icons/bs';
  import useGameQueryStore from '../store';
  import { useLocation, useNavigate } from 'react-router-dom';
  import APIClient from '../services/api-client';
  import Game from '../entities/Game';
  
  const apiClient = new APIClient<Game>('/games');
  
  const SearchInput = () => {
    const ref = useRef<HTMLInputElement>(null);
    const setTopSearchText = useGameQueryStore(s => s.setTopSearchText);
    const topSearchText = useGameQueryStore(s => s.gameQuery.topSearchText);
    const navigate = useNavigate();
    const location = useLocation();
    const [totalGames, setTotalGames] = useState(0);
  
    // Fetch total game count once
    useEffect(() => {
      const fetchTotalCount = async () => {
        try {
          const response = await apiClient.getAll({
            params: { page_size: 1 }
          });
          setTotalGames(response.count);
        } catch (error) {
          console.error('Failed to fetch total game count:', error);
        }
      };
  
      fetchTotalCount();
    }, []);
  
    // Clear input when landing on /games/search
    useEffect(() => {
      if (location.pathname === '/games/search') {
        setTopSearchText('');
        if (ref.current) ref.current.value = '';
      }
    }, [location.pathname, setTopSearchText]);
  
    // Dynamic placeholder
    const placeholderText = totalGames > 0
      ? `Search ${totalGames.toLocaleString()} games`
      : 'Search games...';
  
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current && ref.current.value.trim()) {
            const query = ref.current.value.trim();
            setTopSearchText(query); // update Zustand store
            navigate(`/games/search?query=${encodeURIComponent(query)}`);
          }
        }}
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={BsSearch as React.ElementType} />}
          />
          <Input
            ref={ref}
            borderRadius={20}
            placeholder={placeholderText}
            variant="filled"
            defaultValue={topSearchText}
          />
        </InputGroup>
      </form>
    );
  };
  
  export default SearchInput;
  
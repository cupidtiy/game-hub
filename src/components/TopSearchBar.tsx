import {
  Input,
  InputGroup,
  InputLeftElement,
  Icon
} from '@chakra-ui/react';
import React, { useRef, useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useSearchNavigation } from '../hooks/useSearchNavigation';
import APIClient from '../services/api-client';
import Game from '../entities/Game';

const apiClient = new APIClient<Game>('/games');

const TopSearchBar = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { navigateToSearch, location } = useSearchNavigation('topSearchText');
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
    if (location.pathname === '/games/search' && ref.current) {
      ref.current.value = '';
    }
  }, [location.pathname]);

  // Dynamic placeholder
  const placeholderText = totalGames > 0
    ? `Search ${totalGames.toLocaleString()} games`
    : 'Search games...';

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current && ref.current.value.trim()) {
          navigateToSearch(ref.current.value.trim());
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
        />
      </InputGroup>
    </form>
  );
};

export default TopSearchBar;
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useGameQueryStore from '../store';
import useGames from '../hooks/useGames';
import GameCard from './GameCard';
import GameCardContainer from './GameCardContainer';
import GameCardSkeleton from './GameCardSkeleton';

const GameGrid = () => {
  const gameQuery = useGameQueryStore(s => s.gameQuery);
  const { data, error, isLoading, hasNextPage, fetchNextPage } = useGames();
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  // If on search page and no search text, don't show any games
  const isSearchPage = window.location.pathname.includes('/games/search');
  if (isSearchPage && !gameQuery.searchText) {
    return null;
  }

  if (error) return <Text>{error.message}</Text>
  
  // Count all games across all pages
  const fetchedGamesCount = data?.pages.reduce(
    (total, page) => total + page.results.length, 
    0
  ) || 0;
  
  // Check if we have zero results after loading
  const hasZeroResults = !isLoading && data && data.pages[0].count === 0;
  
  // Don't show loading skeletons if we have zero results
  if (hasZeroResults) {
    return null;
  }

  return (
    <InfiniteScroll
      dataLength={fetchedGamesCount}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<Text>Loading...</Text>}
    >
      <SimpleGrid 
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        padding={10}
      >
        {isLoading && 
          skeletons.map(skeleton => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))
        }

        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map(game => (
              <GameCardContainer key={game.id}>
                <GameCard game={game} />
              </GameCardContainer>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default GameGrid;
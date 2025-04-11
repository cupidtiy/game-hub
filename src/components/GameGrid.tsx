import { SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import useGames from '../hooks/useGames';
import GameCard from './GameCard';
import GameCardContainer from './GameCardContainer';
import GameCardSkeleton from './GameCardSkeleton';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useGameQueryStore from '../store';



const GameGrid = () => {

    const { data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = 
    useGames();
    const skeletons = [1, 2, 3, 4, 5, 6];

    if (error) return <Text>{error.message}</Text>;

    const fetchedGamesCount = data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

    return (
        <>
            <InfiniteScroll
                hasMore={!!hasNextPage}
                dataLength={fetchedGamesCount}
                next={() => fetchNextPage()}
                loader={<Spinner />}>
                <SimpleGrid
                    columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
                    spacing={6}
                    padding="10"
                >
                    {isLoading &&
                        skeletons.map((skeleton) => (
                            <GameCardContainer key={skeleton}>
                                <GameCardSkeleton />
                            </GameCardContainer>
                        ))}
                    {data?.pages.map((page, index) => (
                        <React.Fragment key={index}>
                            {page.results.map((game) => (
                                <GameCardContainer key={game.id}>
                                    <GameCard game={game} />
                                </GameCardContainer>
                            ))}
                        </React.Fragment>
                    ))}
                </SimpleGrid>
            </InfiniteScroll>

            {/*
                this is extra code for the load more button
                {hasNextPage && (
                    <Button marginY={5} onClick={() => fetchNextPage()}>
                        {isFetchingNextPage ? 'Loading...' : 'Load More'}
                    </Button>
                )}
            */}
        </>
    );
};

export default GameGrid;

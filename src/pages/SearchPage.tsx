import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Grid,
    GridItem,
    Show,
    Box,
    Flex
} from '@chakra-ui/react';
import useGameQueryStore from '../store';
import GameGrid from '../components/GameGrid';
import GenreList from '../components/GenreList';
import PlatformSelector from '../components/PlatformSelector';
import SortSelector from '../components/SortSelector';
import PlatformList from '../components/PlatformList';
import CurrentSearchBar from '../components/CurrentSearchBar'

const SearchPage = () => {
    const location = useLocation();
    const setSearchText = useGameQueryStore(s => s.setSearchText);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query');

        // set the new search text for in-page search bar
        setSearchText(query ?? '');

        // clear global/top search bar if it's a different component
        const topSearchInput = document.getElementById('top-search-bar') as HTMLInputElement;
        if (topSearchInput) {
            topSearchInput.value = '';
        }
    }, [location.search, setSearchText]);

    return (
        <>
            <CurrentSearchBar />
            <Grid
                templateAreas={{
                    base: '"main"',
                    lg: '"aside main"'
                }}
                templateColumns={{
                    base: '1fr',
                    lg: '200px 1fr'
                }}
                gap={4}
                p={4}
            >
                <Show above="lg">
                    <GridItem area="aside" paddingX={5}>
                        <GenreList />
                        <PlatformList />
                    </GridItem>
                </Show>

                <GridItem area="main">
                    <Flex direction="column">
                        <Box mb={4}>
                        </Box>

                        <Flex mb={4} alignItems="center">
                            <Box marginRight={5}>
                                <PlatformSelector />
                            </Box>
                            <SortSelector />
                        </Flex>

                        <GameGrid />
                    </Flex>
                </GridItem>
            </Grid>
        </>
    );
};

export default SearchPage;
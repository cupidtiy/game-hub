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
import GameHeading from '../components/GameHeading';
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
        <Grid
            templateAreas={{
                base: '"main"',
                lg: '"aside main"'
            }}
            templateColumns={{
                base: '1fr',
                lg: '200px 1fr'
            }}
        >
            <Show above="lg">
                <GridItem area="aside" paddingX={5}>
                    <GenreList />
                    <PlatformList />
                </GridItem>
            </Show>

            <GridItem area="main">
                <Box paddingLeft={10}>
                    <GameHeading />

                    <Flex marginBottom={5}>
                        <Box marginRight={5}>
                            <PlatformSelector />
                        </Box>
                        <SortSelector />
                    </Flex>

                    <Box mb={3}>
                        <CurrentSearchBar />
                    </Box>

                </Box>

                <GameGrid />
            </GridItem>
        </Grid>
    );
};

export default SearchPage;
import React, { useEffect } from 'react'
import useGameQueryStore from '../store';
import { useLocation } from 'react-router-dom';
import { Grid, GridItem, Show, Box, Flex } from '@chakra-ui/react';
import GameGrid from '../components/GameGrid';
import GameHeading from '../components/GameHeading';
import GenreList from '../components/GenreList';
import PlatformSelector from '../components/PlatformSelector';
import SortSelector from '../components/SortSelector';

const SearchPage = () => {
    const location = useLocation();
    const setSearchText = useGameQueryStore(s => s.setSearchText);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query');

        if (query) {
            setSearchText(query);
        }
    }, [location.search, setSearchText]);


    return (
        <Grid templateAreas={{
            base: '"main"',
            lg: ' "aside main"'
        }}
            templateColumns={{
                base: '1fr',
                lg: '200px 1fr'
            }}
        >

            <GridItem area='nav'>
            </GridItem>
            <Show above="lg">
                <GridItem area='aside' paddingX={5}>
                    <GenreList />
                </GridItem>
            </Show>
            <GridItem area='main' >
                <Box paddingLeft={10}>
                    <GameHeading />
                    <Flex marginBottom={5}>
                        <Box marginRight={5}>
                            <PlatformSelector />
                        </Box>
                        <SortSelector />
                    </Flex>
                </Box>
                <GameGrid />

            </GridItem>
        </Grid>
    )
}


export default SearchPage
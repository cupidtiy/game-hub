import { Grid, GridItem, Show, Box, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import GameGrid from '../components/GameGrid'
import GameHeading from '../components/GameHeading'
import GenreList from '../components/GenreList'
import PlatformSelector from '../components/PlatformSelector'
import SortSelector from '../components/SortSelector'
import useGameQueryStore from '../store'
import PlatformList from '../components/PlatformList'

const HomePage = () => {

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
                    <PlatformList/>
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
        </Grid>)
}

export default HomePage
import { Grid, GridItem, Show, Text, HStack, Box, Flex } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
import GameGrid from "./components/GameGrid"
import GenreList from "./components/GenreList"
import { Genre } from "./hooks/useGenres";
import { useState } from "react";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/usePlatforms";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

//undefined: absence of value
//null: intentional absence of value

function App() {

  return (
    <Grid templateAreas={{
      base: '"nav" "main"',
      lg: '"nav nav" "aside main"'
    }}
      templateColumns={{
        base: '1fr',
        lg: '200px 1fr'
      }}
    >

      <GridItem area='nav'>
        <NavBar/>
      </GridItem>
      <Show above="lg">
        <GridItem area='aside' paddingX={5}>
          <GenreList/>
        </GridItem>
      </Show>
      <GridItem area='main' >
        <Box paddingLeft={10}>
          <GameHeading/>
          <Flex marginBottom={5}>
            <Box marginRight={5}>
              <PlatformSelector/>
            </Box>
            <SortSelector />
          </Flex>
        </Box>
        <GameGrid/>

      </GridItem>
    </Grid>
  )
}

export default App
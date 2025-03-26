import { Grid, GridItem, Show, Text } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
import GameGrid from "./components/GameGrid"

function App() {
  return (
    <Grid templateAreas={{
      base: '"nav" "main"',
      lg: '"nav nav" "main aside"'
    }}>

      <GridItem area='nav' >
        <NavBar>
        </NavBar>
      </GridItem>

      <Show above="lg"><GridItem area='aside' >aside</GridItem></Show>
      <GridItem area='main' >
        <GameGrid />
      </GridItem>
    </Grid>
  )
}

export default App
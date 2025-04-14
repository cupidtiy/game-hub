import React, { useEffect } from 'react'
import { Grid, GridItem, Show, Box, Flex, Heading } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import GameGrid from '../components/GameGrid'
import GenreList from '../components/GenreList'
import PlatformSelector from '../components/PlatformSelector'
import SortSelector from '../components/SortSelector'
import useGameQueryStore from '../store'
import useGenres from '../hooks/useGenres'

const CategoryPage = () => {
  const { category } = useParams();
  const { data: genres } = useGenres();
  const setGenreId = useGameQueryStore(s => s.setGenreId);
  const setSearchText = useGameQueryStore(s => s.setSearchText);
  
  // Find the genre by name and set the ID in the store
  useEffect(() => {
    // Clear search text when viewing a category page
    setSearchText('');
    
    if (genres?.results && category) {
      const genre = genres.results.find(
        g => g.name.toLowerCase() === category.toLowerCase() ||
             g.slug === category.toLowerCase()
      );
      
      if (genre) {
        setGenreId(genre.id);
      }
    }
  }, [genres, category, setGenreId, setSearchText]);
  
  // Format category name for display (capitalize first letter of each word)
  const formattedCategoryName = category 
    ? category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ') 
    : '';
  
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
          <GenreList/>
        </GridItem>
      </Show>
      <GridItem area='main' >
        <Box paddingLeft={10}>
          <Heading size="xl" marginBottom={5}>
            {formattedCategoryName} Games
          </Heading>
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

export default CategoryPage
import { HStack, List, ListItem, Image, Text, Spinner, Button, Heading } from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres';
import getCroppedImageUrl from '../services/image-url';
import useGameQueryStore from '../store';

const GenreList = () => {
    const { data, isLoading, error } = useGenres();
    const selectedGenreId = useGameQueryStore(s => s.gameQuery.genreId);
    const setSelectedGenreId = useGameQueryStore(s => s.setGenreId);

    // if (error) return null;

    // if (isLoading) return <Spinner></Spinner>
    return (
        <>
            <Heading fontSize={'2xl'} marginBottom={3}>Genres</Heading>
            <List>
                {data?.results.map(genre => <ListItem key={genre.id}
                    paddingY='5px'
                    fontSize='lg'>
                    <HStack>
                        <Image boxSize='32px'
                            borderRadius={8}
                            objectFit='cover'
                            src={getCroppedImageUrl(genre.image_background)}>
                        </Image>
                        <Button textAlign='left' whiteSpace={'normal'} fontWeight={genre.id === selectedGenreId ? 'bold' : 'normal'} 
                        onClick={() => setSelectedGenreId(genre.id)}
                            fontSize='lg'
                            variant='ghost'>
                            {genre.name}
                        </Button>
                    </HStack>
                </ListItem>)}
            </List></>

    )
}

export default GenreList
import { HStack, List, ListItem, Image, Text, Spinner, Button, Heading } from '@chakra-ui/react';
import useGenres from '../hooks/useGenres';
import getCroppedImageUrl from '../services/image-url';
import useGameQueryStore from '../store';
import { useNavigate } from 'react-router-dom';

const GenreList = () => {
    const { data, isLoading, error } = useGenres();
    const selectedGenreId = useGameQueryStore(s => s.gameQuery.genreId);
    const setSelectedGenreId = useGameQueryStore(s => s.setGenreId);
    const navigate = useNavigate();

    const handleGenreClick = (genreId: number, genreName: string) => {
        // Set the genre ID in the store
        setSelectedGenreId(genreId);
        
        // Navigate to the category page with proper URL
        // Convert the genre name to a URL-friendly format (lowercase, replace spaces with hyphens)
        const urlGenreName = genreName.toLowerCase().replace(/\s+/g, '-');
        navigate(`/games/${urlGenreName}`);
    };

    return (
        <>
            <Heading fontSize={'2xl'} marginBottom={3}>Genres</Heading>
            <List>
                {data?.results.map(genre => (
                    <ListItem 
                        key={genre.id}
                        paddingY='5px'
                        fontSize='lg'
                    >
                        <HStack>
                            <Image 
                                boxSize='32px'
                                borderRadius={8}
                                objectFit='cover'
                                src={getCroppedImageUrl(genre.image_background)}
                            />
                            <Button 
                                textAlign='left' 
                                whiteSpace={'normal'} 
                                fontWeight={genre.id === selectedGenreId ? 'bold' : 'normal'}
                                onClick={() => handleGenreClick(genre.id, genre.name)}
                                fontSize='lg'
                                variant='ghost'
                            >
                                {genre.name}
                            </Button>
                        </HStack>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default GenreList;
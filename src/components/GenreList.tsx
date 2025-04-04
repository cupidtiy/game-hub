import { HStack, List, ListItem, Image, Text, Spinner, Button, Heading } from '@chakra-ui/react';
import useGenres, { Genre } from '../hooks/useGenres';
import getCroppedImageUrl from '../services/image-url';
interface Props {
    onSelectGenre: (genre: Genre) => void;
    selectedGenre: Genre | null;
}
const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
    const { data, isLoading, error } = useGenres();

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
                        <Button textAlign='left' whiteSpace={'normal'} fontWeight={genre.id === selectedGenre?.id ? 'bold' : 'normal'} onClick={() => onSelectGenre(genre)}
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
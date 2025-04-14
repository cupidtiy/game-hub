import { Flex, Text, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Genre from '../entities/Genre';

interface Props {
  genres: Genre[];
}

const GameGenres = ({ genres }: Props) => {
  if (!genres || genres.length === 0) return null;

  return (
    <Flex justify="space-between" w="100%">
      <Text color="gray.400" fontSize="sm">
        Genres:
      </Text>
      <Text fontSize="sm" textAlign="right">
        {genres.map((genre, index) => (
          <ChakraLink
            as={Link}
            key={genre.id}
            to={`/games/${genre.slug}`}
            color="white"
            _hover={{
              textDecoration: 'underline',
              color: 'gray.300',
            }}
          >
            {genre.name}
            {index < genres.length - 1 && ', '}
          </ChakraLink>
        ))}
      </Text>
    </Flex>
  );
};

export default GameGenres;

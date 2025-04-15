import {
    Card,
    CardBody,
    Heading,
    Image,
    HStack,
    Box,
    VStack,
    Text,
    Divider
} from '@chakra-ui/react';
import PlatformIconList from './PlatformIconList';
import CriticScore from './CriticScore';
import getCroppedImageUrl from '../services/image-url';
import Emoji from './Emoji';
import { Link } from 'react-router-dom';
import Game from '../entities/Game';
import GameReleaseDate from './GameReleaseDate';
import GameGenres from './GameGenres';

interface Props {
    game: Game;
}

const GameCard = ({ game }: Props) => {
    // Check if the game object and its properties exist to prevent errors
    if (!game) return null;

    // Check if parent_platforms exists before trying to map it
    const platforms = game.parent_platforms ? 
        game.parent_platforms.map(p => p.platform) : 
        [];

    return (
        <Card
            role="group"
            borderRadius={10}
            overflow="hidden"
            position="relative"
            transition="all .02s"
        >
            {/* cover photo */}
            <Image src={getCroppedImageUrl(game.background_image)} />

            {/* always visible content */}
            <CardBody>
                <HStack justifyContent="space-between" marginBottom={3}>
                    <PlatformIconList platforms={platforms} />
                    <CriticScore score={game.metacritic} />
                </HStack>
                <Heading fontSize="2xl">
                    <Link to={`/games/${game.slug}`}>
                        {game.name}
                    </Link>
                    <Emoji rating={game.rating_top} />
                </Heading>
            </CardBody>

            {/* hover-only content */}
            <Box
                bg="gray.700"
                color="white"
                px={2}
                py={3}
                fontSize="xs"
                display="none"
                _groupHover={{ display: 'block' }}
                transition="all .03s ease-in-out"
            >
                <VStack align="stretch" spacing={3}>
                    <GameReleaseDate date={game.released} />
                    <Divider borderStyle="solid" borderColor="gray.600" my={2} />
                    <GameGenres genres={game.genres || []} />
                </VStack>
            </Box>
        </Card>
    );
};

export default GameCard;
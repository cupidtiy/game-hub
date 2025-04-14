import { Card, CardBody, Heading, Image, HStack, Box, VStack, Text, Divider } from '@chakra-ui/react';
import PlatformIconList from './PlatformIconList';
import CriticScore from './CriticScore';
import getCroppedImageUrl from '../services/image-url';
import Emoji from './Emoji';
import { Link } from 'react-router-dom';
import Game from '../entities/Game';
import GameReleaseDate from './GameReleaseDate';
import GameGenres from './GameGenres';

interface Props {
    game: Game
}

const GameCard = ({ game }: Props) => {
    return (
        <Card
            role="group"
            borderRadius={10}
            overflow="hidden"
            position='relative'
            transition='all .02s'
        >
            {/** cover photo  */}
            <Image src={getCroppedImageUrl(game.background_image)} />

            {/** always visible content */}
            <CardBody>
                <HStack justifyContent='space-between' marginBottom={3}>
                    <PlatformIconList platforms={game.parent_platforms.map(p => p.platform)} />
                    <CriticScore score={game.metacritic}></CriticScore>
                </HStack>
                <Heading fontSize='2xl'>
                    <Link to={'/games/' + game.slug}>
                        {game.name}
                    </Link>
                    <Emoji rating={game.rating_top}></Emoji>
                </Heading>
            </CardBody>

            {/* hover-only content */}
            <Box
                bg="gray.700"
                color='white'
                px={2}
                py={3}
                fontSize='xs'
                display='none'
                _groupHover={{ display: 'block' }}
                transition='all .03s ease-in-out'
            >


                <VStack align="stretch" spacing={3}>
                    <Text>
                        <GameReleaseDate date={game.released} />
                        <Divider borderStyle='solid' borderColor="gray.600" my={2} />
                        <GameGenres genres={game.genres} />
                    </Text>
                </VStack>
            </Box>
        </Card>
    );
}

export default GameCard;
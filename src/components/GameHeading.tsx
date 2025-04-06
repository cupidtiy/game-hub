import { Heading } from '@chakra-ui/react'
import { q } from 'framer-motion/dist/types.d-B50aGbjN'
import React from 'react'
import { GameQuery } from '../App'
import useGenres from '../hooks/useGenres'


interface Props {
    gameQuery: GameQuery
}
const GameHeading = ({ gameQuery }: Props) => {
    const { data: genres } = useGenres();
    const genre = genres?.results.find(g => g.id === gameQuery.genreId);

    const { data: platforms } = useGenres();
    const platform = platforms?.results.find(g => g.id === gameQuery.platformId);

    const heading = `${platform?.name || ''} ${genre?.name || ''} Games`

    return (
        <Heading as='h1' marginY={5} fontSize={'5xl'}>
            {heading}
        </Heading>)
}

export default GameHeading
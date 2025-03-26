import React, { useEffect, useState } from 'react'
import apiClient from '../services/api-client';

const GameGrid = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState('');

    interface Game {
        id: number;
        name: string;
    }
    interface FetchgamesResponse {
        count: number;
        results: Game[];
    }

    useEffect(() => {
        apiClient.get<FetchgamesResponse>('/games')
        .then(res => setGames(res.data.results))
        .catch(err => setError(err.message));
    })
    return (
        <>
        {error && <Text>{error}</Text>}
        <ul>
            {games.map(games=> <li key={games.id}>{games.name}</li>)}
        </ul>
        </>

    )
}

export default GameGrid
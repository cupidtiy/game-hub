import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react'
import React, { useRef, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import useGameQueryStore from '../store';
import { useNavigate } from 'react-router-dom';
import APIClient from '../services/api-client';
import Game from '../entities/Game';
import { FetchResponse } from '../services/api-client';

const apiClient = new APIClient<Game>('/games');

const SearchInput = () => {
    const ref = useRef<HTMLInputElement>(null);
    const setSearchText = useGameQueryStore(s => s.setSearchText);
    const navigate = useNavigate();
    const [totalGames, setTotalGames] = useState(0);
    
    // Fetch the total count only once when component mounts
    useEffect(() => {
        const fetchTotalCount = async () => {
            try {
                const response = await apiClient.getAll({
                    params: {
                        page_size: 1 // We only need the count, not actual results
                    }
                });
                setTotalGames(response.count);
            } catch (error) {
                console.error('Failed to fetch total game count:', error);
            }
        };
        
        fetchTotalCount();
    }, []);
    
    // Create placeholder text with fixed total game count
    const placeholderText = totalGames > 0 
        ? `Searching ${totalGames.toLocaleString()} games` 
        : 'Search games...';
    
    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            if (ref.current) setSearchText(ref.current.value);
            navigate("/");
        }}>
            <InputGroup>
                <InputLeftElement children={<Icon as={BsSearch as React.ElementType} />} />
                <Input 
                    ref={ref} 
                    borderRadius={20} 
                    placeholder={placeholderText}
                    variant='filled'
                />
            </InputGroup>
        </form>
    )
}

export default SearchInput
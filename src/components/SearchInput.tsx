import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react'
import React, { useRef, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import useGameQueryStore from '../store';
import { useLocation, useNavigate } from 'react-router-dom';
import APIClient from '../services/api-client';
import Game from '../entities/Game';
import { FetchResponse } from '../services/api-client';
import useGame from '../hooks/useGame';

const apiClient = new APIClient<Game>('/games');

const SearchInput = () => {
    const ref = useRef<HTMLInputElement>(null);
    const setSearchText = useGameQueryStore(s => s.setSearchText);
    const gameQuery = useGameQueryStore(s=> s.gameQuery);
    const navigate = useNavigate();
    const location = useLocation();
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

    //clear input field when on home page or when searchtext is empty
    useEffect(() => {
        if(location.pathname === '/' ||  !gameQuery.searchText){
            if(ref.current){
                ref.current.value = '';
            }
        }
    }, [location.pathname, gameQuery.searchText]);

    //set input value based on URL query parameter
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('query');

        if (query) {
            //set the search text in the store
            setSearchText(query);

            //update input field value if theres a ref
            if (ref.current) {
                ref.current.value = query;
            }
        }
    }, [location.search, setSearchText]);


    // Create placeholder text with fixed total game count
    const placeholderText = totalGames > 0
        ? `Searching ${totalGames.toLocaleString()} games`
        : 'Search games...';

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            if (ref.current && ref.current.value) {
                const searchQuery = ref.current.value;

                //update store
                setSearchText(searchQuery);

                navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
            }
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
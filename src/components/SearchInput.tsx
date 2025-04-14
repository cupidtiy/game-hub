import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { BsSearch } from 'react-icons/bs'
import useGameQueryStore from '../store';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const ref = useRef<HTMLInputElement>(null);
    const setSearchText = useGameQueryStore(s => s.setSearchText);
    const navigate = useNavigate();

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            if (ref.current) setSearchText(ref.current.value);
            navigate("/");
        }}>
            <InputGroup>
                <InputLeftElement children={<Icon as={BsSearch as React.ElementType} />} />
                <Input ref={ref} borderRadius={20} placeholder='Search games...' variant='filled'></Input>
            </InputGroup>
        </form>
    )
}

export default SearchInput
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { BsSearch } from 'react-icons/bs'
import useGameQueryStore from '../store';
interface Props {
    onSearch: (searchText: string) => void;
}
const SearchInput = () => {
    const ref = useRef<HTMLInputElement>(null);
    const setSearchText = useGameQueryStore(s => s.setSearchText);

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            if (ref.current) setSearchText(ref.current.value);
        }}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input ref={ref} borderRadius={20} placeholder='Search games...' variant='filled'></Input>
            </InputGroup>
        </form>
    )
}

export default SearchInput
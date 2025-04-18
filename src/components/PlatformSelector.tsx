import { Button, Menu, MenuButton, MenuItem, MenuList, Icon } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'
import usePlatforms from '../hooks/usePlatforms';
import Platform from "../entities/Platform";
import usePlatform from '../hooks/usePlatform';
import useGameQueryStore from '../store';

const PlatformSelector = () => {
    const selectedPlatformId = useGameQueryStore(s => s.gameQuery.platformId);
    const setSelectedPlatformId = useGameQueryStore(s => s.setPlatformId);

    const { data, error } = usePlatforms();
    const selectedPlatform = usePlatform(selectedPlatformId);
    if (error) return null;

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<Icon as={BsChevronDown as React.ElementType} />}>
                {selectedPlatform?.name || 'Platforms'}
            </MenuButton>
            <MenuList>
                {data?.results.map(platform =>
                    <MenuItem
                        onClick={() => setSelectedPlatformId(platform.id)}
                        key={platform.id}>{platform.name}
                    </MenuItem>)}
            </MenuList>
        </Menu>)
}

export default PlatformSelector;
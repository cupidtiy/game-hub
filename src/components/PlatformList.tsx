import {
  HStack,
  List,
  ListItem,
  Button,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import usePlatforms from '../hooks/usePlatforms';
import useGameQueryStore from '../store';
import { platformIconMap } from '../assets/PlatformIconMap'; // update path if needed
import IconBox from '../components/IconBox'; // reusable component
import { IconType } from 'react-icons';

const PlatformList = () => {
  const { data, isLoading, error } = usePlatforms();
  const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const setSelectedPlatformId = useGameQueryStore((s) => s.setPlatformId);
  const navigate = useNavigate();

  const handlePlatformClick = (platformId: number, platformName: string) => {
    setSelectedPlatformId(platformId);
    const urlPlatformName = platformName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/games/${urlPlatformName}`);
  };

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red.300">Failed to load platforms.</Text>;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Platforms
      </Heading>
      <List spacing={1}>
        {data?.results.map((platform) => {
          const IconComponent = platformIconMap[platform.slug];
          if (!IconComponent) return null;

          return (
            <ListItem key={platform.id} paddingY="3px" role="group">
              <HStack spacing={3} align="center">
                <IconBox icon={IconComponent} isHoverable />
                <Button
                  textAlign="left"
                  whiteSpace="normal"
                  fontWeight={
                    platform.id === selectedPlatformId ? 'bold' : 'normal'
                  }
                  onClick={() =>
                    handlePlatformClick(platform.id, platform.name)
                  }
                  fontSize="lg"
                  variant="ghost"
                  padding={0}
                  height="auto"
                  _hover={{ background: 'transparent' }}
                  _active={{ background: 'transparent' }}
                  _focus={{ boxShadow: 'none' }}
                >
                  {platform.name}
                </Button>
              </HStack>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default PlatformList;

import {
    HStack,
    List,
    ListItem,
    Button,
    Heading,
    Spinner,
    Text,
    Box,
    Icon,
  } from '@chakra-ui/react';
  import { useNavigate } from 'react-router-dom';
  import usePlatforms from '../hooks/usePlatforms';
  import useGameQueryStore from '../store';
  import { platformIconMap } from '../assets/PlatformIconMap';
  
  const PlatformList = () => {
    const { data, isLoading, error } = usePlatforms();
    const selectedPlatformId = useGameQueryStore(s => s.gameQuery.platformId);
    const setSelectedPlatformId = useGameQueryStore(s => s.setPlatformId);
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
        <List>
          {data?.results.map(platform => {
            const IconComponent = platformIconMap[platform.slug];
            return (
              <ListItem key={platform.id} paddingY="5px" fontSize="lg">
                <HStack>
                  {IconComponent && (
                    <Box
                      boxSize="32px"
                      borderRadius={8}
                      bg="gray.700"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={IconComponent} color="white" boxSize={5} />
                    </Box>
                  )}
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
  
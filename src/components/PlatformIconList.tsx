import { HStack, Icon } from '@chakra-ui/react';
import Platform from '../entities/Platform';
import { platformIconMap } from '../assets/PlatformIconMap'; 

interface Props {
  platforms: Platform[];
}

const PlatformIconList = ({ platforms = [] }: Props) => {
  return (
    <HStack marginY={1}>
      {platforms.map((platform) => {
        const IconComponent = platformIconMap[platform.slug];
        return IconComponent ? (
          <Icon
            key={platform.id}
            as={IconComponent as React.ElementType}
            color="gray.500"
          />
        ) : null;
      })}
    </HStack>
  );
};

export default PlatformIconList;

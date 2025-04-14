import { Box, Icon, useColorModeValue } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface IconBoxProps {
  icon: IconType;
  size?: string | number;
  isHoverable?: boolean;
}

const IconBox = ({ icon, size = '32px', isHoverable = false }: IconBoxProps) => {
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  const iconColor = useColorModeValue('gray.800', 'white');
  const hoverBg = useColorModeValue('white', 'white');
  const hoverIcon = useColorModeValue('gray.800', 'gray.900');

  return (
    <Box
      w={size}
      h={size}
      borderRadius={8}
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      transition="all 0.2s ease"
      _groupHover={
        isHoverable
          ? {
              bg: hoverBg,
              '& svg': {
                color: hoverIcon,
              },
            }
          : undefined
      }
    >
      <Icon
        as={icon as React.ElementType}
        color={iconColor}
        boxSize="18px"
        transition="color 0.2s ease"
      />
    </Box>
  );
};

export default IconBox;

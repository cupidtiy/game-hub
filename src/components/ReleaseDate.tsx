import { Flex, Text } from '@chakra-ui/react';

interface Props {
  date: string | null | undefined;
}

const ReleaseDate = ({ date }: Props) => {
  const formatted = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'TBA';

  return (
    <Flex justify="space-between" w="100%">
      <Text color="gray.400" fontSize="sm">
        Release date:
      </Text>
      <Text fontSize="sm">{formatted}</Text>
    </Flex>
  );
};

export default ReleaseDate;

import { Box, Flex, Text } from '@chakra-ui/react';

export const Pagination = () => {
  return (
    <Flex px={6} py={3} justifyContent={'space-between'}>
      <Flex alignItems="center" gap={3}>
        <i className="fa-solid fa-arrow-left"></i>
        <Text fontSize="sm" letterSpacing={'widest'} textTransform={'uppercase'}>
          Previous
        </Text>
      </Flex>
      <Flex alignItems="center" gap={3}>
        <Text fontSize="sm" letterSpacing={'widest'} textTransform={'uppercase'}>
          Next
        </Text>
        <i className="fa-solid fa-arrow-right"></i>
      </Flex>
    </Flex>
  );
};

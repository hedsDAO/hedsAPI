import { Box, Flex, Text } from '@chakra-ui/react';

const WarningAlert = ({ children }: { children: any }) => {
  return (
    <Box w="full" as={Flex} alignItems={'center'} bgColor={'red.100'} borderColor={'red.200'} rounded="lg" className="py-2 px-3 border">
      <i className="fa-sharp fa-solid fa-circle-exclamation mr-2"></i>
      <Text fontSize={{ base: 'xs', lg: 'sm' }} textColor={'gray.700'} fontWeight={'medium'}>
        {children}
      </Text>
    </Box>
  );
};

export default WarningAlert;

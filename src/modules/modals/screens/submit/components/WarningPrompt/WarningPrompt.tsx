import { Divider, Text, VStack } from '@chakra-ui/react';

const WarningPrompt = () => {
  return (
    <>
      <VStack pb={2} mx="auto" maxW="xs" alignItems="center">
        <Text fontWeight={'bold'} fontSize="xs" textColor={'red.500'}>
          WARNING
        </Text>
        <Text textAlign={'center'} fontSize="xs">
          Replacing your track will overwrite the previous submission. <span style={{ fontWeight: 'bold' }}>This action can not be undone.</span>
        </Text>
      </VStack>
      <Divider borderColor={'gray.300'} my={5} />
    </>
  );
};

export default WarningPrompt;

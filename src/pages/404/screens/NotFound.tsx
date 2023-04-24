import { Button, Center, Heading, Text, VStack } from '@chakra-ui/react';

export const NotFound = () => {
  return (
    <Center h="100vh" w="100%" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" color="white">
          404
        </Heading>
        <Text fontSize="lg" textAlign="center" color="white">
          The Page You Were Looking For Does Not Exist
        </Text>
        <Button>Go Home</Button>
      </VStack>
    </Center>
  );
};

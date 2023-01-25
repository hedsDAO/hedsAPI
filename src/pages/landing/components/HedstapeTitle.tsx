import { Flex, Text } from '@chakra-ui/react';

export const HedsTapeTitle = () => (
  <>
    <Flex direction="row" justify="center" width="100vw">
      <Text>THE</Text>
      <Text fontSize={['5xl', '8xl', '9xl', null, null]} fontWeight="bold">
        hedsTAPE
      </Text>
      <Text className="mt-auto">SERIES</Text>
    </Flex>
    <Text>curated samples from world renowned creatives</Text>
  </>
);

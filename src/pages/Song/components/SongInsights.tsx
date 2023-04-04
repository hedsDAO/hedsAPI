import { SimpleGrid, GridItem, Center, Stack, Flex, Text } from '@chakra-ui/react';

const SongInsights = ({ cyanite }: { cyanite: any }) => {
  return (
    <SimpleGrid columns={{ base: 3, xl: 3 }} gap={2} px={1} pb={3}>
      <GridItem minW="full" colSpan={1}>
        <Center p={1} minW={{ base: '10', lg: '12' }} w={'full'} h={{ base: '10', lg: '12' }} rounded="lg" bg="gray.700">
          <Stack alignItems={'center'}>
            <Text fontWeight={'light'} color="white" mt={'0 !important'} fontSize={'2xs'}>
              BPM
            </Text>
            <Flex alignItems={'baseline'} mt={'0 !important'}>
              <Text fontWeight={'semibold'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                {cyanite?.bpmPrediction?.value}
              </Text>
              <Text ml={1} fontWeight={'light'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                {cyanite?.bpmPrediction?.confidence?.toFixed(2) * 100}%
              </Text>
            </Flex>
          </Stack>
        </Center>
      </GridItem>
      <GridItem minW="full" colSpan={1}>
        <Center p={2} w="full" h={{ base: '10', lg: '12' }} rounded="lg" bg="gray.700">
          <Stack alignItems={'center'}>
            <Text fontWeight={'light'} color="white" mt={'0 !important'} fontSize={'2xs'}>
              GENRE
            </Text>
            <Text fontWeight={'semibold'} color="white" mt={'0 !important'} fontSize={'2xs'}>
              {cyanite?.genreTags[0]}
            </Text>
          </Stack>
        </Center>
      </GridItem>
      <GridItem minW="full" colSpan={1}>
        <Center p={2} w="full" h={{ base: '10', lg: '12' }} rounded="lg" bg="gray.700">
          <Stack alignItems={'center'}>
            <Text fontWeight={'light'} color="white" mt={'0 !important'} fontSize={'2xs'}>
              SUBGENRE
            </Text>
            <Text fontWeight={'semibold'} color="white" mt={'0 !important'} fontSize={'2xs'}>
              {cyanite?.subgenreTags[0]}
            </Text>
          </Stack>
        </Center>
      </GridItem>
      <GridItem minW="full" colSpan={1}>
        <Center p={2} w="full" h={{ base: '10', lg: '12' }} rounded="lg" bg="gray.700">
          <Stack alignItems={'center'}>
            <Text fontWeight={'light'} color="white" mt={'0 !important'} fontSize={'2xs'}>
              KEY
            </Text>
            <Flex alignItems={'baseline'} mt={'0 !important'}>
              <Text fontWeight={'semibold'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                {cyanite?.keyPrediction?.value}
              </Text>
              <Text ml={1} fontWeight={'light'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                {cyanite?.keyPrediction?.confidence?.toFixed(2) * 100}%
              </Text>
            </Flex>
          </Stack>
        </Center>
      </GridItem>
      <GridItem minW="full" colSpan={1}>
        <Center p={2} w="full" h={{ base: '10', lg: '12' }} rounded="lg" bg="gray.700">
          <Stack alignItems={'center'}>
            <Text fontWeight={'light'} color="white" mt={'0 !important'} fontSize={'2xs'}>
              TIME SIGNATURE
            </Text>
            <Flex alignItems={'baseline'} mt={'0 !important'}>
              <Text fontWeight={'semibold'} color="white" mt={'0 !important'} fontSize={'2xs'}>
                {cyanite?.timeSignature}
              </Text>
            </Flex>
          </Stack>
        </Center>
      </GridItem>
    </SimpleGrid>
  );
};

export default SongInsights;

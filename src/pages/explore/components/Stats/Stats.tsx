import { SimpleGrid, GridItem, Stack, Text } from '@chakra-ui/react';

export const Stats = () => {
  return (
    <SimpleGrid gap={2} columns={{ base: 2, lg: 4 }}>
      <GridItem colSpan={1}>
        <Stack py={2} px={3.5} rounded="lg" maxW={{ base: '100%', lg: '10vw' }} minW={{ base: '100%', lg: '10vw' }} bg="heds.bg3">
          <Text color="white" fontSize="xs" letterSpacing={'wide'} fontFamily="karla">
            TAPES MINTED
          </Text>
          <Text mt={'0 !important'} color="heds.200" fontSize="2xs">
            9999
          </Text>
        </Stack>
      </GridItem>
      <GridItem colSpan={1}>
        <Stack py={2} px={3.5} rounded="lg" maxW={{ base: '100%', lg: '10vw' }} minW={{ base: '100%', lg: '10vw' }} bg="heds.bg3">
          <Text color="white" fontSize="xs" letterSpacing={'wide'} fontFamily="karla">
            VALUE GENERATED
          </Text>
          <Text mt={'0 !important'} color="heds.200" fontSize="2xs">
            999,999 ETH
          </Text>
        </Stack>
      </GridItem>
      <GridItem colSpan={1}>
        <Stack py={2} px={3.5} rounded="lg" maxW={{ base: '100%', lg: '10vw' }} minW={{ base: '100%', lg: '10vw' }} bg="heds.bg3">
          <Text color="white" fontSize="xs" letterSpacing={'wide'} fontFamily="karla">
            SUBMISSIONS
          </Text>
          <Text mt={'0 !important'} color="heds.200" fontSize="2xs">
            9999
          </Text>
        </Stack>
      </GridItem>
      <GridItem colSpan={1}>
        <Stack py={2} px={3.5} rounded="lg" maxW={{ base: '100%', lg: '10vw' }} minW={{ base: '100%', lg: '10vw' }} bg="heds.bg3">
          <Text color="white" fontSize="xs" letterSpacing={'wide'} fontFamily="karla">
            UNIQUE MINTERS
          </Text>
          <Text mt={'0 !important'} color="heds.200" fontSize="2xs">
            9999
          </Text>
        </Stack>
      </GridItem>
    </SimpleGrid>
  );
};

import { useBoolean, Stack, SimpleGrid, Skeleton, Avatar, Flex, Box, Text } from '@chakra-ui/react';
import { Proposal } from 'hedsvote';

export const LandingProposalChoices = ({ proposal }: { proposal: Proposal }) => {
  const [hasImageLoaded, setHasImageLoaded] = useBoolean();
  return (
    <Stack gap={4}>
      <SimpleGrid
        minW={'20rem'}
        minH={'12.5rem'}
        border="1px"
        borderColor="gray.600"
        shadow="sm"
        rounded="xl"
        py={2}
        bg="gray.100"
        alignSelf={'end'}
        justifyItems={{ base: 'start', lg: 'center' }}
        gap={3}
        placeItems="center"
        columns={{ base: 5, md: 5, xl: 5 }}
      >
        {proposal?.choices?.slice(0, 20).map((choice) => (
          <Stack key={choice.name} gap={1}>
            <Skeleton rounded="md" size={{ base: 'xs', lg: 'sm' }} isLoaded={hasImageLoaded}>
              <Avatar
                opacity={0.7}
                size={{ base: 'xs', lg: 'sm' }}
                onLoad={setHasImageLoaded.on}
                border="1px"
                borderRadius="md"
                w="full"
                objectFit={'cover'}
                src={choice.image}
              />
            </Skeleton>
          </Stack>
        ))}
      </SimpleGrid>
      <Flex pt={1.5} pos={'absolute'}>
        <Box shadow="sm" px={1.5} py={0.5} roundedRight="lg" border="1px" borderColor="gray.800" bg="white">
          <Text fontSize={'xs'} textAlign={'center'}>
            {proposal?.choices?.length} submissions
          </Text>
        </Box>
      </Flex>
    </Stack>
  );
};

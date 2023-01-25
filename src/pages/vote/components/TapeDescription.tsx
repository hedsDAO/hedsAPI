import { Avatar, Box, Badge, Container, Divider, Flex, HStack, Spacer, Stack, Square, Text } from '@chakra-ui/react';
import { Proposal, ProposalState } from 'hedsvote';
import { formatWallet } from '@/utils';

interface OwnProps {
  proposal: Proposal;
  tapeImage: string;
}

export const TapeDescription = ({ proposal, tapeImage }: OwnProps) => {
  const handleProposalState = (state: ProposalState) => {
    if (state === ProposalState.OPEN) return <Badge colorScheme={'green'}>OPEN</Badge>;
    if (state === ProposalState.CLOSED) return <Badge colorScheme={'red'}>CLOSED</Badge>;
    return <Badge colorScheme={'yellow'}>PENDING</Badge>;
  };

  return (
    <Box as="section" py={{ base: '4', md: '5' }}>
      <Container maxW="7xl">
        <Flex w="100%" flexDirection={{ base: 'column', md: 'row' }} justifyContent="space-evenly">
          <Box
            bg={'blackAlpha.100'}
            _hover={{ bg: 'white', borderColor: 'gray.800' }}
            border={'1px'}
            borderColor={'gray.600'}
            rounded="sm"
            boxShadow={'sm'}
            borderRadius="lg"
            p={{ base: '2', md: '4' }}
            w={{ base: '100%', md: '45%' }}
          >
            <Stack p={2} spacing="5">
              <Stack spacing="1">
                <Text fontSize="lg" fontWeight="medium">
                  Details
                </Text>
                <Text fontSize="xs" color="muted">
                  {proposal?.description}
                </Text>
              </Stack>
              <Box bg="white" border="1px" borderColor="gray.800" borderWidth={'1px'} p={{ base: '2', md: '4' }} borderRadius="lg">
                <Stack justify="space-between" direction={{ base: 'column', md: 'row' }} spacing="5">
                  <HStack spacing="3">
                    <Square borderRadius="lg">
                      <Avatar src={tapeImage} />
                    </Square>
                    <Box fontSize="sm">
                      <Text color="emphasized" fontWeight="medium">
                        {proposal?.author && formatWallet(proposal?.author)}
                      </Text>
                      {handleProposalState(proposal?.state)}
                    </Box>
                  </HStack>
                </Stack>
              </Box>
            </Stack>
          </Box>
          <Box
            bg="white"
            border="1px"
            borderColor="gray.800"
            borderWidth={'1px'}
            p={{ base: '2', md: '4' }}
            borderRadius="lg"
            w={{ base: '100%', md: '45%' }}
            mt={{ base: '16px', md: '0' }}
          >
            <Text fontSize="lg" fontWeight="medium">
              How voting works
            </Text>
            <Divider borderColor="gray.700" w="full" py={{ base: '1', md: '2' }} />
            <Text fontSize="xs" color="muted" pt="2">
              The community votes on their favorite submissions. Voting power is determined from hedsTAPE(s) ownership. hedsTAPE(s) with a higher ratio of
              owners to tapes minted in the specific collection will have a higher voting power.
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

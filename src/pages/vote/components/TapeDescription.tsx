import { useSelector } from 'react-redux';
import { store } from '@/store';
import { ProposalState } from 'hedsvote';
import { formatWallet } from '@/utils';
import { Avatar, Box, Badge, Divider, Flex, HStack, Stack, Square, Text } from '@chakra-ui/react';
import { OLD_TAPES, HOW_VOTING_WORKS, ABOUT_VOTING, ABOUT_VOTING_OLD_TAPES } from '@pages/vote/store/constants';

interface OwnProps {
  tapeImage: string;
  tapeId?: string;
}

export const TapeDescription = ({ tapeImage, tapeId }: OwnProps) => {
  const proposal = useSelector(store.select.voteModel.selectProposal);

  const handleProposalState = (state: ProposalState) => {
    if (state === ProposalState.OPEN) return <Badge colorScheme={'green'}>OPEN</Badge>;
    if (state === ProposalState.CLOSED) return <Badge colorScheme={'red'}>CLOSED</Badge>;
    return <Badge colorScheme={'yellow'}>PENDING</Badge>;
  };

  const isOldTape = OLD_TAPES.includes(tapeId);

  return (
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
          {HOW_VOTING_WORKS}
        </Text>
        <Divider borderColor="gray.700" w="full" py={{ base: '1', md: '2' }} />
        <Text fontSize="xs" color="muted" pt="2">
          {isOldTape ? ABOUT_VOTING_OLD_TAPES : ABOUT_VOTING}
        </Text>
      </Box>
    </Flex>
  );
};

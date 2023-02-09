import { useSelector } from 'react-redux';
import { store } from '@/store';

// Components
import { Avatar, Box, Heading, Flex, Grid, GridItem, HStack, Image, Stack, Text, IconButton } from '@chakra-ui/react';
import { IconX, IconPlus, IconMinus } from '@tabler/icons';
import { formatWallet } from '@/utils';

// Models
import { QuadraticVote } from 'hedsvote';

export const VoteResults = () => {
  const votes = useSelector(store.select.voteModel.selectQuadraticVotes);
  console.log(votes);
  return (
    <>
      {votes && (
        <>
          <Heading
            py={{ base: 0, lg: 2 }}
            className="animate__animated animate__fadeIn"
            fontWeight="light"
            letterSpacing="widest"
            size={['xs', 'sm']}
            color={'gray.900'}
          >
            RESULTS
          </Heading>
          <Stack border="1px" borderRadius="md" p={2}>
            {votes.length > 0 && votes.map((vote) => <VoterCard vote={vote} key={vote.voter} />)}
          </Stack>
        </>
      )}
    </>
  );
};

const VoterCard = ({ vote }: { vote: QuadraticVote }) => {
  const { voter, vp } = vote;

  return (
    <Box border="1px" borderColor="gray.400" borderRadius="md" px={1} bgColor="gray.50">
      <Flex justifyContent="space-between" px={1}>
        <Text fontSize="xs">{formatWallet(voter)}</Text>
        <Text fontSize="xs">{vp}</Text>
      </Flex>
    </Box>
  );
};

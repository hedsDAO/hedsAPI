import { useSelector } from 'react-redux';
import { store } from '@/store';

// Components
import { Box, Heading, Flex, Stack, Text, Tooltip } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { formatWallet } from '@/utils';

// Models
import { QuadraticVote } from 'hedsvote';

export const VoteResults = () => {
  const votes = useSelector(store.select.voteModel.selectQuadraticVotes);

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
          <Stack border="1px" borderColor="gray.700" borderRadius="md" p={1}>
            {votes.length > 0 && votes.map((vote) => <VoterCard vote={vote} key={vote.voter} />)}
          </Stack>
        </>
      )}
    </>
  );
};

const VoterCard = ({ vote }: { vote: QuadraticVote }) => {
  const { voter, vp } = vote;
  const choices = useSelector(store.select.voteModel.selectProposalChoices);

  const formatChoiceSelection = (voteObject: { [id: string]: number }) => {
    const totalScore = Object.values(voteObject).reduce((a, b) => a + b, 0);
    const selectedChoices = Object.keys(voteObject).map((id) => {
      const choiceId = parseInt(id) - 1;
      const choice = choices[choiceId];
      const percentage = ((voteObject[id] / totalScore) * 100).toFixed(2);
      return `${percentage}% for ${choice.name}`;
    });
    return selectedChoices.join(', ');
  };

  return (
    <Box border="1px" borderColor="gray.400" borderRadius="md" px={1} bgColor="gray.50">
      <Flex justifyContent="space-between" px={1} py={2}>
        <Text fontSize="xs" fontFamily="monospace" letterSpacing="wide">
          {formatWallet(voter)}
        </Text>
        <Flex w="30%" justifyContent="space-between" alignItems="center">
          <Text fontSize="xs" fontFamily="monospace" letterSpacing="wide">
            {vp} HED
          </Text>
          <Tooltip label={formatChoiceSelection(vote.choice)}>
            <InfoOutlineIcon color="gray.500" boxSize={3} />
          </Tooltip>
        </Flex>
      </Flex>
    </Box>
  );
};

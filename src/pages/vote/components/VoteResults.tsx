import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { store } from '@/store';

// Components
import { Box, Heading, Flex, Stack, Text, Tooltip, useBoolean, Button, Avatar } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { formatWallet } from '@/utils';

// Models
import { QuadraticVote } from 'hedsvote';
import { useNavigate } from 'react-router-dom';

// Constants
import { OLD_TAPES } from '@pages/vote/store/constants';

export const VoteResults = () => {
  const { id } = useParams();
  const votes = useSelector(store.select.voteModel.selectQuadraticVotes);
  const [isShowingAllResults, setIsShowingAllResults] = useBoolean();
  const isOldTape = OLD_TAPES.includes(id);

  return (
    <>
      {votes && !isOldTape && (
        <Stack>
          <Heading
            mt={{ base: 5, lg: 4 }}
            py={{ base: 0, lg: 1 }}
            className="animate__animated animate__fadeIn"
            fontWeight="medium"
            letterSpacing="widest"
            size={['xs', 'sm']}
            color={'gray.900'}
          >
            RESULTS
          </Heading>
          <Stack my={2} border="1px" borderColor="gray.700" borderRadius="md" p={1}>
            {votes.length > 0 &&
              votes
                .sort((a, b) => b.vp - a.vp)
                .slice(0, isShowingAllResults ? -1 : 5)
                .map((vote) => <VoterCard vote={vote} key={vote.voter} />)}
          </Stack>
          <Button borderColor="gray.500" fontWeight={'normal'} fontSize={'xs'} size="sm" variant={'outline'} onClick={setIsShowingAllResults.toggle}>
            {isShowingAllResults ? 'show less' : 'show all'}
          </Button>
        </Stack>
      )}
    </>
  );
};

const VoterCard = ({ vote }: { vote: QuadraticVote }) => {
  const { voter, vp } = vote;
  const choices = useSelector(store.select.voteModel.selectProposalChoices);
  const resultsUserData = useSelector(store.select.voteModel.selectResultsUserData);
  const navigate = useNavigate();
  const formatChoiceSelection = (voteObject: { [id: string]: number }) => {
    const totalScore = Object.values(voteObject).reduce((a, b) => a + b, 0);
    const selectedChoices = Object.keys(voteObject).map((id) => {
      const choiceId = parseInt(id) - 1;
      const choice = choices[choiceId];
      const percentage = ((voteObject[id] / totalScore) * 100).toFixed(2);
      return `${percentage}% for ${choice?.name ? choice.name : ''}`;
    });
    return selectedChoices.join(', ');
  };

  return (
    <Box border="1px" borderColor="gray.400" borderRadius="md" px={1} bgColor="gray.50">
      <Flex justifyContent="space-between" px={1} py={2}>
        <Flex gap={2} alignItems={'center'}>
          <Avatar
            onClick={() => navigate(`/u/${vote.voter.toLowerCase()}`)}
            borderRadius={'sm'}
            src={resultsUserData?.[vote.voter.toLowerCase()]?.profilePicture}
            size="xs"
          />
          <Text fontSize="xs" fontFamily="monospace" letterSpacing="wide">
            {formatWallet(voter)}
          </Text>
        </Flex>
        <Flex gap={2} alignItems="center">
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

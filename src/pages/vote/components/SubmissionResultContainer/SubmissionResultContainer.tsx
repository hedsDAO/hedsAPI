import { useState } from 'react';
import { useSelector } from 'react-redux';

// Components
import { Box, Flex, Text } from '@chakra-ui/react';
import { Submissions } from '@/pages/vote/components/Submissions/Submissions';
import { VoterResults } from '@/pages/vote/components/VoterResults/VoterResults';
import { store } from '@/store';

export const SubmissionResultContainer = () => {
  const [voterChoices, setVoterChoices] = useState({});
  const tracks = useSelector(store.select.tapeModel.selectTracks);
  const choices = useSelector(store.select.voteModel.selectChoices);
  const scores = useSelector(store.select.voteModel.selectScores);
  const votes = useSelector(store.select.voteModel.selectVotes);
  const sortedChoicesByResults = useSelector(store.select.voteModel.selectSortedChoicesByResults({ choices, scores, tracks }));

  const handleVoterChoices = (votesObj: { [key: number]: number }) => {
    setVoterChoices(votesObj);
  };

  return (
    <Flex direction={['column', 'row']} justifyContent="space-around" mt={{ lg: 4 }} px={{ base: 12, lg: 16 }}>
      <Box w={['100%', '70%']}>
        <Text color="white" fontFamily="poppins" fontSize="lg" letterSpacing="wider">
          SUBMISSIONS
        </Text>
        <Text color="white" fontFamily="inter" fontSize="sm">
          Listen to the songs and like the songs you’d want to vote for
        </Text>
        {sortedChoicesByResults?.length && <Submissions choices={sortedChoicesByResults} voterChoices={voterChoices} />}
      </Box>

      <Box width={['100', '20%']}>
        <Text color="white" fontFamily="poppins" fontSize="lg" letterSpacing="wider">
          RESULTS
        </Text>
        <Text color="white" fontFamily="inter" fontSize="sm">
          Voting has been closed and here are the results
        </Text>
        {votes?.length > 0 && <VoterResults handleVoterChoices={handleVoterChoices} />}
      </Box>
    </Flex>
  );
};

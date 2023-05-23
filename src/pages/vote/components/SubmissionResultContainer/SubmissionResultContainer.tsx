import { useSelector } from 'react-redux';

import { Box, Flex, Text } from '@chakra-ui/react';
import { Submissions } from '@/pages/vote/components/Submission/Submissions';
import { VoterResults } from '@/pages/vote/components/VoterResults/VoterResults';
import { store } from '@/store';

export const SubmissionResultContainer = () => {
  const choices = useSelector(store.select.voteModel.selectChoices);
  const scores = useSelector(store.select.voteModel.selectScores);
  const tracks = useSelector(store.select.tapeModel.selectTracks);
  const votes = useSelector(store.select.voteModel.selectVotes);

  const sortedChoicesByResults = useSelector(store.select.voteModel.selectSortedChoicesByResults({ choices, scores, tracks }));

  return (
    <Flex direction={['column', 'row']} justifyContent="space-around" mt={{ lg: 4 }} px={{ base: 12, lg: 16 }}>
      <Box w={['100%', '70%']}>
        <Text color="white" fontFamily="poppins" fontSize="lg" letterSpacing="wider">
          SUBMISSIONS
        </Text>
        <Text color="white" fontFamily="inter" fontSize="sm">
          Listen to the songs and like the songs you’d want to vote for
        </Text>
        {sortedChoicesByResults?.length && <Submissions choices={sortedChoicesByResults} />}
      </Box>

      <Box width={['100', '20%']} mt={{ base: 6 }}>
        <Text color="white" fontFamily="poppins" fontSize="lg" letterSpacing="wider">
          RESULTS
        </Text>
        <Text color="white" fontFamily="inter" fontSize="sm">
          Voting has been closed and here are the results
        </Text>
        {votes?.length > 0 && <VoterResults />}
      </Box>
    </Flex>
  );
};

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Dispatch, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Grid, Heading, Skeleton, Text, VStack } from '@chakra-ui/react';
import { SubmissionCards } from './SubmissionCard';

import { Choice } from 'hedsvote';
import { SubmissionChoice } from '../store/voteModel';

export const Submissions = () => {
  const { tape, id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const choices = useSelector(store.select.voteModel.selectProposalChoices);
  const proposal = useSelector(store.select.voteModel.selectProposal);
  const scores = useSelector(store.select.voteModel.selectScores);
  const currentTape = useSelector(store.select.tapesModel.selectCurrentVoteTape([tape, id]));
  const sortedChoicesByResults = useSelector(store.select.voteModel.selectSortedChoicesByResults({ choices, scores, tapeTrackIds: currentTape?.tracks }));

  console.log(sortedChoicesByResults);

  return (
    <Box mx="auto">
      <Heading
        px={{ base: 0, lg: 2 }}
        className="animate__animated animate__fadeIn"
        fontWeight="light"
        letterSpacing="widest"
        size={['xs', 'sm']}
        color={'gray.900'}
      >
        SUBMISSIONS
      </Heading>
      <Grid pt={6} templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={1}>
        {sortedChoicesByResults.length && <SubmissionCards choices={sortedChoicesByResults} />}
      </Grid>
    </Box>
  );
};

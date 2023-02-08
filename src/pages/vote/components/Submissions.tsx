import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Dispatch, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Divider, Grid, Heading, Skeleton, Text, VStack } from '@chakra-ui/react';
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

  const handleSelectedSubmission = (choice: SubmissionChoice) => {
    dispatch.voteModel.setCurrentTrack(choice);
  };

  return (
    <Box mx="auto">
      <Divider my={3} borderColor="transparent" w="full" />
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
      <Divider my={3} borderColor="transparent" w="full" />

      {sortedChoicesByResults.length && <SubmissionCards choices={sortedChoicesByResults} handleSelectedSubmission={handleSelectedSubmission} tapeId={id} />}
    </Box>
  );
};

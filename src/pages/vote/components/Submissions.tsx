import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Dispatch, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Divider, Grid, Heading, Skeleton, Text, VStack } from '@chakra-ui/react';
import { SubmissionCards, OldTapeTrack } from './SubmissionCards';

import { Choice } from 'hedsvote';
import { SubmissionChoice } from '../store/voteModel';
import { OLD_TAPES } from '@pages/vote/store/constants';

export const Submissions = () => {
  const { tape, id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const choices = useSelector(store.select.voteModel.selectProposalChoices);
  const scores = useSelector(store.select.voteModel.selectScores);
  const currentTape = useSelector(store.select.tapesModel.selectCurrentVoteTape([tape, id]));
  const sortedChoicesByResults = useSelector(store.select.voteModel.selectSortedChoicesByResults({ choices, scores, tapeTrackIds: currentTape?.tracks }));

  const handleSelectedSubmission = (choice: SubmissionChoice) => {
    dispatch.voteModel.setCurrentTrack(choice);
  };

  const isOldTape = OLD_TAPES.includes(id);

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
      {sortedChoicesByResults.length > 0 && !isOldTape ? (
        <SubmissionCards choices={sortedChoicesByResults} handleSelectedSubmission={handleSelectedSubmission} />
      ) : (
        <OldTapeTrack choices={choices} handleSelectedSubmission={handleSelectedSubmission} />
      )}
    </Box>
  );
};

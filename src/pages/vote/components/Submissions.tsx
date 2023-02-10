import { useParams } from 'react-router-dom';
import { Dispatch, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { Box, Divider, Flex, Heading, Tooltip } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { SubmissionCards, OldTapeTrack } from './SubmissionCards';

// Constants
import { SubmissionChoice } from '../store/voteModel';
import { OLD_TAPES, ABOUT_SUBMISSIONS } from '@pages/vote/store/constants';

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
      <Flex justifyContent="space-between">
        <Heading className="animate__animated animate__fadeIn" fontWeight="medium" letterSpacing="widest" size={['xs', 'sm']} color={'gray.900'}>
          SUBMISSIONS
        </Heading>
        <Tooltip label={ABOUT_SUBMISSIONS}>
          <InfoOutlineIcon color="gray.500" />
        </Tooltip>
      </Flex>
      <Divider my={1.5} borderColor="transparent" w="full" />
      <Box border="1px" borderColor="gray.700" borderRadius="md" p={1} bgColor="gray.50">
        {sortedChoicesByResults.length > 0 && !isOldTape ? (
          <SubmissionCards choices={sortedChoicesByResults} handleSelectedSubmission={handleSelectedSubmission} />
        ) : (
          <OldTapeTrack choices={choices} handleSelectedSubmission={handleSelectedSubmission} />
        )}
      </Box>
    </Box>
  );
};

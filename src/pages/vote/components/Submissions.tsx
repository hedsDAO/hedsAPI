import { useParams } from 'react-router-dom';
import { Dispatch, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { Box, Divider, Flex, Heading, Tooltip } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { SubmissionCards, OldTapeSubmissions, OpenVoteCards, Tape06Submissions } from './SubmissionCards';

// Constants
import { SubmissionChoice } from '../store/voteModel';
import { OLD_TAPES, ABOUT_SUBMISSIONS, ABOUT_SUBMISSIONS_OLD_TAPES, ABOUT_SUBMISSIONS_HT6, HEDSTAPE06SELECTED } from '@pages/vote/store/constants';
import { ProposalState } from 'hedsvote';

export const Submissions = () => {
  const { tape, id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const choices = useSelector(store.select.voteModel.selectProposalChoices);
  const scores = useSelector(store.select.voteModel.selectScores);
  const currentTape = useSelector(store.select.tapesModel.selectCurrentVoteTape([tape, id]));
  const sortedChoicesByResults = useSelector(store.select.voteModel.selectSortedChoicesByResults({ choices, scores, tapeTrackIds: currentTape?.tracks }));
  const proposalState = useSelector(store.select.voteModel.selectProposalState);
  const handleSelectedSubmission = (choice: SubmissionChoice) => {
    dispatch.voteModel.setCurrentTrack(choice);
  };

  const isOldTape = OLD_TAPES.includes(id);
  const isHedsTAPE06 = id === '6';

  return (
    <Box mx="auto">
      <Divider my={3} borderColor="transparent" w="full" />
      <Flex justifyContent="space-between">
        <Heading className="animate__animated animate__fadeIn" fontWeight="medium" letterSpacing="widest" size={['xs', 'sm']} color={'gray.900'}>
          SUBMISSIONS
        </Heading>
        {proposalState === ProposalState.CLOSED && (
          <Tooltip label={isOldTape ? ABOUT_SUBMISSIONS_OLD_TAPES : isHedsTAPE06 ? ABOUT_SUBMISSIONS_HT6 : ABOUT_SUBMISSIONS}>
            <InfoOutlineIcon color="gray.500" />
          </Tooltip>
        )}
      </Flex>
      <Divider my={1.5} borderColor="transparent" w="full" />
      <Box border="1px" borderColor="gray.700" borderRadius="md" p={1} bgColor="gray.50">
        {proposalState === ProposalState.OPEN ? (
          <OpenVoteCards choices={choices} handleSelectedSubmission={handleSelectedSubmission} />
        ) : isHedsTAPE06 ? (
          <Tape06Submissions
            tracks={choices.filter((choice) => HEDSTAPE06SELECTED.includes(choice.name)).sort((a, b) => b.score - a.score)}
            choices={choices.filter((choice) => !HEDSTAPE06SELECTED.includes(choice.name)).sort((a, b) => b.score - a.score)}
            handleSelectedSubmission={handleSelectedSubmission}
          />
        ) : sortedChoicesByResults.length > 0 && !isOldTape ? (
          <SubmissionCards choices={sortedChoicesByResults} handleSelectedSubmission={handleSelectedSubmission} />
        ) : (
          <OldTapeSubmissions
            tracks={choices.filter((choice) => currentTape?.tracks.includes(choice.walletId))}
            choices={choices.filter((choice) => !currentTape?.tracks.includes(choice.walletId))}
            handleSelectedSubmission={handleSelectedSubmission}
          />
        )}
      </Box>
    </Box>
  );
};

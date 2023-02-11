import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, store } from '@/store';

// Components
import { TapeBanner } from '../components/TapeBanner';
import { NewTapeDescription } from '../components/NewTapeDescription';
import { VoteAudioTrack } from '../components/VoteAudioTrack';
import { Submissions } from '../components/Submissions';
import { VoteResults } from '../components/VoteResults';
import { ActiveVoting } from '../components/ActiveVoting';
import { ActiveSubmissions } from '../components/ActiveSubmissions';
import { Container, Box, Flex } from '@chakra-ui/react';

// Models
import { Choice, ProposalState } from 'hedsvote';
import { VoteChoice } from '../store/voteModel';

export const NewTapeDetails = () => {
  const { space, tape, id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const allTapes = useSelector(store.select.tapesModel.selectAllTapes);
  const proposal = useSelector(store.select.voteModel.selectProposal);
  const proposalState = proposal?.state;
  const userLikes = useSelector(store.select.voteModel.selectUserLikes);

  useEffect(() => {
    if (space && tape && id && allTapes?.[tape]?.[id]?.proposalId) {
      const currentTape = allTapes[tape][id];
      dispatch.voteModel.getProposal(currentTape?.proposalId);
    }
  }, [space, tape, id, allTapes]);

  const handleSelectedSubmission = (choice: Choice) => {
    dispatch.voteModel.setCurrentTrack(choice);
  };

  return (
    <Container maxW="100%">
      <Box px={{ base: 2, lg: 4 }} pb={10} pt={5} maxW="7xl" mx="auto">
        <TapeBanner />
        <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 8, lg: 10 }}>
          <Box w={{ lg: '25%' }}>
            <NewTapeDescription />
            {proposalState === ProposalState.CLOSED ? <VoteResults /> : <ActiveVoting />}
          </Box>
          <Box w={{ lg: '75%' }}>
            <VoteAudioTrack />
            {proposalState === ProposalState.CLOSED ? <Submissions /> : <ActiveSubmissions handleSelectedSubmission={handleSelectedSubmission} />}
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};

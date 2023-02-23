import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, store } from '@/store';

// Components
import { TapeBanner } from '../components/TapeBanner';
import { TapeDescription } from '../components/TapeDescription';
import { VoteAudioTrack } from '../components/VoteAudioTrack';
import { Submissions } from '../components/Submissions';
import { VoteResults } from '../components/VoteResults';
import { Container, Box, Flex } from '@chakra-ui/react';
import { CastVoteContainer } from '../components/CastVoteContainer';

// Models
import { ProposalState } from 'hedsvote';

export const TapeDetails = () => {
  const { space, tape, id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const allTapes = useSelector(store.select.tapesModel.selectAllTapes);
  const proposalState = useSelector(store.select.voteModel.selectProposalState);

  useEffect(() => {
    if (space && tape && id && allTapes?.[tape]?.[id]?.proposalId) {
      const currentTape = allTapes[tape][id];
      dispatch.voteModel.getProposal(currentTape?.proposalId);
    }
  }, [space, tape, id, allTapes]);

  return (
    <Container maxW="100%">
      <Box px={{ base: 2, lg: 4 }} pb={10} pt={5} maxW="7xl" mx="auto">
        <TapeBanner />
        <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 8, lg: 10 }}>
          <Box maxW={{ lg: '25%' }} minW={{ lg: '25%' }} w={{ lg: '25%' }}>
            <TapeDescription />
            {proposalState === ProposalState.CLOSED ? <VoteResults /> : <CastVoteContainer />}
          </Box>
          <Box maxW={{ lg: '75%' }} minW={{ lg: '75%' }} w={{ lg: '75%' }}>
            <VoteAudioTrack />
            <Submissions />
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};

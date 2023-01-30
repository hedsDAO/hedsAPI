import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Utils
import { Dispatch, RootState, store } from '@/store';
import { isEmpty } from '@/utils';

// Components
import { Box, Container, VStack } from '@chakra-ui/react';
import { VoteChoices } from '../components/VoteChoices';
import { VoteAudioTrack } from '../components/VoteAudioTrack';
import { TapeDescription } from '../components/TapeDescription';
import { TapeHeader } from '../components/TapeHeader';

export const TapeDetails = () => {
  const { space, tape, id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const allTapes = useSelector(store.select.tapesModel.selectAllTapes);
  const proposal = useSelector(store.select.voteModel.selectProposal);
  const currentTrack = useSelector(store.select.voteModel.selectCurrentTrack);
  const isLoadingProposal = useSelector((state: RootState) => state.loading.effects.voteModel.getProposal);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (space && tape && id && allTapes?.[tape]?.[id]?.proposalId && !isLoadingProposal) {
      const currentTape = allTapes[tape][id];
      dispatch.voteModel.getProposal(currentTape?.proposalId);
    }
  }, [space, tape, id, allTapes]);

  return (
    <Box minH="100vh">
      <Container maxW="6xl">
        <VStack spacing="36px" align="stretch">
          {!isEmpty(allTapes) && <TapeHeader />}
          <TapeDescription tapeImage={allTapes?.[tape]?.[id]?.image} tapeId={id} />
          {currentTrack?.media?.length && !isLoadingProposal && <VoteAudioTrack />}
          {proposal?.signature && proposal?.scores && <VoteChoices />}
        </VStack>
      </Container>
    </Box>
  );
};

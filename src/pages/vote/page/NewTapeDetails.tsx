import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, store } from '@/store';

// Components
import { TapeBanner } from '../components/TapeBanner';
import { NewTapeDescription } from '../components/NewTapeDescription';
import { VoteAudioTrack } from '../components/VoteAudioTrack';
import { Submissions } from '../components/Submissions';
import { Container, Box, Flex } from '@chakra-ui/react';

export const NewTapeDetails = () => {
  const { space, tape, id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const allTapes = useSelector(store.select.tapesModel.selectAllTapes);

  useEffect(() => {
    if (space && tape && id && allTapes?.[tape]?.[id]?.proposalId) {
      const currentTape = allTapes[tape][id];
      dispatch.voteModel.getProposal(currentTape?.proposalId);
    }
  }, [space, tape, id, allTapes]);

  return (
    <Container maxW="100%">
      <Box px={{ base: 5, lg: 4 }} pb={10} pt={5} maxW="7xl" mx="auto">
        <TapeBanner />
        <Flex gap={4}>
          <Box w="25%">
            <NewTapeDescription />
          </Box>
          <Box w="75%">
            <VoteAudioTrack />
            <Submissions />
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};

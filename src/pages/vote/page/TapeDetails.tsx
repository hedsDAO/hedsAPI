import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Utils
import { Dispatch, RootState, store } from '@/store';
import { isEmpty } from '@/utils';

// Components
import { Box, Container, Divider, Flex, HStack, Spinner, Text } from '@chakra-ui/react';
import { VoteChoices } from '../components/VoteChoices';
import { VoteAudioTrack } from '@/common/media';
import { TapeDescription } from '../components/TapeDescription';

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
      {!isEmpty(allTapes) && (
        <Container justifyContent={'center'} py={{ base: '2', md: '8' }}>
          <HStack gap={2}>
            <Divider borderColor="gray.700" w="full" />
            {allTapes?.[tape]?.[id]?.name && (
              <Flex gap={3} alignItems={'baseline'}>
                <Text fontFamily={"'Space Mono', monospace"} fontSize="lg" fontWeight="semibold" whiteSpace="nowrap" letterSpacing={'widest'}>
                  {allTapes?.[tape]?.[id]?.name}
                </Text>
              </Flex>
            )}

            <Divider borderColor="gray.700" w="full" />
          </HStack>
        </Container>
      )}

      <TapeDescription proposal={proposal} tapeImage={allTapes?.[tape]?.[id]?.image} />

      {currentTrack?.media?.length && !isLoadingProposal && <VoteAudioTrack choice={currentTrack} />}

      {proposal?.signature ? (
        <VoteChoices />
      ) : (
        // <Divider py={10} borderColor="gray.300" w="8xl" mx="auto" />
        <Flex minH="50vh" pt="5" justifyContent={'center'} align="center">
          <Spinner size={'lg'} />
        </Flex>
      )}
    </Box>
  );
};

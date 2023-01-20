import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Utils
import { Dispatch, RootState, store } from '@/store';
import { isEmpty } from '@/utils';

// Components
import { Box, Container, Divider, Flex, Heading, HStack, Spinner, Text, useBoolean } from '@chakra-ui/react';
import { VoteChoices } from '../components/VoteChoices';
import { VoteDistribution } from '../components/VoteDistribution';
import WaveformPlayer from '@/modules/audio/screens/local/WaveformPlayer/WaveformPlayer';
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

      {currentTrack?.media?.length && !isLoadingProposal && (
        <Container mb={5} py={5} w="full" maxW="6xl">
          <Heading
            px={{ base: 0, lg: 2 }}
            className="animate__animated animate__fadeIn"
            fontWeight={'semibold'}
            letterSpacing={'widest'}
            size={['xs', 'sm']}
            color={'gray.900'}
          >
            NOW PLAYING
          </Heading>
          <Divider my={3} borderColor="transparent" w="full" />
          <VoteAudioTrack choice={currentTrack} />
        </Container>
      )}

      {proposal?.signature ? (
        <>
          <VoteChoices />
          <Divider py={10} borderColor="gray.300" w="8xl" mx="auto" />
        </>
      ) : (
        <Flex minH="50vh" pt="5" justifyContent={'center'} align="center">
          <Spinner size={'lg'} />
        </Flex>
      )}
      {proposal?.votes && <VoteDistribution />}
    </Box>
  );
};

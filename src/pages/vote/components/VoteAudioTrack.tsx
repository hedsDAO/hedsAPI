import { useSelector } from 'react-redux';
import { store, RootState } from '@/store';
import { useParams } from 'react-router-dom';

// Components
import { Box, Divider, Flex, Heading, Image, Skeleton, Stack, Text, useBoolean } from '@chakra-ui/react';
import WaveformPlayer from '@/modules/audio/screens/local/WaveformPlayer/WaveformPlayer';

export const VoteAudioTrack = () => {
  const { space, tape, id } = useParams();
  const [isImageLoaded, setIsImageLoaded] = useBoolean();
  const currentTrack = useSelector(store.select.voteModel.selectCurrentTrack);
  const isLoadingProposal = useSelector((state: RootState) => state.loading.effects.voteModel.getProposal);
  const artistChosenForTape = useSelector(store.select.tapesModel.selectTapeArtistWalletsBySpaceTapeId([space, tape, id]));

  return (
    <Box mx="auto">
      {!isLoadingProposal && currentTrack?.media?.length ? (
        <>
          <Heading className="animate__animated animate__fadeIn" fontWeight="medium" letterSpacing="widest" size={['xs', 'xs']} color={'gray.900'}>
            NOW PLAYING
          </Heading>
          <Divider my={1} borderColor="transparent" w="full" />
          <Flex gap={6} direction={{ base: 'column', lg: 'row' }} alignItems={{ lg: 'center' }} py={3} rounded="sm" className="group" borderRadius="lg">
            <Flex>
              <Skeleton isLoaded={isImageLoaded} minW="60px" minH="60px" maxW="60px">
                <Image
                  border="1px"
                  borderColor="gray.400"
                  height="60px"
                  width="60px"
                  onLoad={setIsImageLoaded.on}
                  src={currentTrack?.image}
                  objectFit="cover"
                  rounded="md"
                  shadow={'sm'}
                />
              </Skeleton>
              <Stack justifyContent="center" px={3}>
                <Text className="font-serif" mt={'0rem !important'} fontSize="xs" color="gray.800">
                  {currentTrack.name}
                </Text>
                {artistChosenForTape.includes(currentTrack.walletId.toLowerCase()) && (
                  <Text className="font-serif" mt={'0rem !important'} fontSize="2xs" color="gray.600">
                    {currentTrack.artist}
                  </Text>
                )}
              </Stack>
            </Flex>
            <WaveformPlayer audio={currentTrack?.media} />
          </Flex>
        </>
      ) : null}
    </Box>
  );
};

import { useSelector } from 'react-redux';
import { store, RootState } from '@/store';
import { useParams } from 'react-router-dom';

// Components
import { Box, Divider, Flex, Heading, Image, Skeleton, Stack, Text, useBoolean } from '@chakra-ui/react';
import WaveformPlayer from '@/modules/audio/screens/local/WaveformPlayer/WaveformPlayer';

export const VoteAudioTrack = () => {
  const { id } = useParams();
  const [isImageLoaded, setIsImageLoaded] = useBoolean();
  const currentTrack = useSelector(store.select.voteModel.selectCurrentTrack);
  const isLoadingProposal = useSelector((state: RootState) => state.loading.effects.voteModel.getProposal);

  return (
    <Box mx="auto">
      {!isLoadingProposal && currentTrack?.media?.length ? (
        <>
          <Heading
            px={{ base: 0, lg: 2 }}
            className="animate__animated animate__fadeIn"
            fontWeight="light"
            letterSpacing="widest"
            size={['xs', 'sm']}
            color={'gray.900'}
          >
            NOW PLAYING
          </Heading>
          <Divider my={3} borderColor="transparent" w="full" />
          <Flex py={4} rounded="sm" className="group" borderRadius="lg">
            <Skeleton mb={2} isLoaded={isImageLoaded} minW="60px" minH="60px" maxW="60px">
              <Image
                height="60px"
                width="60px"
                onLoad={setIsImageLoaded.on}
                _hover={{ opacity: 0 }}
                className="pointer-events-auto group-hover:opacity-20 ease-in-out transition-all"
                src={currentTrack?.image}
                objectFit="cover"
                rounded="md"
              />
            </Skeleton>
            <Stack justifyContent="center" pl={2}>
              <Text className="font-serif" fontSize="sm" color="gray.800">
                {currentTrack.name}
              </Text>
              <Text className="font-serif" fontSize="xs" color="gray.400">
                {currentTrack.artist}
              </Text>
            </Stack>
            <WaveformPlayer audio={currentTrack?.media} />
          </Flex>
        </>
      ) : null}
    </Box>
  );
};

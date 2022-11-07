import { IconButton, Flex, Grid, GridItem, Center, Image, Text } from '@chakra-ui/react';
import { PlayerButtons, TrackDetails } from '@/modules/audio/screens/mobile/components';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import Marquee from 'react-fast-marquee';

const MobileAudio = ({ wavesurfer }: { wavesurfer: React.MutableRefObject<WaveSurfer> }) => {
  const dispatch = useDispatch<Dispatch>();
  const audioData = useSelector((state: RootState) => state.audioModel);
  return (
    <Grid display={{ base: 'grid', lg: 'none' }} height="6rem" templateColumns="repeat(12, 1fr)">
      <GridItem colSpan={3} bg="gray.200">
        <Flex px={2} alignItems={'center'} justifyContent={'start'} height="100%" bg="gray.200" w="full">
          <Center w="5rem">
            <Image my="auto" maxW="5rem" minH="5rem" maxH="5rem" minW="5rem" rounded="lg" src={audioData?.activeTrack?.cover} objectFit="cover" />
          </Center>
        </Flex>
      </GridItem>
      <GridItem colSpan={9} bg="gray.200">
        <Flex direction={'column'} alignItems={'center'}>
          <Marquee className="-ml-2 py-2 w-[98%]" gradient={false}>
            <Flex px={3} direction={'row'} alignItems="baseline" gap={2}>
              <Text whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize="md" fontWeight={'bold'}>
                {audioData?.activeTrack?.track}
              </Text>
              <Text whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize={'sm'} fontWeight={'semibold'}>
                {audioData?.activeTrack?.tape}
              </Text>
              <Text py={1} whiteSpace={'nowrap'} letterSpacing={'tight'} fontSize={'xs'} fontWeight="light">
                {audioData?.activeTrack?.artist}
              </Text>
            </Flex>
          </Marquee>
          <Flex bg="gray.200" w="full" gap={2} justifyContent="center" alignItems={'center'}>
            <IconButton _hover={{ bg: 'gray.200' }} onClick={() => {}} aria-label="previous track" icon={<i className="fa-solid fa-backward-step"></i>} />
            {audioData?.isLoading ? (
              <IconButton _hover={{ bg: 'gray.200' }} aria-label="loading" isLoading={true} />
            ) : audioData?.isPlaying ? (
              <IconButton
                _hover={{ bg: 'gray.200' }}
                onClick={() => {
                  dispatch.audioModel.setIsPlaying(false);
                  // wavesurfer.current?.playPause();
                }}
                aria-label="pause"
                icon={<i className="fa-solid fa-pause"></i>}
              />
            ) : (
              <IconButton
                _hover={{ bg: 'gray.200' }}
                onClick={() => {
                  dispatch.audioModel.setIsPlaying(true);
                  // wavesurfer.current?.playPause();
                }}
                aria-label="play"
                icon={<i className="fa-solid fa-play"></i>}
              />
            )}
            <IconButton _hover={{ bg: 'gray.200' }} onClick={() => {}} aria-label="next track" icon={<i className="fa-solid fa-forward-step"></i>} />
            <IconButton _hover={{ bg: 'gray.200' }} onClick={() => {}} aria-label="next track" icon={<i className="fa-solid fa-heart"></i>} />
            <IconButton
              onClick={() => dispatch.audioModel.setIsShowingQueue(!audioData?.isShowingQueue)}
              aria-label="queue"
              icon={<i className="fa-solid fa-layer-group"></i>}
              className="hover:scale-125"
              _hover={{ bg: 'gray.200' }}
            />
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default MobileAudio;

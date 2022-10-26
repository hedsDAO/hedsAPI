import { useRef, useEffect, Fragment } from 'react';
import { Dispatch, RootState } from '@/store';
import WaveSurfer from 'wavesurfer.js';
import { formWaveSurferOptions } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Grid, GridItem, IconButton } from '@chakra-ui/react';
import { VolumeSlider, TrackDetails, PlayerButtons, DesktopQueue } from '@/modules/audio/screens/desktop/components';
import { Transition } from '@headlessui/react';

const DesktopAudio = ({ wavesurfer }: { wavesurfer: React.MutableRefObject<WaveSurfer> }) => {
  const dispatch = useDispatch<Dispatch>();
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const audioData = useSelector((state: RootState) => state.audioModel);

  useEffect(() => {
    if (audioData?.currentTrack || audioData?.queue?.length) {
      dispatch.audioModel.setIsLoading(true);
      var options; // wavesurfer params
      if (wavesurfer?.current && waveformRef.current) wavesurfer.current.destroy();
      if (waveformRef.current) options = formWaveSurferOptions(waveformRef.current);
      if (options) wavesurfer.current = WaveSurfer.create(options);
      wavesurfer?.current?.load(audioData?.currentTrack?.audio);
      wavesurfer?.current?.on('ready', () => {
        dispatch.audioModel.setIsLoading(false);
      });
      wavesurfer?.current?.on('finish', () => {});
    }
    return () => {
      if (!audioData?.currentTrack) {
        dispatch.audioModel.clearAudioState();
        wavesurfer.current.destroy();
      }
    };
  }, [audioData.currentTrack]);

  return (
    <Transition
      show={audioData?.isShowingPlayer}
      enter="transform transition ease-in-out duration-500 sm:duration-700"
      enterFrom="translate-y-20"
      enterTo="translate-y-full"
      leave="transform transition ease-in-out duration-500 sm:duration-700"
      leaveFrom="translate-y-0"
      leaveTo="translate-y-full"
    >
      <DesktopQueue />
      <Grid
        className="animate__animated animate__fadeInUp border-t border-neutral-400 bg-white"
        display={{ base: 'none', lg: 'grid' }}
        height="6rem"
        templateColumns="repeat(24, 1fr)"
      >
        <GridItem colSpan={4}>
          <TrackDetails />
        </GridItem>
        <GridItem colSpan={2}>{wavesurfer?.current && <PlayerButtons wavesurfer={wavesurfer} />}</GridItem>
        <GridItem colSpan={14}>
          <Flex alignItems={'center'} justifyContent={'center'} height="100%" w="full">
            <div id="waveform-global" className="flex-shrink-0 flex-grow-0 mx-2 w-[90%]" ref={waveformRef} />
          </Flex>
        </GridItem>
        <GridItem colSpan={1}>
          <Flex h="full" alignItems={'center'} justifyContent={'center'}>
            <IconButton
              onClick={() => dispatch.audioModel.setIsShowingQueue(!audioData?.isShowingQueue)}
              aria-label="queue"
              icon={<i className="fa-solid fa-layer-group"></i>}
              className="hover:scale-125"
              _hover={{ bg: 'gray.200' }}
            />
          </Flex>
        </GridItem>
        <GridItem colSpan={3}>
          <VolumeSlider wavesurfer={wavesurfer} />
        </GridItem>
      </Grid>
    </Transition>
  );
};

export default DesktopAudio;

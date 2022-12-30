import { useRef, useEffect } from 'react';
import { Dispatch, store } from '@/store';
import { formWaveSurferOptions } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Grid, GridItem } from '@chakra-ui/react';
import { VolumeSlider, TrackDetails, PlayerButtons, QueueContainer } from '@/modules/audio/screens/global/components';
import { Transition } from '@headlessui/react';
import { WaveSurferParams } from 'wavesurfer.js/types/params';
import WaveSurfer from 'wavesurfer.js';

const GlobalAudio = ({ wavesurfer }: { wavesurfer: React.MutableRefObject<WaveSurfer> }) => {
  const dispatch = useDispatch<Dispatch>();
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const audio = useSelector(store.select.audioModel.selectActiveTrackAudio);
  const track = useSelector(store.select.audioModel.selectActiveTrack);
  const isShowingPlayer = useSelector(store.select.audioModel.selectIsShowingPlayer);
  const isClosingPlayer = useSelector(store.select.audioModel.selectIsClosingPlayer);
  const walletId = useSelector(store.select.userModel.selectConnectedUserWallet);
  const isQueueEmpty = useSelector(store.select.audioModel.selectIsQueueEmpty);

  useEffect(() => {
    if (audio || !isQueueEmpty) {
      dispatch.audioModel.setIsLoading(true);
      var options: WaveSurferParams; // wavesurfer params
      if (wavesurfer?.current && waveformRef.current) wavesurfer.current.destroy();
      if (waveformRef.current) options = formWaveSurferOptions(waveformRef.current);
      if (options) wavesurfer.current = WaveSurfer.create(options);
      wavesurfer?.current?.load(audio);
      wavesurfer?.current?.on('ready', () => {
        const duration = Math.ceil(wavesurfer.current.getDuration());
        dispatch.audioModel.setIsLoading(false);
        dispatch.audioModel.setDuration(duration);
        dispatch.audioModel.setCountPlayThreshold(duration);
        dispatch.audioModel.setTimerSeconds(0);
        if (walletId && track) dispatch.audioModel.updaterUserListeningHistory({ track, walletId });
      });
      wavesurfer?.current?.on('play', () => {
        dispatch.audioModel.updaterUserListeningHistory({ track, walletId });
      });
      wavesurfer?.current?.on('finish', () => {
        dispatch.audioModel.setIsPlaying(false);
        if (!isQueueEmpty) {
          setTimeout(() => {
            dispatch.audioModel.skipToNextTrack();
          }, 500);
        } else {
          dispatch.audioModel.setIsShowingPlayer(false);
          wavesurfer.current.destroy();
        }
      });
    }
    return () => {
      if (!audio) {
        dispatch.audioModel.clearAudioState();
        wavesurfer.current.destroy();
      }
    };
  }, [audio]);

  return (
    <>
      <Transition
        show={isShowingPlayer && !isClosingPlayer}
        enter="transform transition ease-in-out duration-500 sm:duration-700"
        enterFrom="translate-y-20"
        enterTo="translate-y-full"
        leave="transform transition ease-in-out duration-500 sm:duration-700"
        leaveFrom="translate-y-0"
        leaveTo="translate-y-full"
      >
        <QueueContainer />
        <Grid
          className="animate__animated animate__fadeInUp border-t border-neutral-400 bg-white relative z-40"
          display={'grid'}
          height={{ base: '6.5rem', md: '6rem' }}
          alignItems={'center'}
          templateColumns={'repeat(24, 1fr)'}
        >
          <GridItem colSpan={{ base: 12, md: 6, lg: 5, xl: 3 }}>
            <TrackDetails />
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 5, lg: 4, xl: 4 }}>{wavesurfer?.current && <PlayerButtons wavesurfer={wavesurfer} />}</GridItem>
          <GridItem colSpan={{ base: 24, md: 12, lg: 11, xl: 14 }}>
            <Flex alignItems={'center'} justifyContent={'center'} height="100%" w={'full'} pt={{ base: 3, md: 0 }}>
              <div
                id="waveform-global"
                className="md:relative absolute md:top-0 top-[5.2rem] pointer-events-none md:pointer-events-auto flex-shrink-0 flex-grow-0 px-4 lg:pl-5 w-[100%]"
                ref={waveformRef}
              />
            </Flex>
          </GridItem>
          <GridItem display={{ base: 'none', lg: 'grid' }} colSpan={{ lg: 4, xl: 3 }}>
            <VolumeSlider wavesurfer={wavesurfer} />
          </GridItem>
        </Grid>
      </Transition>
    </>
  );
};

export default GlobalAudio;

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Box, Flex, GridItem, SimpleGrid, Stack, useTheme } from '@chakra-ui/react';
import { CloseButton } from '@/components/GlobalAudio/components/CloseButton/CloseButton';
import { LikeButton } from '@/components/GlobalAudio/components/LikeButton/LikeButton';
import { PlayerButtons } from '@/components/GlobalAudio/components/PlayerButtons/PlayerButtons';
import { SongCover } from '@/components/GlobalAudio/components/SongCover/SongCover';
import { SongDetails } from '@/components/GlobalAudio/components/SongDetails/SongDetails';
import { ProgressBar } from '@components/GlobalAudio/components/ProgressBar/ProgressBar';
import { VolumeControl } from '@/components/GlobalAudio/components/VolumeControl/VolumeControl';
import * as styles from '@/components/GlobalAudio/screens/styles';
import { useAudio } from '@/hooks/useAudio/useAudio';
import { Howl } from 'howler';
import { useAudioController } from '@/hooks/useAudio/models/AudioContext';

/**
 * @function GlobalAudio A higher-order component that wraps its child components with a global audio player.
 * @param {React.ReactNode} children - The child components to be wrapped by the global audio player.
 * @returns {JSX.Element} The wrapped child components.
 */

const MotionBox = motion.div;

export const GlobalAudio = ({ children }: { children: React.ReactNode }) => {
  useAudio(); // initialize the audio player
  const { state } = useAudioController();
  const dispatch = useDispatch<Dispatch>();
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const song = useSelector(store.select.audioModel.selectSong);
  const isOpen = useSelector(store.select.globalAudioModel.selectIsOpen);
  const isMuted = useSelector(store.select.globalAudioModel.selectIsMuted);
  const boxControls = useAnimation();
  const theme = useTheme();

  useEffect(() => {
    if (!song) boxControls.set({ opacity: 0, y: '100%' });
    else boxControls.start(styles.$getBoxControlsAnimation(isOpen, theme));
  }, [song, boxControls, MotionBox, isOpen]);

  return (
    <>
      {children}
      <Box {...styles.$globalAudioContainerStyles}>
        <MotionBox animate={boxControls} transition={styles.$getMotionBoxTransition()}>
          <CloseButton handleClose={() => dispatch.globalAudioModel.setIsOpen(false)} />
          <SimpleGrid {...styles.$globalAudioSimpleGridStyles}>
            <GridItem as={Flex} alignItems={'center'} m={1.5} colSpan={1}>
              <SongCover />
            </GridItem>
            <GridItem as={Flex} alignItems={'center'} colSpan={2}>
              <SongDetails />
            </GridItem>
            <GridItem as={Flex} alignItems={'center'} colSpan={1}>
              <PlayerButtons />
            </GridItem>
            <GridItem ml={{ base: 4, lg: 2 }} gap={1} as={Flex} alignItems={'center'} colSpan={2}>
              <LikeButton />
              <VolumeControl
                handleMute={() => {
                  dispatch.globalAudioModel.setIsMuted(!isMuted);
                  state?.howlerInstance?.mute(!isMuted);
                  if (!isMuted) dispatch.globalAudioModel.setVolume(0);
                  else dispatch.globalAudioModel.setVolume(1);
                }}
                handleVolume={(e: number) => {
                  dispatch.globalAudioModel.setVolume(e);
                  state?.howlerInstance?.volume(e);
                }}
              />
            </GridItem>
          </SimpleGrid>
          <Flex width={{ base: '92vw', lg: 'unset' }} display={{ base: 'flex', lg: 'none' }} p={2} gap={2} alignItems="center">
            <SongCover />
            <SongDetails />
            <Flex px={4} gap={3} alignItems={'center'}>
              <PlayerButtons />
              <LikeButton />
            </Flex>
          </Flex>
          <Flex minW="100%">
            <ProgressBar />
          </Flex>
        </MotionBox>
      </Box>
      <Box display={'none'} ref={waveformRef} />
    </>
  );
};

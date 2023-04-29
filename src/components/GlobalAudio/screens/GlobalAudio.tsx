import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';

import { Box, Button, Flex, GridItem, SimpleGrid, useTheme } from '@chakra-ui/react';
import { CloseButton } from '@/components/GlobalAudio/components/CloseButton/CloseButton';
import { LikeButton } from '@/components/GlobalAudio/components/LikeButton/LikeButton';
import { PlayerButtons } from '@/components/GlobalAudio/components/PlayerButtons/PlayerButtons';
import { SongCover } from '@/components/GlobalAudio/components/SongCover/SongCover';
import { SongDetails } from '@/components/GlobalAudio/components/SongDetails/SongDetails';
import { useGlobalAudio } from '@/components/GlobalAudio/components/useGlobalAudio/useGlobalAudio';
import { VolumeControl } from '@/components/GlobalAudio/components/VolumeControl/VolumeControl';
import { currentSong as song } from '@/tests/mocks/data/currentSong';
import * as styles from '@/components/GlobalAudio/screens/styles';

/**
 * @function GlobalAudio A higher-order component that wraps its child components with a global audio player.
 * @param {React.ReactNode} children - The child components to be wrapped by the global audio player.
 * @returns {JSX.Element} The wrapped child components.
 */
export const GlobalAudio = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<Dispatch>();
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const { handlePlayPause, handleVolume, handleMute, handleClose, isOpen } = useGlobalAudio(waveformRef);
  const currentSong = useSelector(store.select.globalAudioModel.selectCurrentSong);
  const MotionBox = motion.div;
  const boxControls = useAnimation();
  const theme = useTheme();

  useEffect(() => {
    boxControls.start(styles.$getBoxControlsAnimation(isOpen, theme));
  }, [isOpen, currentSong, boxControls, MotionBox]);

  return (
    <>
      <Button {...styles.$globalAudioTestButtonStyles} onClick={() => dispatch.globalAudioModel.setCurrentSong(song)}>
        test
      </Button>
      {children}
      <Box {...styles.$globalAudioContainerStyles}>
        <MotionBox animate={boxControls} transition={styles.$getMotionBoxTransition()}>
          <CloseButton handleClose={handleClose} />
          <SimpleGrid {...styles.$globalAudioSimpleGridStyles}>
            <GridItem as={Flex} alignItems={'center'} m={1.5} colSpan={2}>
              <SongCover />
            </GridItem>
            <GridItem as={Flex} alignItems={'center'} colSpan={4}>
              <SongDetails />
            </GridItem>
            <GridItem as={Flex} alignItems={'center'} colSpan={2}>
              <PlayerButtons handlePlayPause={handlePlayPause} />
            </GridItem>
            <GridItem ml={3} gap={1} as={Flex} alignItems={'center'} colSpan={3}>
              <LikeButton />
              <VolumeControl handleMute={handleMute} handleVolume={handleVolume} />
            </GridItem>
          </SimpleGrid>
        </MotionBox>
      </Box>
      <Box display={'none'} ref={waveformRef} />
    </>
  );
};

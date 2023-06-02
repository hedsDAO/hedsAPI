import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Box, Flex, GridItem, SimpleGrid, useTheme } from '@chakra-ui/react';
import { CloseButton } from '@/components/GlobalAudio/components/CloseButton/CloseButton';
import { LikeButton } from '@/components/GlobalAudio/components/LikeButton/LikeButton';
import { PlayerButtons } from '@/components/GlobalAudio/components/PlayerButtons/PlayerButtons';
import { SongCover } from '@/components/GlobalAudio/components/SongCover/SongCover';
import { SongDetails } from '@/components/GlobalAudio/components/SongDetails/SongDetails';
import { ProgressBar } from '@components/GlobalAudio/components/ProgressBar/ProgressBar';
import { VolumeControl } from '@/components/GlobalAudio/components/VolumeControl/VolumeControl';
import * as styles from '@/components/GlobalAudio/screens/styles';
import { useAudio } from '@/hooks/useAudio/useAudio';
import { MinimizeButton } from '../components/MinimizeButton/MinimizeButton';

/**
 * @function GlobalAudio A higher-order component that wraps its child components with a global audio player.
 * @param {React.ReactNode} children - The child components to be wrapped by the global audio player.
 * @returns {JSX.Element} The wrapped child components.
 */

const MotionBox = motion.div;

export const GlobalAudio = ({ children }: { children: React.ReactNode }) => {
  const { handleMute, handleVolume, handleClose } = useAudio(); // initialize the audio player
  const dispatch = useDispatch<Dispatch>();
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const song = useSelector(store.select.audioModel.selectSong);
  const isOpen = useSelector(store.select.globalAudioModel.selectIsOpen);
  const isMinimized = useSelector(store.select.globalAudioModel.selectIsMinimized);
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
          {!isMinimized && (
            <Flex {...styles.$minimizeFlexStyles}>
              <MinimizeButton handleMinimize={() => dispatch.globalAudioModel.setIsMinimized(!isMinimized)} />
              <CloseButton handleClose={handleClose} />
            </Flex>
          )}
          <SimpleGrid {...styles.$globalAudioSimpleGridStyles(isMinimized)}>
            <GridItem {...styles.$songCoverGridItemStyles}>
              <SongCover />
            </GridItem>
            {!isMinimized && (
              <>
                <GridItem {...styles.$songDetailsGridItemStyles}>
                  <SongDetails />
                </GridItem>
                <GridItem {...styles.$playerButtonsGridItemStyles}>
                  <PlayerButtons />
                </GridItem>
                <GridItem {...styles.$likeButtonGridItemStyles}>
                  <LikeButton />
                  <VolumeControl handleMute={handleMute} handleVolume={handleVolume} />
                </GridItem>
              </>
            )}
          </SimpleGrid>
          <Flex {...styles.$bottomFlexStyles(isMinimized)}>
            <SongCover />
            {!isMinimized && (
              <>
                <SongDetails />
                <Flex {...styles.$mobileDetailsFlexStyles}>
                  <PlayerButtons />
                  <LikeButton />
                </Flex>
              </>
            )}
          </Flex>
          <Flex {...styles.$progressBarFlexStyles}>
            <ProgressBar />
          </Flex>
        </MotionBox>
      </Box>
      <Box ref={waveformRef} {...styles.$waveformBoxStyles} />
    </>
  );
};

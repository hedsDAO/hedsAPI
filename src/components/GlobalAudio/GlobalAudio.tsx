import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion, useAnimation } from 'framer-motion';
import { store } from '@/store';

import { Box, Flex, GridItem, SimpleGrid, useTheme } from '@chakra-ui/react';
import { CloseButton } from '@/components/GlobalAudio/components/CloseButton/CloseButton';
import { PlayerButtons } from '@/components/GlobalAudio/components/PlayerButtons/PlayerButtons';
import { SongCover } from '@/components/GlobalAudio/components/SongCover/SongCover';
import { SongDetails } from '@/components/GlobalAudio/components/SongDetails/SongDetails';
import { VolumeControl } from '@/components/GlobalAudio/components/VolumeControl/VolumeControl';
import { LikeButton } from '@/components/GlobalAudio/components/LikeButton/LikeButton';
import { useGlobalAudio } from '@/components/GlobalAudio/components/useGlobalAudio/useGlobalAudio';

/**
 * @function GlobalAudio A higher-order component that wraps its child components with a global audio player.
 * @param {React.ReactNode} children - The child components to be wrapped by the global audio player.
 * @returns {JSX.Element} The wrapped child components.
 */

export const GlobalAudio = ({ children }: { children: React.ReactNode }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const { handlePlayPause, handleVolume, handleMute, handleClose, isOpen } = useGlobalAudio(waveformRef);
  const currentSong = useSelector(store.select.globalAudioModel.selectCurrentSong);
  const MotionBox = motion.div;
  const boxControls = useAnimation();
  const theme = useTheme();

  useEffect(() => {
    boxControls.start({
      y: isOpen ? '-10%' : '100%',
      opacity: isOpen ? 1 : 0,
      background: theme.colors.heds.bg4,
      borderRadius: '0.5rem',
    });
  }, [isOpen, currentSong, boxControls, MotionBox]);

  return (
    <>
      {children}
      <Box minH="100px" position="fixed" bottom={0} left={0} maxH="100px" zIndex={50} mx={4}>
        <MotionBox animate={boxControls} transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
          <CloseButton handleClose={handleClose} />
          <SimpleGrid gap={4} columns={11}>
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

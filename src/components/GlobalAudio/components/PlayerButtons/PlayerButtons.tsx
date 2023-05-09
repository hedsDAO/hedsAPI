import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Flex, Text } from '@chakra-ui/react';
import * as styles from '@/components/GlobalAudio/components/PlayerButtons/styles';
import { useAudio } from '@/hooks/useAudio/useAudio';

/**
 * @function PlayerButtons
 * @description A player buttons component that displays backward, play/pause, and forward buttons.
 * @returns {JSX.Element} - Rendered PlayerButtons component.
 */
export const PlayerButtons = () => {
  const isPlaying = useSelector(store.select.audioModel.selectIsPlaying);
  const song = useSelector(store.select.audioModel.selectSong);
  const { handlePlayPause, handlePrevious, handleUpNext } = useAudio();

  return (
    <Flex {...styles.$playerButtonsFlexStyles}>
      <Text {...styles.$backwardButtonStyles(() => handlePrevious())} />
      <Text {...styles.$playPauseButtonStyles(isPlaying, () => handlePlayPause(song))} />
      <Text {...styles.$forwardButtonStyles(() => handleUpNext())} />
    </Flex>
  );
};

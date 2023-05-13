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
      <Text data-testid="ga-backward-button" {...styles.$backwardButtonStyles(() => handlePrevious())} />
      <Text data-testid="ga-play-pause-button" {...styles.$playPauseButtonStyles(isPlaying, () => handlePlayPause(song))} />
      <Text data-testid="ga-forward-button" {...styles.$forwardButtonStyles(() => handleUpNext())} />
    </Flex>
  );
};

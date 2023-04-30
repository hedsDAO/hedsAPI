import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Flex, Text } from '@chakra-ui/react';
import * as styles from '@/components/GlobalAudio/components/PlayerButtons/styles';

/**
 * @function PlayerButtons
 * @param {Function} handlePlayPause - The function to be called when the play/pause button is clicked.
 * @description A player buttons component that displays backward, play/pause, and forward buttons.
 * @returns {JSX.Element} - Rendered PlayerButtons component.
 */
export const PlayerButtons = ({ handlePlayPause }: { handlePlayPause: () => void }) => {
  const isPlaying = useSelector(store.select.globalAudioModel.selectIsPlaying);
  return (
    <Flex {...styles.$playerButtonsFlexStyles}>
      <Text {...styles.$backwardButtonStyles()} />
      <Text {...styles.$playPauseButtonStyles(isPlaying, handlePlayPause)} />
      <Text {...styles.$forwardButtonStyles()} />
    </Flex>
  );
};

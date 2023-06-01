import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Button, Flex, Text } from '@chakra-ui/react';
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
  const isLoading = useSelector(store.select.audioModel.selectIsLoading);

  return (
    <Flex {...styles.$playerButtonsFlexStyles}>
      <Button isDisabled={isLoading} minW='unset' minH='unset' bg="transparent" _hover={{ bg: 'transparent' }} p="0 !important">
        <Text data-testid="ga-backward-button" {...styles.$backwardButtonStyles(() => handlePrevious())} />
      </Button>
      <Button isLoading={isLoading} minW='unset' minH='unset' bg="transparent" _hover={{ bg: 'transparent' }} p="0 !important">
        <Text data-testid="ga-play-pause-button" {...styles.$playPauseButtonStyles(isPlaying, () => handlePlayPause(song))} />
      </Button>
      <Button isDisabled={isLoading} minW='unset' minH='unset' bg="transparent" _hover={{ bg: 'transparent' }} p="0 !important">
        <Text data-testid="ga-forward-button" {...styles.$forwardButtonStyles(() => handleUpNext())} />
      </Button>
    </Flex>
  );
};

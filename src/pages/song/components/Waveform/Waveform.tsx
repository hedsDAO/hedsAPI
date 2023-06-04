import { useAudio } from '@/hooks/useAudio/useAudio';
import { useWaveform } from '@/hooks/useWaveform/useWaveform';
import { store } from '@/store';
import { formatDuration } from '@/utils';
import { Box } from '@chakra-ui/react';
import * as styles from '@pages/song/components/Waveform/styles';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

/**
 * @function Waveform
 * @description Renders the waveform for the current song.
 * @returns {JSX.Element} - Rendered component.
 **/

export const Waveform = () => {
  const song = useSelector(store.select.songModel.selectSong);
  const waveformRef = useRef<HTMLDivElement>(null);
  const { getDuration, getProgress, isOnOwnSongPage } = useAudio();
  useWaveform({ waveformRef, song });

  return (
    <Box data-testid="song-waveform-box" {...styles.$waveformBoxStyles}>
      {getProgress() > 0 && isOnOwnSongPage ? (
        <Box zIndex={10} px={1} fontSize="xs" left={2} top={14} bg="black" color="white" position={'absolute'}>
          {getProgress() > 0 ? formatDuration(getProgress()) : '0:00'}
        </Box>
      ) : (
        <></>
      )}
      <Box ref={waveformRef} data-testid="song-waveform" {...styles.$waveformStyles} />
      {getProgress() > 0 && isOnOwnSongPage ? (
        <Box zIndex={10} px={1} fontSize="xs" right={2} top={14} bg="black" color="white" position={'absolute'}>
          {formatDuration(getDuration())}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

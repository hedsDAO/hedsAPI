import { useWaveform } from '@/hooks/useWaveform/useWaveform';
import { store } from '@/store';
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
  useWaveform({ waveformRef, song });
  return (
    <Box data-testid="song-waveform-box" {...styles.$waveformBoxStyles}>
      <Box ref={waveformRef} data-testid="song-waveform" {...styles.$waveformStyles} />
    </Box>
  );
};

import { Box } from '@chakra-ui/react';
import * as styles from '@pages/song/components/Waveform/styles';

/**
 * @function Waveform
 * @description Renders the waveform for the current song.
 * @returns {JSX.Element} - Rendered component.
 **/

export const Waveform = ({ waveformRef }: { waveformRef?: React.RefObject<HTMLDivElement> }) => {
  return (
    <Box {...styles.$waveformBoxStyles}>
      <Box {...styles.$waveformStyles(waveformRef)} />
    </Box>
  );
};

import { BoxProps } from '@chakra-ui/react';

interface ExtendedBoxProps extends BoxProps {
  ref?: React.RefObject<HTMLDivElement>;
  'data-testid'?: string;
}
export const $waveformBoxStyles: ExtendedBoxProps = {
  position: 'relative',
  zIndex: 3,
  mt: '-80px',
  h: '80px',
  overflowY: 'hidden',
  w: 'full',
  'data-testid': 'song-waveform-box',
};

export const $waveformStyles = (waveformRef: React.RefObject<HTMLDivElement>): ExtendedBoxProps => ({
  w: 'full',
  ref: waveformRef,
  'data-testid': 'song-waveform',
});

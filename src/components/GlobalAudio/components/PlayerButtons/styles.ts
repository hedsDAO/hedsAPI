import { FlexProps, TextProps } from '@chakra-ui/react';

/**
 * @constant {FlexProps} $playerButtonsFlexStyles
 * @description FlexProps objects for player buttons
 */
export const $playerButtonsFlexStyles: FlexProps = {
  gap: 3,
  alignItems: 'center',
};

interface ExtendedTextProps extends TextProps {
  'data-testid'?: string;
}

/**
 * @constant {ExtendedTextProps} $backwardButtonStyles
 * @description TextProps object that contains styles for the backward button in the PlayerButtons component.
 */
export const $backwardButtonStyles = (): ExtendedTextProps => ({
  role: 'button',
  pointerEvents: 'auto',
  color: 'white',
  as: 'i',
  className: 'fa-solid fa-backward',
});

/**
 * @constant {ExtendedTextProps} $playPauseButtonStyles
 * @description TextProps object that contains styles for the play/pause button in the PlayerButtons component.
 */
export const $playPauseButtonStyles = (isPlaying: boolean, onClick: () => void): ExtendedTextProps => ({
  onClick,
  role: 'button',
  pointerEvents: 'auto',
  color: 'white',
  fontSize: '2xl',
  w: '16px',
  as: 'i',
  className: isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play',
});

/**
 * @constant {ExtendedTextProps} $forwardButtonStyles
 * @description TextProps object that contains styles for the forward button in the PlayerButtons component.
 */
export const $forwardButtonStyles = (): ExtendedTextProps => ({
  role: 'button',
  pointerEvents: 'auto',
  color: 'white',
  as: 'i',
  className: 'fa-solid fa-forward',
});

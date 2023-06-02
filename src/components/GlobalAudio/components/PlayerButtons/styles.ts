import { FlexProps, TextProps } from '@chakra-ui/react';

/**
 * @constant {FlexProps} $playerButtonsFlexStyles
 * @description FlexProps objects for player buttons
 */
export const $playerButtonsFlexStyles: FlexProps = {
  gap: 3,
  alignItems: 'center',
};

/**
 * @constant {ExtendedTextProps} $backwardButtonStyles
 * @description TextProps object that contains styles for the backward button in the PlayerButtons component.
 */
export const $backwardButtonStyles = (onClick: () => void): TextProps => ({
  role: 'button',
  pointerEvents: 'auto',
  color: 'white',
  fontSize: {base: 'xs', lg: 'md'},
  as: 'i',
  onClick,
  className: 'fa-solid fa-backward',
});

/**
 * @constant {TextProps} $playPauseButtonStyles
 * @description TextProps object that contains styles for the play/pause button in the PlayerButtons component.
 */
export const $playPauseButtonStyles = (isPlaying: boolean, onClick: () => void): TextProps => ({
  onClick,
  role: 'button',
  pointerEvents: 'auto',
  color: 'white',
  fontSize: { base: 'lg', lg: '2xl' },
  w: '16px',
  as: 'i',
  className: isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play',
});

/**
 * @constant {TextProps} $forwardButtonStyles
 * @description TextProps object that contains styles for the forward button in the PlayerButtons component.
 */
export const $forwardButtonStyles = (onClick: () => void): TextProps => ({
  role: 'button',
  pointerEvents: 'auto',
  color: 'white',
  fontSize: {base: 'xs', lg: 'md'},
  as: 'i',
  onClick,
  className: 'fa-solid fa-forward',
});

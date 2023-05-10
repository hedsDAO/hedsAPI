import { TextProps } from '@chakra-ui/react';

interface ExtendedTextProps extends TextProps {
  'data-testid': string;
}

/**
 * @constant {ExtendedTextProps} $closeButtonStyles
 * @description TextProps object that contains styles for the CloseButton component.
 */

export const $closeButtonStyles = (onClick: () => void): ExtendedTextProps => ({
  'data-testid': 'ga-close-button',
  onClick,
  pointerEvents: 'auto',
  role: 'button',
  fontSize: 'sm',
  right: 0,
  m: 2,
  className: 'fas fa-xmark',
  position: 'absolute',
  color: 'white',
  opacity: '75%',
});

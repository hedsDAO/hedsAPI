import { TextProps } from '@chakra-ui/react';

/**
 * @constant {TextProps} $closeButtonStyles
 * @description TextProps object that contains styles for the CloseButton component.
 */

export const $closeButtonStyles: TextProps ={
  pointerEvents: 'auto',
  role: 'button',
  fontSize: 'sm',
  right: 2,
  top: 1.5,
  className: 'fas fa-xmark',
  position: 'absolute',
  color: 'white',
  opacity: '75%',
};

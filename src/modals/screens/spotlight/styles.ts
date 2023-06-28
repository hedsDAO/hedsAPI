import { ModalContentProps, ModalProps, TextProps } from '@chakra-ui/react';

export const $spotlightModalStyles: Partial<ModalProps> ={
  size: 'lg',
  motionPreset: 'slideInBottom',
  isCentered: true,
};

export const $spotlightModalContentStyles: ModalContentProps = {
  minH: '10vh',
  m: 1.5,
};

export const $spotlightHeaderTextStyles: TextProps = {
  color: 'white',
  fontSize: 'sm',
  fontFamily: 'inter',
  letterSpacing: 'widest',
};

export const $spotlightCloseButtonStyles = {
  color: 'white',
};

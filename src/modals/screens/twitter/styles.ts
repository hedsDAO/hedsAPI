import { ModalProps, ModalContentProps, ModalHeaderProps, ModalCloseButtonProps } from '@chakra-ui/react';

export const $twitterModalStyles: Partial<ModalProps> = {
  size: 'lg',
  motionPreset: 'slideInBottom',
  isCentered: true,
};

export const $twitterModalContentStyles: ModalContentProps = {
  rounded: 'xl',
  m: 2,
};

export const $twitterModalHeaderStyles: ModalHeaderProps = {
  fontWeight: 'bold',
  color: 'heds.200',
  fontSize: 'md',
  letterSpacing: 'widest',
};

export const $twitterModalCloseButtonStyles: ModalCloseButtonProps = {
  _focus: { boxShadow: 'none' },
  color: 'white',
};

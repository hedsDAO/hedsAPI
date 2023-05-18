import { ButtonProps, FlexProps } from '@chakra-ui/react';

export const $coverflowNavFlexStyles: FlexProps = {
  gap: 2,
  justifyContent: 'center',
  w: 'full',
};

export const buttonStyles = (isActive: boolean): ButtonProps => ({
  opacity: isActive ? 0.75 : 0.5,
  fontSize: 'xs',
  color: isActive ? 'white' : 'heds.bg2',
  p: '0 !important',
  minW: 'unset',
  h: 'unset',
  bg: 'transparent',
  _hover: {
    bg: 'transparent',
    opacity: 1,
    color: isActive ? 'white' : 'heds.bg5',
  },
});

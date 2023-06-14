import { BoxProps, FlexProps } from '@chakra-ui/react';

export const $iconButtonsBoxStyles: BoxProps = {
  w: { base: 'full', lg: 'unset' },
  position: 'absolute',
  bottom: '20',
  right: { base: 'unset', lg: '20' },
  p: 5,
};

export const $iconButtonsFlexStyles: FlexProps = {
  direction: { base: 'row', lg: 'column' },
  w: { base: 'full', lg: 'unset' },
  justifyContent: { base: 'center', lg: 'unset' },
  color: 'white',
  fontSize: '3xl',
  align: 'center',
  gap: 10,
};

export const $iconButtonStyles: BoxProps = {
  pointerEvents: 'auto',
  color: 'black',
};

export const $promoIconButtonStyles: BoxProps = {
  pointerEvents: 'auto',
  color: 'heds.bg',
};

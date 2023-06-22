import { BoxProps, ButtonProps, FlexProps, SkeletonProps, StackProps, TextProps } from '@chakra-ui/react';

export const $stackStyles: StackProps = {
  alignItems: 'center',
  gap: 10,
};

export const $warningTextStyles: TextProps = {
  pt: 3,
  px: 10,
  textAlign: 'center',
  fontSize: 'xs',
  fontWeight: 'semibold',
  color: 'red.500',
  letterSpacing: 'widest',
};

export const $flexStyles: FlexProps = {
  w: '50%',
  gap: 4,
};

export const $skeletonStyles = (hasImageLoaded: boolean): SkeletonProps => ({
  startColor: 'heds.bg2',
  endColor: 'heds.400',
  fitContent: true,
  isLoaded: hasImageLoaded,
});

export const $centerStyles: BoxProps = {
  boxSize: '14',
};

export const $imageStyles: BoxProps = {
  boxSize: '14',
  opacity: '70%',
  rounded: 'sm',
  alignItems: 'center',
  justifyContent: 'center',
  bg: 'heds.bg2',
};

export const $stackJustifyCenter: StackProps = {
  justifyContent: 'center',
};

export const $displayNameTextStyles: TextProps = {
  mt: '0 !important',
  fontFamily: 'inter',
  letterSpacing: 'wide',
  color: 'white',
};

export const $displayNameSecondaryTextStyles: TextProps = {
  mt: '0 !important',
  fontFamily: 'inter',
  fontSize: 'xs',
  letterSpacing: 'wide',
  color: 'white',
  opacity: '75%',
};

export const $exitButtonStyles: ButtonProps = {
  w: 'full',
  colorScheme: 'whiteAlpha',
  size: 'sm',
  color: 'white',
};

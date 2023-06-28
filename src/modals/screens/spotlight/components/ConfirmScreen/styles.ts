import { AvatarProps, ButtonProps, FlexProps, SkeletonProps, StackProps, TextProps } from '@chakra-ui/react';

export const $confirmScreenStackStyles: StackProps = {
  gap: 2,
  pb: 3,
};

export const $confirmScreenFlexStyles: FlexProps = {
  gap: 4,
};

export const $confirmScreenSkeletonStyles = (hasImageLoaded: boolean): SkeletonProps => ({
  startColor: 'heds.bg2',
  endColor: 'heds.400',
  fitContent: true,
  isLoaded: hasImageLoaded,
});

export const $confirmScreenAvatarStyles = (onLoad: () => void): AvatarProps => ({
  borderRadius: 0,
  size: 'lg',
  onLoad,
  objectFit: 'contain',
});

export const $confirmScreenArtistStackStyles: StackProps = {
  gap: 0.5,
  justifyContent: 'center',
};

export const $confirmScreenTrackNameStyles: TextProps = {
  color: 'white',
  opacity: '80%',
  mt: '0 !important',
  fontSize: 'sm',
};

export const $confirmScreenTrackArtistsStyles: TextProps = {
  color: 'white',
  opacity: '50%',
  mt: '0 !important',
  fontSize: 'xs',
};

export const $confirmScreenButtonFlexStyles: FlexProps = {
  gap: 2,
};

export const $confirmScreenBackButtonStyles = (onClick: () => void): ButtonProps => ({
  onClick,
  color: 'white',
  width: '50%',
  rounded: 'sm',
  size: 'xs',
  bg: 'heds.bg2',
  _hover: { bg: 'heds.bg2', opacity: '80%' },
});

export const $confirmScreenConfirmButtonStyles = (onClick: () => void): ButtonProps => ({
  onClick,
  color: 'white',
  width: '50%',
  rounded: 'sm',
  size: 'xs',
  bg: 'heds.100',
  _hover: { bg: 'heds.100', opacity: '80%' },
});

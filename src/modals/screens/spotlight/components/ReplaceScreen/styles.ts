import { AvatarProps, ButtonProps, FlexProps, SkeletonProps, StackProps, TextProps } from '@chakra-ui/react';

export const $replaceScreenStackStyles: StackProps = {
  gap: 2,
  pb: 3,
};

export const $replaceScreenFlexStyles: FlexProps = {
  gap: 4,
};

export const $replaceScreenSkeletonStyles = (hasImageLoaded: boolean): SkeletonProps => ({
  startColor: 'heds.bg2',
  endColor: 'heds.400',
  fitContent: true,
  isLoaded: hasImageLoaded,
});

export const $replaceScreenAvatarStyles = (onLoad: () => void): AvatarProps => ({
  borderRadius: 0,
  size: 'lg',
  onLoad,
  objectFit: 'contain',
});

export const $replaceScreenArtistStackStyles: StackProps = {
  gap: 0.5,
  justifyContent: 'center',
};

export const $replaceScreenTrackNameStyles: TextProps = {
  color: 'white',
  opacity: '80%',
  mt: '0 !important',
  fontSize: 'sm',
};

export const $replaceScreenTrackArtistsStyles: TextProps = {
  color: 'white',
  opacity: '50%',
  mt: '0 !important',
  fontSize: '2xs',
};

export const $replaceScreenButtonFlexStyles: FlexProps = {
  mt: 2,
  gap: 2,
};

export const $replaceScreenBackButtonStyles = (onClick: () => void): ButtonProps => ({
  onClick,
  color: 'white',
  width: '50%',
  size: 'xs',
  bg: 'heds.bg2',
  _hover: { bg: 'heds.bg2', opacity: '70%' },
});

export const $replaceScreenReplaceButtonStyles = (onClick: () => void): ButtonProps => ({
  onClick,
  color: 'white',
  width: '50%',
  size: 'xs',
  bg: 'heds.200',
  _hover: { bg: 'heds.200', opacity: '70%' },
});
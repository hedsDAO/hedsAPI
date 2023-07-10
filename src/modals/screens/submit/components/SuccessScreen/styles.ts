import { BoxProps, ButtonProps, CenterProps, FlexProps, ImageProps, SkeletonProps, SliderProps, StackProps, TextProps } from '@chakra-ui/react';

export const $successStackStyles: StackProps = {
  gap: 2,
};

export const $successFlexStyles: FlexProps = {
  gap: 4,
};

export const $successSkeletonStyles = (hasSoundLoaded: boolean): SkeletonProps => ({
  startColor: 'heds.bg2',
  endColor: 'heds.400',
  fitContent: true,
  isLoaded: hasSoundLoaded,
});

export const $successCenterStyles: CenterProps = {
  boxSize: '14',
};

export const $successImageStyles = (src: string | undefined): ImageProps => ({
  boxSize: '14',
  src,
  opacity: '70%',
  rounded: 'sm',
  alignItems: 'center',
  justifyContent: 'center',
  bg: 'heds.bg2',
});

export const $pauseIconStyles: TextProps = {
  pos: 'absolute',
  role: 'button',
  as: 'i',
  className: 'fas fa-pause',
  color: 'white',
};

export const $playIconStyles: TextProps = {
  pos: 'absolute',
  role: 'button',
  as: 'i',
  className: 'fas fa-play',
  color: 'white',
};

export const $successDisplayNameStackStyles: StackProps = {
  justifyContent: 'center',
};

export const $successDisplayNameTextStyles: TextProps = {
  mt: '0 !important',
  fontFamily: 'inter',
  letterSpacing: 'wide',
  color: 'white',
};

export const $successSubIdTextStyles: TextProps = {
  fontSize: 'xs',
  mt: '0 !important',
  fontFamily: 'inter',
  letterSpacing: 'wide',
  color: 'whiteAlpha.600',
};

export const $successSliderStyles = (progress: number, max: number): SliderProps => ({
  value: progress,
  min: 0,
  max,
  step: 1,
});

export const $sliderTrackStyles: BoxProps = {
  bg: 'heds.bg2',
};

export const $sliderFilledTrackStyles: BoxProps = {
  bg: 'heds.200',
};

export const $sliderThumbStyles: BoxProps = {
  _focus: { boxShadow: 'none' },
  color: 'heds.500',
  boxSize: 2,
};

export const $successInfoFlexStyles: FlexProps = {
  py: 5,
};

export const $successInfoBoxStyles: BoxProps = {
  textAlign: 'center',
  fontSize: 'xs',
  fontWeight: 'bold',
  color: 'white',
};

export const $successWarningTextStyles: TextProps = {
  as: 'span',
  color: 'red.500',
};

export const $successButtonsFlexStyles: FlexProps = {
  gap: 2,
  w: 'full',
};

export const $successBackButtonStyles = (onClick: () => void): ButtonProps => ({
  onClick,
  colorScheme: 'whiteAlpha',
  size: 'sm',
  color: 'white',
  width: '100%',
});

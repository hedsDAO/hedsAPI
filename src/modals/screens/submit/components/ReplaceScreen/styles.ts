import { BoxProps, ButtonProps, CenterProps, FlexProps, ImageProps, SkeletonProps, SliderProps, StackProps, TextProps } from '@chakra-ui/react';

export const $replaceStackStyles: StackProps = {
  gap: 2,
};

export const $replaceFlexStyles: FlexProps = {
  gap: 4,
};

export const $replaceSkeletonStyles = (hasSoundLoaded: boolean): SkeletonProps => ({
  startColor: 'heds.bg2',
  endColor: 'heds.400',
  fitContent: true,
  isLoaded: hasSoundLoaded,
});

export const $replaceCenterStyles: CenterProps = {
  boxSize: '14',
};

export const $replaceImageStyles = (src: string | undefined): ImageProps => ({
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

export const $replaceDisplayNameStackStyles: StackProps = {
  justifyContent: 'center',
};

export const $replaceDisplayNameTextStyles: TextProps = {
  mt: '0 !important',
  fontFamily: 'inter',
  letterSpacing: 'wide',
  color: 'white',
};

export const $replaceSubIdTextStyles: TextProps = {
  fontSize: 'xs',
  mt: '0 !important',
  fontFamily: 'inter',
  letterSpacing: 'wide',
  color: 'whiteAlpha.600',
};

export const $replaceSliderStyles = (progress: number, max: number): SliderProps => ({
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

export const $replaceInfoFlexStyles: FlexProps = {
  py: 5,
};

export const $replaceInfoBoxStyles: BoxProps = {
  textAlign: 'center',
  fontSize: 'xs',
  fontWeight: 'bold',
  color: 'white',
};

export const $replaceWarningTextStyles: TextProps = {
  as: 'span',
  color: 'red.500',
};

export const $replaceButtonsFlexStyles: FlexProps = {
  gap: 2,
  w: 'full',
};

export const $replaceBackButtonStyles = (onClick: () => void): ButtonProps => ({
  onClick,
  colorScheme: 'whiteAlpha',
  size: 'sm',
  color: 'white',
  width: '50%',
});

export const $replaceSubmitButtonStyles = (onClick: () => void): ButtonProps => ({
  onClick,
  colorScheme: 'red',
  size: 'sm',
  color: 'white',
  width: '50%',
});

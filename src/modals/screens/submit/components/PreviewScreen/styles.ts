import { BoxProps, ButtonProps, FlexProps, SkeletonProps, SliderProps, StackProps, TextProps } from '@chakra-ui/react';

export const $previewStackStyles: StackProps = {
  gap: 2,
};

export const $previewFlexStyles: FlexProps = {
  gap: 4,
};

export const $previewSkeletonStyles = (hasSoundLoaded: boolean): SkeletonProps => ({
  startColor: 'heds.bg2',
  endColor: 'heds.400',
  fitContent: true,
  isLoaded: hasSoundLoaded,
});

export const $previewAudioFlexStyles: FlexProps = {
  rounded: 'sm',
  alignItems: 'center',
  justifyContent: 'center',
  bg: 'heds.bg2',
  boxSize: '14',
};

export const $pauseIconStyles: TextProps = {
  role: 'button',
  as: 'i',
  className: 'fas fa-pause',
  color: 'white',
};

export const $playIconStyles: TextProps = {
  role: 'button',
  as: 'i',
  className: 'fas fa-play',
  color: 'white',
};

export const $previewDisplayNameStackStyles: StackProps = {
  justifyContent: 'center',
};

export const $previewDisplayNameTextStyles: TextProps = {
  mt: '0 !important',
  fontFamily: 'inter',
  letterSpacing: 'wide',
  color: 'white',
};

export const $previewBoxStyles: BoxProps = {
  minH: '1ch',
  minW: '14ch',
  bg: 'whiteAlpha.600',
  opacity: '70%',
  rounded: 'lg',
};

export const $previewSliderStyles = (value: number, max: number): SliderProps => ({
  value,
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

export const $previewButtonStyles = (onClick: () => void): ButtonProps => ({
  onClick,
  colorScheme: 'whiteAlpha',
  size: 'sm',
  color: 'white',
  bg: 'heds.200',
  _hover: {
    bg: 'heds.200',
    opacity: '90%',
  }
});

import { BoxProps, DividerProps, SkeletonProps, StackProps, TextProps } from '@chakra-ui/react';

export const $navSkeletonStyles = (navbarTabs: string[], isLoading: boolean): SkeletonProps => ({
  isLoaded: !!navbarTabs?.length && !isLoading,
  startColor: 'heds.bg3',
  endColor: 'heds.bg1',
  w: '100vw',
});

export const $navBoxStyles: BoxProps = {
  maxW: { lg: '85vw' },
  mx: 'auto',
};

export const $dividerStyles: DividerProps = {
  mt: { lg: 2 },
  borderColor: 'heds.100',
};

export const $contentBoxStyles: BoxProps = {
  px: 6,
  maxW: { lg: '8xl' },
  mx: 'auto',
};

export const $artistStackStyles: StackProps = {
  direction: 'row',
  alignItems: 'center',
};

export const $artistNameTextStyles: TextProps = {
  color: 'white.pure',
  fontSize: 'sm',
};

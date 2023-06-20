import { SlideFadeProps, SpinnerProps, StackProps, TextProps } from '@chakra-ui/react';

export const $loadingStackStyles: StackProps = {
  alignItems: 'center',
  justifyContent: 'center',
  w: 'full',
  height: 'full',
  py: 3,
};

export const $spinnerStyles: SpinnerProps = {
  size: 'sm',
};

export const $slideFadeStyles = (isLoading: boolean): SlideFadeProps => ({
  transition: {
    enter: { delay: 0.5, duration: 0.65 },
    exit: { duration: 0.3 },
  },
  in: isLoading,
});

export const $loadingTextStyles: TextProps = {
  color: 'white',
  opacity: '70%',
  fontFamily: 'space',
  fontSize: '2xs',
  mt: 4,
};

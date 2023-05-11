import { StackProps, FlexProps, InputProps, IconButtonProps, ButtonProps, TextProps, BoxProps } from '@chakra-ui/react';

export const $verifyTweetStackStyles: StackProps = {
  mb: 5,
};

export const $verifyTweetHeadingStyles: TextProps = {
  ml: 0.5,
  fontFamily: 'inter',
  color: 'white',
  fontSize: 'xs',
  fontWeight: 'bold',
  mt: '0 !important',
  letterSpacing: 'wide',
};

export const $verifyTweetDescriptionEmphasis = (isEmphasized: boolean) => ({
  fontWeight: isEmphasized ? 'bold' : '',
  marginRight: '2px',
  opacity: isEmphasized ? '90%' : '60%',
});

export const $verifyDescriptionFlexContainer: FlexProps = {
  pb: 2,
  mt: '0 !important',
  alignItems: 'baseline',
};

export const $verifySubHeadingFlexContainer: FlexProps = {
  pt: 2,
  gap: 2,
};

export const $verifyTweetDescriptionStyles: TextProps = {
  ml: 0.5,
  fontFamily: 'inter',
  color: 'white',
  fontSize: '2xs',
  mt: '0 !important',
};

export const $verifyTweetExampleBoxStyles: BoxProps = {
  px: 1,
  rounded: 'md',
  w: 'fit-content',
  bg: 'heds.bg8',
};

export const $verifyTweetExampleTextStyles: TextProps = {
  p: 0.5,
  color: 'white',
  opacity: '90%',
  fontSize: '2xs',
};

export const $verifyTweetInputStyles = (error: string | undefined): InputProps => ({
  borderColor: error ? 'red.500' : 'heds.bg5',
  color: 'gray.200',
  bg: 'heds.bg2',
  rounded: 'md',
  size: 'sm',
});

export const $verifyTweetIconButtonStyles: IconButtonProps = {
  'aria-label': 'twitter',
  bg: 'twitter.700',
  color: 'white',
  letterSpacing: 'widest',
  fontFamily: 'inter',
  fontSize: 'xs',
  _hover: { bg: 'twitter.800' },
  px: 4,
  size: 'sm',
  className: 'fab fa-twitter',
};

export const $verifyTweetButtonStyles: ButtonProps = {
  bg: 'heds.700',
  color: 'white',
  letterSpacing: 'widest',
  fontFamily: 'inter',
  fontSize: '2xs',
  px: 5,
  size: 'sm',
};

export const $verifyTweetErrorTextStyles: TextProps = {
  mb: '-1 !important',
  fontFamily: 'inter',
  color: 'red.500',
  fontSize: '2xs',
};

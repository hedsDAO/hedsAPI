import { StackProps, FlexProps, InputProps, ButtonProps, TextProps } from '@chakra-ui/react';

export const $generateAndCopyTweetStackStyles: StackProps = {
  mb: 5,
};

export const $generateTweetHeadingStyles: TextProps = {
  fontFamily: 'inter',
  color: 'white',
  fontSize: 'sm',
  fontWeight: 'bold',
  mt: '0 !important',
  letterSpacing: 'wide',
};

export const $generateTweetDescriptionStyles: TextProps = {
  fontFamily: 'inter',
  color: 'white',
  fontSize: 'xs',
  opacity: '60%',
  mt: '0 !important',
};

export const $generateAndCopyTweetFlexStyles: FlexProps = {
  pt: 2,
  gap: 2,
};

export const $inputStyles = (tweet: string | undefined): InputProps => ({
  borderColor: tweet ? 'heds.bg5' : 'heds.bg8',
  color: tweet ? 'whiteAlpha.400' : 'transparent',
  value: tweet || '',
  bg: tweet ? 'heds.bg2' : 'heds.bg3',
  isDisabled: !tweet,
  rounded: 'md',
  size: 'sm',
});

export const $copyTweetButtonStyles: ButtonProps = {
  letterSpacing: 'widest',
  fontFamily: 'inter',
  textColor: 'white',
  fontSize: '2xs',
  size: 'sm',
  px: 7,
};

export const $generateTweetButtonStyles: ButtonProps = {
  letterSpacing: 'widest',
  fontFamily: 'inter',
  bg: 'heds.700',
  _hover: { bg: 'heds.bg7', textColor: 'white' },
  textColor: 'white',
  fontSize: '2xs',
  size: 'sm',
  px: 7,
};

export const $nextButtonStyles: ButtonProps = {
  pointerEvents: 'auto',
  bg: 'heds.700',
  color: 'white',
  letterSpacing: 'widest',
  fontFamily: 'inter',
  fontSize: '2xs',
  px: 5,
  size: 'sm',
};

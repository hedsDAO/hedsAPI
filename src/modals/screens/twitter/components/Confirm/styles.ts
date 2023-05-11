import { StackProps, FlexProps, TextProps, ButtonProps } from '@chakra-ui/react';

export const $confirmStackStyles: StackProps = {
  mb: 5,
  gap: 3,
};

export const $flexStyles: FlexProps = {
  gap: 2,
  alignItems: 'center',
};

export const $displayNameStyles: TextProps = {
  color: 'white',
  opacity: '70%',
  fontSize: 'sm',
};

export const $linkIconStyles: TextProps = {
  ml: 1,
  color: 'heds.700',
  as: 'i',
  className: 'fas fa-link',
};

export const $twitterHandleStyles: TextProps = {
  color: 'white',
  opacity: '70%',
  fontSize: 'sm',
};

export const $headingTextStyles: TextProps = {
  ml: 0.5,
  color: 'red.500',
  fontFamily: 'inter',
  fontSize: 'xs',
  fontWeight: 'bold',
  mt: '0 !important',
  letterSpacing: 'wide',
};

export const $descriptionTextStyles: TextProps = {
  ml: 0.5,
  fontFamily: 'inter',
  color: 'white',
  fontSize: '2xs',
  opacity: '60%',
  mt: '0 !important',
};

export const $confirmButtonStyles: ButtonProps = {
  pointerEvents: 'auto',
  bg: 'heds.700',
  color: 'white',
  letterSpacing: 'widest',
  fontFamily: 'inter',
  fontSize: '2xs',
  px: 5,
  size: 'sm',
  _hover: { opacity: '80%' },
};

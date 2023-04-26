import { ButtonProps, FlexProps, BoxProps, TextProps } from '@chakra-ui/react';

export const $buttonStyles: ButtonProps = {
  width: '100%',
  variant: 'ghost',
  border: '1px solid',
  borderColor: '#9293FF',
  borderRadius: 'md',
  _hover: { bg: 'none' },
  // borderColor: 'transparent',
  // backgroundClip: 'padding-box, border-box',
  // backgroundImage: 'linear-gradient(to right, #9293FF, #DC89FF)',
};

export const $flexStyles: FlexProps = {
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const $questionStyles: TextProps = {
  color: 'white',
};

export const $answerStyles: TextProps = {
  color: 'white',
  m: 4,
};

export const $boxStyles: BoxProps = {
  bg: '#201C27',
  mt: 4,
  p: 2,
  borderRadius: 'md',
};

import { CenterProps, TextProps, ButtonProps } from '@chakra-ui/react';

export const $centerStyles: CenterProps = {
  h: '100vh',
  w: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export const $numberStyles: TextProps = {
  fontSize: '8rem',
  textAlign: 'center',
  color: 'white',
  fontWeight: 'thin',
};

export const $textStyles: TextProps = {
  fontSize: '2rem',
  textAlign: 'center',
  color: 'white',
};

export const $buttonStyles: ButtonProps = {
  bgColor: '#745CBA',
  color: 'white',
  fontWeight: 'light',
};

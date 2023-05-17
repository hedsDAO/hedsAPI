import { StackProps, TextProps } from '@chakra-ui/react';

export const $exploreHeaderStackStyles: StackProps = {
  pb: 2,
  pt: 10,
  alignItems: 'center',
  justifyContent: 'center',
  w: 'full',
};

export const $exploreHeaderTextStyles: TextProps = {
  color: 'white',
  fontSize: { base: 'xl', lg: '4xl' },
  fontFamily: 'poppins',
  fontWeight: 'normal',
};

export const $exploreHeaderDescriptionTextStyles: TextProps = {
  letterSpacing: 'wide',
  fontWeight: 'thin',
  color: 'white',
  opacity: '75%',
  fontSize: { base: '2xs', lg: 'md' },
};
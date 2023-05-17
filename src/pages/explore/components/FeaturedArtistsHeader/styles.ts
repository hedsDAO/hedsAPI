import { StackProps, TextProps } from '@chakra-ui/react';

export const $featuredArtistStackStyles: StackProps = {
  p: { base: 5, lg: 0 },
  maxW: { lg: '6xl' },
  mx: 'auto',
  justifyContent: 'center',
  alignItems: { base: 'center', lg: 'start' },
  textAlign: { base: 'center', lg: 'start' },
  mt: { base: 10, lg: 20 },
  mb: { base: 2, lg: 10 },
};

export const $featuredArtistsHeaderTextStyles: TextProps = {
  color: 'white',
  fontSize: { base: 'lg', lg: '2xl' },
  fontFamily: 'poppins',
  fontWeight: 'normal',
};

export const $featuredArtistsDescriptionTextStyles: TextProps = {
  letterSpacing: 'wide',
  fontWeight: 'thin',
  color: 'white',
  opacity: '75%',
  fontSize: { base: '2xs', lg: 'md' },
};

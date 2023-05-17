import { StackProps, TextProps } from '@chakra-ui/react';

export const $featuredArtistStackStyles: StackProps = {
  p: { base: 5, lg: 20 },
  justifyContent: 'center',
  alignItems: { base: 'center', lg: 'start' },
  textAlign: { base: 'center', lg: 'start' },
  mt: { base: 10, lg: 20 },
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

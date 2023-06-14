import { BoxProps, FlexProps, StackProps, TextProps } from '@chakra-ui/react';

export const $detailsBoxStyles: BoxProps = {
  position: 'absolute',
  top: { base: '20', lg: 'unset' },
  bottom: { base: 'unset', lg: '20' },
  left: { base: '10', lg: '20' },
  p: 5,
  bg: 'heds.bg',
};

export const $detailsFlexStyles: FlexProps = {
  gap: 5,
};

export const $detailsVerticalLineBoxStyles: BoxProps = {
  opacity: '80%',
  bg: 'white',
  width: '12px',
  minH: 'full',
};

export const $detailsVStackStyles: StackProps = {
  justify: 'end',
  align: 'start',
};

export const $detailsPresentsTextStyles: TextProps = {
  mt: { lg: '2 !important' },
  fontFamily: '"Space Mono", monospace',
  fontStyle: 'italic',
  fontSize: { base: '2xs', lg: 'sm' },
  color: 'white',
};

export const $detailsArtistNameTextStyles: TextProps = {
  mt: { base: '2 !important', lg: '4 !important' },
  mb: { base: '-2 !important', lg: '-6 !important' },
  fontFamily: '"Space Mono", monospace',
  fontSize: { base: 'md', lg: '4xl' },
  color: 'white',
};

export const $detailsTapeNameTextStyles: TextProps = {
  mb: { lg: '-4 !important' },
  fontWeight: 'extrabold',
  fontFamily: '"Space Mono", monospace',
  fontSize: { base: '3xl', lg: '6xl' },
  color: 'white',
};
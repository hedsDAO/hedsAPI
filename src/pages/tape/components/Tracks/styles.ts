import { BoxProps, FlexProps, ImageProps, TextProps } from '@chakra-ui/react';

/**
 * @constant {FlexProps} $tracksFlexStyles
 * @description FlexProps object contains styles for the Tracks component container.
 */
export const $tracksFlexStyles: FlexProps = {
  gap: 3,
  flexWrap: 'wrap',
  mx: { base: 2, lg: 8 },
  px: ['20px', '60px', '100px', '120px'],
  pt: 8,
};

/**
 * @constant {BoxProps} $trackBoxStyles
 * @description BoxProps object contains styles for each track box.
 */
export const $trackBoxStyles: BoxProps = {
  border: '1px',
  borderColor: 'button.primary',
  bgColor: 'button.dark',
  borderRadius: 'md',
  p: 2,
  w: { base: '100%', sm: '100%', md: '32%', lg: '19%' },
  _hover: { cursor: 'pointer', bgColor: 'black.lightGray' },
};

/**
 * @constant {ImageProps} $trackImageStyles
 * @description ImageProps object contains styles for the track image.
 */
export const $trackImageStyles: ImageProps = {
  boxSize: '4rem',
  border: '1px',
  borderColor: 'heds.400',
};

/**
 * @constant {TextProps} $trackNameTextStyles
 * @description TextProps object contains styles for the track name text.
 */
export const $trackNameTextStyles: TextProps = {
  color: 'white.pure',
  fontSize: 'xs',
  fontWeight: 500,
  letterSpacing: 'wider',
};

/**
 * @constant {TextProps} $artistNameTextStyles
 * @description TextProps object contains styles for the artist name text.
 */
export const $artistNameTextStyles: TextProps = {
  color: 'white.pure',
  fontSize: 'xs',
  fontWeight: 200,
  letterSpacing: 'wider',
};

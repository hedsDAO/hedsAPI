import { BoxProps, StackProps, StyleProps, TextProps } from '@chakra-ui/react';

/**
 * @constant {StackProps} $songDetailsStackStyles
 * @description StackProps object that contains styles for the SongDetails component container.
 */
export const $songDetailsStackStyles: StackProps = {
  minW: { base: 'fit-content', lg: 'unset' },
  px: { base: 2, lg: 0 },
};

/**
 * @constant {TextProps} $songNameTextStyles
 * @description TextProps object that contains styles for the song name text in the SongDetails component.
 */
export const $songNameTextStyles: TextProps = {
  fontSize: { base: '2xs', lg: 'xs' },
  letterSpacing: 'widest',
  fontFamily: 'inter',
  fontWeight: 'medium',
  color: 'white',
  isTruncated: true,
  textOverflow: 'ellipsis',
  maxW: '25ch',
  mt: '0 !important',
};

/**
 * @constant {TextProps} $songArtistsTextStyles
 * @description TextProps object that contains styles for the song artists text in the SongDetails component.
 */
export const $songArtistsTextStyles: TextProps = {
  fontSize: { base: '2xs', lg: 'xs' },
  fontFamily: 'inter',
  fontWeight: 'hairline',
  color: 'white',
  opacity: '60%',
  mt: '0 !important',
};

export const $privateLabelStyles: BoxProps = {
  width: '60px',
  h: { base: '9px', lg: '11px' },
  bg: { base: 'heds.bg5', lg: 'heds.bg3' },
};

export const $privateTooltipStyles: StyleProps = {
  fontSize: 'xs',
  zIndex: 20,
};

import { StackProps, TextProps } from '@chakra-ui/react';

/**
 * @constant {StackProps} $songDetailsStackStyles
 * @description StackProps object that contains styles for the SongDetails component container.
 */
export const $songDetailsStackStyles: StackProps = {};

/**
 * @constant {TextProps} $songNameTextStyles
 * @description TextProps object that contains styles for the song name text in the SongDetails component.
 */
export const $songNameTextStyles: TextProps = {
  fontSize: { base: '2xs', lg: 'sm' },
  letterSpacing: 'widest',
  fontFamily: 'inter',
  fontWeight: 'medium',
  color: 'white',
  mt: '0 !important',
};

/**
 * @constant {TextProps} $songArtistsTextStyles
 * @description TextProps object that contains styles for the song artists text in the SongDetails component.
 */
export const $songArtistsTextStyles: TextProps = {
  fontSize: { base: '2xs', lg: 'sm' },
  fontFamily: 'inter',
  fontWeight: 'hairline',
  color: 'white',
  opacity: '60%',
  mt: '0 !important',
};

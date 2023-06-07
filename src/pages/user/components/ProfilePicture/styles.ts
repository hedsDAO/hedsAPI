import { BoxProps, CenterProps, ImageProps, SkeletonProps, TextProps } from '@chakra-ui/react';

/**
 * Styles for the Skeleton component in ProfilePicture.
 * @param {boolean} hasProfilePictureLoaded - Whether the profile picture has been loaded or not.
 * @returns {SkeletonProps} Skeleton component properties.
 */
export const $skeletonStyles = (hasProfilePictureLoaded: boolean): SkeletonProps => ({
  opacity: '100%',
  rounded: 'full',
  mt: { base: '-20', lg: '-16' },
  ml: { md: '0', lg: '-16' },
  maxH: '160px',
  maxW: '160px',
  isLoaded: hasProfilePictureLoaded,
});

/**
 * Styles for the Box component in ProfilePicture + manage edit profile.
 * @param {boolean} isHovering - Whether the user is hovering over the profile picture or not.
 * @param {Function} onMouseEnter - Function to call when the mouse enters the Box component.
 * @param {Function} onMouseLeave - Function to call when the mouse leaves the Box component.
 * @returns {BoxProps} Box component properties.
 */
export const $editboxStyles = (isHovering: boolean, onMouseEnter: () => void, onMouseLeave: () => void): BoxProps => ({
  bg: 'black',
  pos: 'relative',
  w: '160px',
  h: '160px',
  rounded: 'full',
  _hover: { cursor: 'pointer' },
  onMouseEnter,
  onMouseLeave,
});

/**
 * Styles for the Box component in ProfilePicture.
 * @returns {BoxProps} Box component properties.
 */
export const $boxStyles: BoxProps = {
  bg: 'black',
  pos: 'relative',
  w: '160px',
  h: '160px',
  rounded: 'full',
};

/**
 * Styles for the Image component in ProfilePicture.
 * @param {string} profile_picture - The URL of the user's profile picture.
 * @param {boolean} isHovering - Whether the user is hovering over the profile picture or not.
 * @param {Function} onLoad - Function to call when the Image component has been loaded.
 * @returns {ImageProps} Image component properties.
 */
export const $imageStyles = (profile_picture: string, isHovering: boolean, onLoad: () => void): ImageProps => ({
  alt: 'user profile picture',
  transitionDuration: '.3s',
  transitionTimingFunction: 'ease-in-out',
  onLoad,
  rounded: 'full',
  w: '160px',
  h: '160px',
  objectFit: 'cover',
  src: profile_picture,
  opacity: isHovering ? 0.2 : 1,
});

/**
 * Styles for the Center component in ProfilePicture.
 * @param {boolean} isHovering - Whether the user is hovering over the profile picture or not.
 * @returns {CenterProps} Center component properties.
 */
export const $centerStyles = (isHovering: boolean): CenterProps => ({
  transitionDuration: '.2s',
  transitionTimingFunction: 'ease-in-out',
  display: isHovering ? 'flex' : 'none',
  pos: 'absolute',
  top: 0,
  left: 0,
  w: '100%',
  h: '100%',
  rounded: 'full',
});

/**
 * Styles for the Text component in ProfilePicture.
 * @type {TextProps} Text component properties.
 */
export const $textStyles: TextProps = {
  fontFamily: 'poppins',
  fontWeight: 'bold',
  fontSize: 'xl',
  color: 'white',
};

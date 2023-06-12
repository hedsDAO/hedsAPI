import { AvatarProps, FlexProps, StackProps, TextProps } from '@chakra-ui/react';

/**
 * @constant {StackProps} $customArtistHitStackStyles
 * @description StackProps object for the Stack component in the CustomArtistHit component.
 */
export const $customArtistHitStackStyles: StackProps = {
  pl: 1,
  mb: 1,
};

/**
 * @constant {TextProps} $customArtistHitTitleTextStyles
 * @description TextProps object for the Text Title components in the CustomArtistHit component.
 */
export const $customArtistHitTitleTextStyles: TextProps = {
  fontSize: 'sm',
  fontFamily: 'space',
  color: 'white',
  mb: 2,
};

/**
 * @constant {TextProps} $customArtistHitTextStyles
 * @description TextProps object for the Text components in the CustomArtistHit component.
 */
export const $customArtistHitTextStyles: TextProps = {
  fontSize: 'xs',
  fontFamily: 'space',
  color: 'white',
  mb: 1,
};

/**
 * @constant {FlexProps} $customArtistHitFlexStyles
 * @description FlexProps object for the Flex components in the CustomArtistHit component.
 */
export const $customArtistHitFlexStyles: FlexProps = {
  mt: '0 !important',
  _hover: { bg: 'heds.bg3' },
  p: 1,
  rounded: 'sm',
  gap: 3,
  alignItems: 'center',
};

/**
 * @constant {AvatarProps} $customArtistHitAvatarStyles
 * @description AvatarProps object for the Avatar components in the CustomArtistHit component.
 */
export const $customArtistHitAvatarStyles: AvatarProps = {
  size: 'sm',
  borderRadius: 'sm',
};

import { AvatarProps, FlexProps, StackProps, TextProps } from '@chakra-ui/react';

/**
 * @constant {StackProps} $customSongHitStackStyles
 * @description StackProps object for the Stack component in the CustomSongHit component.
 */
export const $customSongHitStackStyles: StackProps = {
  pl: 1,
  mb: 1,
};

/**
 * @constant {TextProps} $customSongHitTitleTextStyles
 * @description TextProps object for the Text Title components in the CustomSongHit component.
 */
export const $customSongHitTitleTextStyles: TextProps = {
  fontSize: 'xs',
  letterSpacing: 'widest',
  fontFamily: 'inter',
  color: 'white',
  mb: 2,
  pl: 0.5,
};

/**
 * @constant {TextProps} $customSongHitTextStyles
 * @description TextProps object for the Text components in the CustomSongHit component.
 */
export const $customSongHitTextStyles: TextProps = {
  fontSize: 'xs',
  fontFamily: 'space',
  color: 'white',
  mb: 1,
};

/**
 * @constant {FlexProps} $customSongHitFlexStyles
 * @description FlexProps object for the Flex components in the CustomSongHit component.
 */
export const $customSongHitFlexStyles: FlexProps = {
  mt: '0 !important',
  _hover: { bg: 'heds.bg3' },
  p: 1,
  rounded: 'sm',
  gap: 3,
  alignItems: 'center',
};

/**
 * @constant {AvatarProps} $customSongHitAvatarStyles
 * @description AvatarProps object for the Avatar components in the CustomSongHit component.
 */
export const $customSongHitAvatarStyles: AvatarProps = {
  size: 'sm',
  borderRadius: 'sm',
};

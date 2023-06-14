import { AvatarProps, FlexProps, StackProps, TextProps } from '@chakra-ui/react';

/**
 * @constant {StackProps} $customTapeHitStackStyles
 * @description StackProps object for the Stack component in the CustomTapeHit component.
 */
export const $customTapeHitStackStyles: StackProps = {
  pl: 1,
  mb: 1,
};


/**
 * @constant {TextProps} $customTapeHitTitleTextStyles
 * @description TextProps object for the Text Title components in the CustomTapeHit component.
 */
export const $customTapeHitTitleTextStyles: TextProps = {
  fontSize: 'xs',
  letterSpacing: 'widest',
  fontFamily: 'inter',
  color: 'white',
  mb: 2,
  pl: 0.5,
  };

/**
 * @constant {TextProps} $customTapeHitTextStyles
 * @description TextProps object for the Text components in the CustomTapeHit component.
 */
export const $customTapeHitTextStyles: TextProps = {
  fontFamily: 'space',
  color: 'white',
  fontSize: 'xs',
  mb: 1, 
};

/**
 * @constant {FlexProps} $customTapeHitFlexStyles
 * @description FlexProps object for the Flex components in the CustomTapeHit component.
 */
export const $customTapeHitFlexStyles: FlexProps = {
  mt: '0 !important',
  _hover: { bg: 'heds.bg3' },
  p: 1,
  rounded: 'sm',
  gap: 3,
  alignItems: 'center',
};

/**
 * @constant {AvatarProps} $customTapeHitAvatarStyles
 * @description AvatarProps object for the Avatar components in the CustomTapeHit component.
 */
export const $customTapeHitAvatarStyles: AvatarProps = {
  size: 'sm',
  borderRadius: 'sm',
};

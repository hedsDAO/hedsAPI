import { BoxProps, StackProps, TextProps, ButtonProps, FlexProps, AvatarProps, RadioProps } from '@chakra-ui/react';

/**
 * @const {StackProps} $disclaimerTextStackProps
 * @description Styles for the disclaimer text parent stack component.
 */

export const $disclaimerTextStackProps: StackProps = {
  alignItems: 'center',
  mt: 6,
};

/**
 * @const {TextProps} $headerTextStyles
 * @description Styles for the header text component.
 */

export const $headerTextStyles: TextProps = {
  fontWeight: 'extrabold',
  color: 'white',
  letterSpacing: 'widest',
};

/**
 * @const {BoxProps} $redTextStyles
 * @description Styles for the red text component.
 */

export const $redTextStyles: BoxProps = {
  as: 'span',
  color: 'red.500',
  fontWeight: 'bold',
};

/**
 * @const {TextProps} $textProps
 * @description Styles for the disclaimer text component.
 */

export const $textProps: TextProps = {
  opacity: '80%',
  px: 14,
  textAlign: 'center',
  width: '100%',
  letterSpacing: 'wide',
  fontFamily: 'inter',
  fontSize: 'sm',
  color: 'white',
};

/**
 * @const {FlexProps} $curatorInfoFlexProps
 * @description Styles for the curator info flex component.
 */

export const $curatorInfoFlexProps: FlexProps = {
  gap: 6,
  pb: 5,
  alignItems: 'center',
};

/**
 * @const {AvatarProps} $curatorAvatarStyles
 * @description Styles for the curator avatar component.
 */

export const $curatorAvatarStyles: AvatarProps = {
  size: 'xl',
};

/**
 * @const {ButtonProps} $continueButtonStyles
 * @description Styles for the continue button component.
 */

export const $continueButtonStyles: ButtonProps = {
  colorScheme: 'whiteAlpha',
  size: 'sm',
  color: 'white',
  bg: 'heds.200',
  _hover: {
    bg: 'heds.200',
    opacity: '90%'
  }
};

/**
 * @const {TextProps} $curatorNameTextStyles
 * @description Styles for the curator name text component.
 */

export const $curatorNameTextStyles: TextProps = {
  mt: '0 !important',
  color: 'white',
  letterSpacing: 'wider',
  fontFamily: 'karla',
  fontSize: '2xl',
};

/**
 * @const {TextProps} $curatorWalletTextStyles
 * @description Styles for the curator wallet text component.
 */

export const $curatorWalletTextStyles: TextProps = {
  mt: '0 !important',
  fontFamily: 'space',
  color: 'white',
  fontSize: 'md',
  opacity: '50%',
};

/**
 * @const {StackProps} $buttonsAndDisclaimerStackStyles
 * @description Styles for the buttons and disclaimer stack component.
 */

export const $buttonsAndDisclaimerStackStyles: StackProps = {
  gap: 4,
};

/**
 * @const {TextProps} $radioTextStyles
 * @description Styles for the disclaimer text component.
 */

export const $radioTextStyles: TextProps = {
  letterSpacing: 'wider',
  fontFamily: 'inter',
  fontSize: 'xs',
  color: 'white',
  opacity: '80%',
  ml: 3,
};

/**
 * @const {FlexProps} $radioFlexStyles
 * @description Styles for the radio and text flex component.
 */

export const $radioFlexStyles: FlexProps = {
  mt: 6,
  justifyContent: 'center',
};

/**
 * @const {RadioProps} $radioStyles
 * @description Styles for the radio button component.
 */

export const $radioStyles: RadioProps = {
  size: 'sm',
  borderColor: 'white',
  border: 'solid 1px',
};
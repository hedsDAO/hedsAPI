import { ButtonProps, FlexProps, StackProps, TextProps, Link } from '@chakra-ui/react';
/**
 * @constant {string} $twitterIcon
 * @description classname for the Twitter icon via fontawesome api.
 */
export const $twitterIcon = 'fab fa-twitter';

/**
 * @constant {StackProps} $detailsStackStyles
 * @description StackProps object contains styles for the Details component container.
 */
export const $detailsStackStyles: StackProps = {
  alignItems: { base: 'center', lg: 'start' },
};

/**
 * @constant {FlexProps} $displayNameFlexStyles
 * @description FlexProps object contains styles for the display name container.
 */
export const $displayNameFlexStyles: FlexProps = {
  mt: { base: '0 !important', lg: 0 },
  gap: 2,
  alignItems: 'center',
};

/**
 * @constant {TextProps} $displayNameTextStyles
 * @description TextProps object contains styles for the display name text.
 */
export const $displayNameTextStyles: TextProps = {
  fontFamily: 'poppins',
  fontWeight: 'bold',
  color: 'white',
  fontSize: '4xl',
};

/**
 * @constant {FlexProps} $descriptionFlexStyles
 * @description FlexProps object contains styles for the description container.
 */
export const $descriptionFlexStyles: FlexProps = {
  mt: { base: '-4 !important', xl: '-2 !important' },
  gap: 0.5,
  alignItems: 'end',
};

/**
 * @constant {TextProps} $descriptionTextStyles
 * @description TextProps object contains styles for the description text.
 */
export const $descriptionTextStyles: TextProps = {
  p: { base: 4, lg: 0 },
  textAlign: { base: 'center', lg: 'start' },
  maxW: '65ch',
  mt: '2 !important',
  fontFamily: 'inter',
  fontSize: 'sm',
  color: 'white',
  opacity: '60%',
};

/**
 * @constant {FlexProps} $walletAndTwitterButtonsFlexStyles
 * @description FlexProps object contains styles for the wallet and Twitter buttons container.
 */
export const $walletAndTwitterButtonsFlexStyles: FlexProps = {
  gap: 1,
  alignItems: 'center',
};

/**
 * @function $twitterButtonStyles
 * @description Function that returns ButtonProps object containing styles for the Twitter button.
 * @returns {ButtonProps}
 */
export const $twitterButtonStyles: ButtonProps = {
  display: { base: 'none', lg: 'flex' },
  mb: { base: '0 !important', lg: '-1 !important' },
  rounded: 'full',
  _hover: { bg: 'heds.300', color: 'heds.bg' },
  border: 'solid 1px',
  color: 'heds.300',
  bg: 'heds.bg2',
  borderColor: 'transparent',
  size: 'xs',
  px: { base: 0, lg: 1 },
};

/**
 * @function $verifyTwitterButtonStyles
 * @description Function that returns ButtonProps object containing styles for the verify Twitter button on desktop.
 * @returns {ButtonProps}
 */
export const $verifyTwitterButtonStyles: ButtonProps = {
  display: { base: 'none', lg: 'flex' },
  mb: { base: '0 !important', lg: '-1 !important' },
  rounded: 'full',
  _hover: { bg: 'heds.300', color: 'heds.bg' },
  border: 'solid 1px',
  color: 'heds.300',
  bg: 'heds.bg2',
  borderColor: 'transparent',
  size: 'xs',
  alignItems: 'center',
  gap: 1,
  letterSpacing: 'wide',
  px: { base: 0, lg: 2 },
};

/**
 * @function $verifyTwitterButtonMobileStyles
 * @description Function that returns ButtonProps object containing styles for the Twitter button.
 * @returns {ButtonProps}
 */
export const $verifyTwitterButtonMobileStyles: ButtonProps = {
  display: { base: 'flex', lg: 'none' },
  mb: { base: '0 !important', lg: '-1 !important' },
  rounded: 'full',
  _hover: { bg: 'heds.300', color: 'heds.bg' },
  border: 'solid 1px',
  color: 'heds.300',
  bg: 'heds.bg2',
  borderColor: 'transparent',
  size: 'xs',
  alignItems: 'center',
  gap: 1,
  letterSpacing: 'wide',
  px: { base: 2, lg: 0 },
};

/**
 * @function $votingPowerStyles
 * @description Function that returns ExtendedLinkButtonProps object containing styles for the voting power button.
 * @returns {ExtendedLinkButtonProps}
 */
export const $votingPowerStyles: TextProps = {
  display: { base: 'flex', lg: 'none' },
  mb: { base: '0 !important', lg: '-1 !important' },
  rounded: 'full',
  border: 'solid 1px',
  color: 'heds.300',
  bg: 'heds.bg2',
  borderColor: 'transparent',
  fontSize: 'xs',
  px: { base: 1.5, lg: 0 },
  py: 0.5,
};

/**
 * @function $twitterButtonMobileStyles
 * @description Function that returns ButtonProps object containing styles for the Twitter button.
 * @returns {ButtonProps}
 */
export const $twitterButtonMobileStyles: ButtonProps = {
  display: { base: 'flex', lg: 'none' },
  mb: { base: '0 !important', lg: '-1 !important' },
  rounded: 'full',
  _hover: { bg: 'heds.300', color: 'heds.bg' },
  border: 'solid 1px',
  color: 'heds.300',
  bg: 'heds.bg2',
  borderColor: 'transparent',
  size: 'xs',
  px: { base: 0, lg: 1 },
};
/**
 * @function $walletButtonStyles
 * @description Function that returns ButtonProps object containing styles for the wallet button.
 * @returns {ButtonProps}
 */

export const $walletButtonStyles: ButtonProps = {
  display: { base: 'flex', lg: 'none' },
  mt: { base: '0 !important', lg: '-1.5 !important' },
  rounded: 'full',
  _hover: { bg: 'heds.300', color: 'heds.bg' },
  border: 'solid 1px',
  color: 'heds.300',
  bg: 'heds.bg2',
  borderColor: 'transparent',
  size: 'xs',
  px: 3,
};

import { ButtonProps, FlexProps, StackProps, TextProps, Link } from '@chakra-ui/react';

export interface ExtendedLinkButtonProps extends ButtonProps {
  'data-testid'?: string;
  target?: string;
  href?: string;
}

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
  alignItems: 'baseline',
};

/**
 * @function $twitterButtonStyles
 * @param {string} twitter_handle
 * @description Function that returns ExtendedLinkButtonProps object containing styles for the Twitter button.
 * @returns {ExtendedLinkButtonProps}
 */
export const $twitterButtonStyles = (twitter_handle: string): ExtendedLinkButtonProps => ({
  'data-testid': 'twitter-button',
  display: { base: 'flex', lg: 'none' },
  as: Link,
  mb: { base: '0 !important', lg: '-1 !important' },
  rounded: 'full',
  target: '_blank',
  href: `https://www.twitter.com/${twitter_handle}`,
  _hover: { bg: 'heds.300', color: 'heds.bg' },
  border: 'solid 1px',
  color: 'heds.300',
  bg: 'heds.bg2',
  borderColor: 'transparent',
  size: 'xs',
  px: { base: 0, lg: 1 },
});

/**
 * @function $walletButtonStyles
 * @param {string} address
 * @description Function that returns ExtendedLinkButtonProps object containing styles for the wallet button.
 * @returns {ExtendedLinkButtonProps}
 */

export const $walletButtonStyles = (address: string): ExtendedLinkButtonProps => ({
  'data-testid': 'wallet-button',
  display: { base: 'flex', lg: 'none' },
  mt: { base: '0 !important', lg: '-1.5 !important' },
  as: Link,
  rounded: 'full',
  target: '_blank',
  _hover: { bg: 'heds.300', color: 'heds.bg' },
  href: `https://www.etherscan.com/address/${address}`,
  border: 'solid 1px',
  color: 'heds.300',
  bg: 'heds.bg2',
  borderColor: 'transparent',
  size: 'xs',
  px: 3,
});

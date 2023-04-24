import { ButtonProps, FlexProps, Link, StackProps, TextProps } from '@chakra-ui/react';

export interface ExtendedLinkButtonProps extends ButtonProps {
  'data-testid'?: string;
  target?: string;
  href?: string;
}

/**
 * @type {FlexProps}
 * @description Styles for the wallet and VP Flex container.
 */
export const $flexContainerStyles: FlexProps = {
  direction: { base: 'row-reverse', lg: 'row' },
  mt: { base: '-190px', lg: 1 },
  pr: { base: 4, lg: 0 },
  gap: { base: 1.5, lg: 2 },
  alignItems: { base: 'center', lg: 'center' },
};

/**
 * @type {StackProps}
 * @description Styles for the inner Stack element in the wallet and VP section.
 */
export const $flexInnerStackStyles: StackProps = {
  display: { base: 'none', lg: 'flex' },
  direction: { base: 'row-reverse', lg: 'column' },
  alignItems: { base: 'center', lg: 'end' },
  gap: 1.5,
};

/**
 * @type {TextProps}
 * @description Styles for the gradient Text element in the wallet and VP section.
 */
export const $gradientTextStyles: TextProps = {
  className: 'gradient-text',
  fontFamily: 'poppins',
  fontWeight: 'bold',
  fontSize: { base: '2xl', lg: '4xl' },
};

/**
 * @type {ExtendedLinkButtonProps}
 * @description Styles for the Button element in the wallet and VP section.
 */
export const $buttonStyles = (wallet: string): ExtendedLinkButtonProps => ({
  display: { base: 'none', lg: 'flex' },
  mt: { base: '-4 !important', lg: '-1.5 !important' },
  as: Link,
  rounded: 'full',
  target: '_blank',
  href: `https://www.etherscan.com/address/${wallet}`,
  _hover: { bg: 'heds.300', color: 'heds.bg' },
  border: 'solid 1px',
  color: 'heds.300',
  bg: 'heds.bg2',
  borderColor: 'transparent',
  size: 'xs',
  px: 3,
});

/**
 * @type {TextProps}
 * @description Styles for the info icon Text element in the wallet and VP section.
 */
export const $infoIconStyles: TextProps = {
  as: 'i',
  display: { base: 'none', lg: 'flex' },
  mt: { base: '-1.5 !important', lg: '-3 !important' },
  fontSize: { base: 'xs', lg: 'md' },
  opacity: '30%',
  color: 'white',
  className: 'fas fa-info-circle',
};

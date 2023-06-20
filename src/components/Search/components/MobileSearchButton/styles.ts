import { FlexProps, IconButtonProps } from '@chakra-ui/react';

/**
 * @constant {FlexProps} $mobileSearchButtonFlexStyles
 * @description FlexProps object for the Flex component in the MobileSearchButton component.
 */
export const $mobileSearchButtonFlexStyles: FlexProps = {
  justifyContent: 'end',
  pr: 4,
};

/**
 * @constant {IconButtonProps} $mobileSearchButtonIconButtonStyles
 * @description IconButtonProps object for the IconButton component in the MobileSearchButton component.
 */
export const $mobileSearchButtonIconButtonStyles: IconButtonProps = {
  _focus: { shadow: 'none', borderColor: 'transparent' },
  _hover: { shadow: 'none', borderColor: 'transparent' },
  bg: 'transparent',
  boxSize: 2.5,
  color: 'white',
  opacity: '70%',
  size: 'xs',
  'aria-label': 'open search',
};

import { FlexProps, IconProps, InputProps, IconButtonProps, SpinnerProps } from '@chakra-ui/react';

/**
 * @constant
 * @description Style properties for the Flex component in the search box
 * @type {FlexProps}
 */
export const $flexStyles: FlexProps = {
  rounded: 'lg',
  mt: '0 !important',
  bg: 'heds.bg2',
  w: 'full',
  gap: 2,
  px: 2,
  mb: 4,
  alignItems: 'center',
};

/**
 * @constant
 * @description Style properties for the Spinner component in the search box
 * @type {SpinnerProps}
 */
export const $spinnerStyles: SpinnerProps = {
  size: 'sm',
};

/**
 * @constant
 * @description Style properties for the SearchIcon component in the search box
 * @type {IconProps}
 */
export const $searchIconStyles: IconProps = {
  color: 'white',
  boxSize: 2.5,
};

/**
 * @constant
 * @description Style properties for the Input component in the search box
 * @type {InputProps}
 */
export const $inputStyles: InputProps = {
  py: 0.5,
  _focus: { shadow: 'none', borderColor: 'transparent' },
  _hover: { shadow: 'none', borderColor: 'transparent' },
  h: 'unset',
  rounded: 'lg',
  borderColor: 'transparent',
  size: 'xs',
  type: 'search',
  textColor: 'white',
};

/**
 * @constant
 * @description Style properties for the IconButton component in the search box
 * @type {IconButtonProps}
 */
export const $iconButtonStyles: IconButtonProps = {
  _focus: { shadow: 'none', borderColor: 'transparent' },
  _hover: { shadow: 'none', borderColor: 'transparent' },
  bg: 'transparent',
  boxSize: 2.5,
  color: 'white',
  opacity: '70%',
  size: 'xs',
  'aria-label': 'clear search',
};

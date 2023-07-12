import {
  FormControlProps,
  FormHelperTextProps,
  FormLabelProps,
  StackProps,
  InputGroupProps,
  InputAddonProps,
  InputProps,
  TextProps,
  FlexProps,
} from '@chakra-ui/react';

/**
 * @constant $stackContainerStyles
 * @description Styles for the stack container.
 */
export const $stackContainerStyles: StackProps = {
  mt: 5,
};

/**
 * @description Styles for the FormControl component.
 * @returns {FormControlProps} - FormControl styles.
 */
export const $formControlStyles: FormControlProps = {};

/**
 * @description Styles for the FormLabel component.
 * @returns {FormLabelProps} - FormLabel styles.
 */
export const $formLabelStyles: FormLabelProps = {
  color: 'white',
};

/**
 * @param {string | undefined} twitterError - Description error text.
 * @returns {InputProps} - Input styles.
 */
export const $inputStyles = (twitterError?: string): InputProps => ({
  borderColor: twitterError ? 'red.500' : 'heds.800',
  outlineColor: 'transparent',
  boxShadow: 'none !important',
  _focus: { borderColor: twitterError ? 'red.500' : 'heds.700' },
  color: 'heds.800',
});

/**
 * @description Styles for the InputLeftAddon component.
 * @returns {InputAddonProps} - InputLeftAddon styles.
 */
export const $inputLeftAddOnStyles: InputAddonProps = {
  bg: 'heds.bg3',
  color: 'white',
};

/**
 * @description Styles for the InputGroup component.
 * @returns {InputGroupProps} - InputGroup styles.
 */
export const $inputGroupStyles: InputGroupProps = {
  marginTop: 4,
};

/**
 * @description Styles for the FormHelperText component.
 * @returns {FormHelperTextProps} - FormHelperText styles.
 */
export const $formHelperTextStyles: FormHelperTextProps = {
  mt: '-1 !important',
  fontSize: 'xs',
};

/**
 * @description Styles for the FormHelperText component.
 * @returns {FormHelperTextProps} - FormHelperText styles.
 */
export const $errorFormHelperTextStyles: FormHelperTextProps = {
  mt: '1 !important',
  color: 'red.500',
  fontSize: 'xs',
};

/**
 * @description Styles for linked account url text.
 * @returns {TextProps} - Text styles.
 */

export const $linkedAccountUrlTextStyles = {
  fontSize: 'sm',
  color: 'twitter.500',
  target: '_blank',
};

export const $unlinkButtonTextStyles: TextProps = {
  fontSize: 'sm',
  color: 'red.500',
  pointerEvents: 'auto',
  role: 'button',
  className: 'fa-solid fa-link-slash',
};

export const $unlinkTextFlexStyles: FlexProps = {
  gap: 2,
  alignItems: 'center',
};

export const $linkedAccountsTitleTextStyles: TextProps = {
  fontWeight: 'bold',
  fontSize: 'lg',
  color: 'white',
};

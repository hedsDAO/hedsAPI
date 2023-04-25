import { FormControlProps, FormHelperTextProps, FormLabelProps, StackProps, TextareaProps } from '@chakra-ui/react';

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
 * @param {string | undefined} descriptionError - Description error text.
 * @returns {TextareaProps} - Textarea styles.
 */
export const $textareaStyles = (descriptionError?: string, newDescription?: string, description?: string): TextareaProps => ({
  borderColor: descriptionError ? 'red.500' : 'heds.800',
  outlineColor: 'transparent',
  boxShadow: 'none !important',
  mt: 4,
  value: newDescription || '',
  placeholder: description || '',
  maxLength: 130,
  rows: 3,
  resize: 'none',
  _focus: { borderColor: descriptionError ? 'red.500' : 'heds.700' },
  color: 'heds.800',
});

/**
 * @description Styles for the FormHelperText component.
 * @returns {FormHelperTextProps} - FormHelperText styles.
 */
export const $formHelperTextStyles: FormHelperTextProps = {
  mt: '-1 !important',
  fontSize: 'xs',
};

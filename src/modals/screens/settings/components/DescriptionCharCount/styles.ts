import { BoxProps, TextProps } from '@chakra-ui/react';

/**
 * @function $errorBoxStyles
 * @description Generates styles for the error box based on the error state.
 * @param {string | undefined} descriptionError - Description error text.
 * @returns {BoxProps} - Styles for the error box.
 **/
export const $errorBoxStyles = (descriptionError?: string): BoxProps => ({
  color: descriptionError ? 'red' : undefined,
});

/**
 * @function $errorTextStyles
 * @description Generates styles for the error text based on the error state.
 * @param {string | undefined} descriptionError - Description error text.
 * @returns {TextProps} - Styles for the error text.
 **/
export const $errorTextStyles = (descriptionError?: string): TextProps => ({
  opacity: '70%',
  color: descriptionError ? 'red.500' : 'white',
  fontSize: 'xs',
});

/**
 * @function $charCountTextStyles
 * @description Generates styles for the character count text based on the error state.
 * @param {string | undefined} descriptionError - Description error text.
 * @returns {TextProps} - Styles for the character count text.
 **/
export const $charCountTextStyles = (descriptionError?: string): TextProps => ({
  opacity: '70%',
  color: descriptionError ? 'red.500' : 'white',
  fontSize: 'sm',
});

/**
 * @constant $slashTextStyles
 * @description Styles for the slash text in the character count.
 * @type {TextProps}
 **/
export const $slashTextStyles = (descriptionError?: string): TextProps => ({
  opacity: '50%',
  color: descriptionError ? 'red.500' : 'white',
  fontSize: 'sm',
});

/**
 * @function $maxCharTextStyles
 * @description Generates styles for the maximum character count text based on the error state.
 * @param {string | undefined} descriptionError - Description error text.
 * @returns {TextProps} - Styles for the maximum character count text * @param {string | undefined} descriptionError - Description error text.
 * @returns {TextProps} - Styles for the maximum character count text.
 **/
export const $maxCharTextStyles = (descriptionError?: string): TextProps => ({
  opacity: '50%',
  color: descriptionError ? 'red.500' : 'white',
  fontSize: 'sm',
});

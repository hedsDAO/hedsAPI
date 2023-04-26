import { ButtonProps, FlexProps, SpinnerProps } from '@chakra-ui/react';

/**
 * @constant $flexContainerStyles
 * @description Styles for the ButtonGroup container.
 * @type {FlexProps}
 **/
export const $flexContainerStyles: FlexProps = {
  my: 3,
  justifyContent: 'space-between',
  gap: 1,
};

/**
 * @constant $buttonsFlexStyles
 * @description Styles for the Flex container that holds the action buttons.
 * @type {FlexProps}
 **/
export const $buttonsFlexStyles: FlexProps = {
  gap: 1,
};

/**
 * @function $saveButtonStyles
 * @description Generates styles for the Save button based on the loading state.
 * @param {boolean} isLoading - Whether the component is currently loading or not.
 * @returns {ButtonProps} - Styles for the Save button.
 **/
export const $saveButtonStyles = (isLoading: boolean, isDisabled: boolean): ButtonProps => ({
  isDisabled: isDisabled,
  _hover: { bg: 'heds.500', border: 'solid 1px', borderColor: 'heds.700' },
  border: 'solid 1px',
  borderColor: 'transparent',
  color: 'white',
  bg: 'heds.700',
  px: 6,
  py: 0.5,
  size: 'xs',
});

/**
 * @constant $resetButtonStyles
 * @description Styles for the Reset button.
 * @type {ButtonProps}
 **/
export const $resetButtonStyles = (isDisabled: boolean): ButtonProps => ({
  isDisabled: isDisabled,
  _hover: { borderColor: 'transparent', bg: 'heds.bg2', transform: 'rotate(360deg)' },
  fontSize: '2xs',
  color: 'white',
  border: 'solid 1px',
  borderColor: 'heds.700',
  bg: 'heds.bg2',
  px: 2,
  py: 0.5,
  size: 'xs',
});

/**
 * @constant $clearButtonStyles
 * @description Styles for the Clear button.
 * @type {ButtonProps}
 **/
export const $clearButtonStyles: ButtonProps = {
  _hover: { borderColor: 'transparent', bg: 'red.700' },
  fontSize: '2xs',
  color: 'white',
  bg: 'heds.bg2',
  px: 2,
  py: 0.5,
  size: 'xs',
};

/**
 * @constant $spinnerSize
 * @description Styles for the spinner animation.
 * @type {SpinnerProps}
 **/
export const $spinnerSize: SpinnerProps = {
  size: 'sm',
};

/**
 * @constant {string} $refreshIcon
 * @description classname for the refresh arrow icon via fontawesome api.
 */
export const $refreshIcon = 'fa-regular fa-arrow-rotate-right';

/**
 * @constant {string} $exitIcon
 * @description classname for the exit icon via fontawesome api.
 */
export const $exitIcon = 'fa-solid fa-arrow-right-from-bracket';

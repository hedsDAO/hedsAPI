import { AvatarProps, BoxProps, ButtonProps, CheckboxProps, StackProps, TextProps } from '@chakra-ui/react';

/**
 * @constant {TextProps} $downloadTextStyles
 * @description TextProps object contains styles for the Download component's Text elements.
 */
export const $downloadTextStyles: TextProps = {
  color: 'heds.200',
  fontFamily: 'inter',
  fontSize: 'xl',
  fontWeight: '700',
  pt: 4,
};

/**
 * @constant {BoxProps} $downloadBoxStyles
 * @description BoxProps object contains styles for the Download component's Box elements.
 */
export const $downloadBoxStyles: BoxProps = {
  textAlign: 'center',
  pt: 7,
};

/**
 * @constant {StackProps} $downloadStackStyles
 * @description StackProps object contains styles for the Download component's Stack elements.
 */
export const $downloadStackStyles: StackProps = {
  direction: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};

/**
 * @constant {AvatarProps} $downloadAvatarStyles
 * @description AvatarProps object contains styles for the Download component's Avatar elements.
 */
export const $downloadAvatarStyles: AvatarProps = {
  size: 'lg',
  border: '1px',
  borderColor: 'heds.200',
};

/**
 * @constant {CheckboxProps} $downloadCheckboxStyles
 * @description CheckboxProps object contains styles for the Download component's Checkbox elements.
 */
export const $downloadCheckboxStyles: CheckboxProps = {
  pt: 6,
  size: 'sm',
};

/**
 * @constant {ButtonProps} $downloadButtonStyles
 * @description ButtonProps object contains styles for the Download component's Button elements.
 */
export const $downloadButtonStyles: ButtonProps = {
  bgColor: 'button.primary',
  color: 'white',
  mr: 3,
  w: '100%',
};

export const $submissionTextStyles: TextProps = {
  fontFamily: 'inter',
  fontWeight: '400',
  color: 'gray.300',
  fontSize: 'sm',
  letterSpacing: 'widest',
};

export const $generalTextStyles: TextProps = {
  fontFamily: 'inter',
  fontWeight: '500',
  fontSize: 'sm',
  display: 'inline',
};

export const $redTextStyles: TextProps = {
  fontFamily: 'inter',
  fontSize: 'sm',
  display: 'inline',
  fontWeight: 'extrabold',
  color: 'red.500',
};

export const $cycleTimeTextStyles: TextProps = {
  color: 'white',
  fontFamily: 'sans-serif',
  fontSize: 'sm',
  letterSpacing: 'widest',
};

import { ButtonProps, StackProps, TextProps } from '@chakra-ui/react';

/**
 * @constant {StackProps} $mainStackStyles
 * @description StackProps object contains styles for the main Stack component.
 */
export const $mainStackStyles: StackProps = {
  gap: 3,
  justifyContent: 'center',
  width: { sm: '100%', md: '80%', lg: '30%' },
};

/**
 * @constant {TextProps} $tapeNameTextStyles
 * @description TextProps object contains styles for the tape name text.
 */
export const $tapeNameTextStyles: TextProps = {
  color: '#D3D3FF',
  letterSpacing: 'widest',
  fontSize: '3xl',
  fontWeight: 'bold',
};

/**
 * @constant {StackProps} $artistStackStyles
 * @description StackProps object contains styles for the artist Stack component.
 */
export const $artistStackStyles: StackProps = {
  direction: 'row',
  alignItems: 'center',
};

/**
 * @constant {TextProps} $artistNameTextStyles
 * @description TextProps object contains styles for the artist name text.
 */
export const $artistNameTextStyles: TextProps = {
  color: 'white.pure',
  fontSize: 'sm',
};

/**
 * @constant {ButtonProps} $downloadButtonStyles
 * @description ButtonProps object contains styles for the download button.
 */
export const $downloadButtonStyles: ButtonProps = {
  color: 'white',
  width: ['100%', '50%'],
  bgColor: 'black',
  border: '1px',
  borderColor: 'button.primary',
  fontFamily: 'sans-serif',
  fontWeight: 'light',
  fontSize: 'xs',
  _hover: { bgColor: 'gray.700' },
};

/**
 * @constant {TextProps} $aboutTheTapeTextStyles
 * @description TextProps object contains styles for the 'About The Tape' text.
 */
export const $aboutTheTapeTextStyles: TextProps = {
  color: 'white',
  fontSize: 'lg',
  fontWeight: 'bold',
};

/**
 * @constant {TextProps} $tapeDescriptionTextStyles
 * @description TextProps object contains styles for the tape description text.
 */
export const $tapeDescriptionTextStyles: TextProps = {
  color: 'white',
  fontSize: 'xs',
  lineHeight: '20px',
};

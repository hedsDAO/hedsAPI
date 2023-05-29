import { BoxProps, CenterProps, ImageProps, InputProps, StackProps, TextProps } from '@chakra-ui/react';

export interface ExtendedInputProps extends InputProps {
  'data-testid'?: string;
}

/**
 * @description Styles for the Box component containing the profile picture form.
 * @returns {BoxProps} - Box styles.
 */
export const $boxStyles: BoxProps = {
  position: 'relative',
  display: 'inline-block',
  px: 4,
};

/**
 * @constant $profileFormVStackStyles
 * @description Styles to add gap to the profile form items.
 * @type {CenterProps}
 **/

export const $profileFormVStackStyles: StackProps = {
  spacing: 2,
};

/**
 * @description Styles for the hidden input component.
 * @returns {React.InputHTMLAttributes<HTMLInputElement>} - Input styles.
 */
export const $inputStyles: ExtendedInputProps = {
  type: 'file',
  'data-testid': 'profile-picture-input',
  accept: 'image/*',
  hidden: true,
};

/**
 * @description Styles for the image component displaying the profile picture.
 * @returns {ImageProps} - Image styles.
 */
export const $imageStyles = (src: string, profilePictureError?: string, isHoveringProfilePicture?: boolean): ImageProps => ({
  border: 'solid 1px',
  pos: 'relative',
  zIndex: 20,
  src: src,
  borderColor: profilePictureError?.length ? 'red.500' : 'transparent',
  opacity: profilePictureError?.length ? '10%' : isHoveringProfilePicture ? '80%' : '100%',
  height: { base: '24', lg: '32' },
  width: { base: '24', lg: '32' },
  transitionDuration: '0.2s',
  mt: '-12',
  objectFit: 'contain',
  rounded: 'full',
  alt: "profile-picture"
});

/**
 * @description Styles for the Center component that wraps the content inside the profile picture.
 * @returns {CenterProps} - Center styles.
 */
export const $centerStyles: CenterProps = {
  pointerEvents: 'auto',
  zIndex: 20,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  role: 'button',
};

/**
 * @description Styles for the Text component inside the profile picture form.
 * @returns {TextProps} - Text styles.
 */
export const $textStyles = (profilePictureError?: string, isHoveringProfilePicture?: boolean): TextProps => ({
  maxW: '24',
  mt: '-7',
  textAlign: 'center',
  color: profilePictureError ? 'red.500' : 'white',
  opacity: profilePictureError ? '100%' : isHoveringProfilePicture ? '100%' : '0%',
  transitionDuration: '0.2s',
  fontSize: '2xs',
  fontWeight: 'bold',
});

import { BoxProps, CenterProps, ImageProps, InputProps, StackProps, TextProps } from '@chakra-ui/react';

/**
 * @constant $bannerBoxStyles
 * @description Styles for the BannerForm container.
 * @type {BoxProps}
 **/

export const $bannerBoxStyles: BoxProps = {
  w: '100%',
  position: 'relative',
  display: 'inline-block',
};

/**
 * @constant $bannerInputStyles
 * @description Styles for the hidden file input element in BannerForm.
 * @type {InputProps}
 **/

export const $bannerInputStyles: InputProps = {
  type: 'file',
  accept: 'image/*',
  hidden: true,
};

/**
 * @function $bannerImageStyles
 * @description Generates styles for the banner image based on error and hover states.
 * @param {string} bannerError - Error message related to the banner image, if any.
 * @param {boolean} isHoveringBanner - Whether the mouse is hovering over the banner image or not.
 * @returns {ImageProps} - Styles for the banner image.
 **/

export const $bannerImageStyles = (bannerError: string, isHoveringBanner: boolean): ImageProps => ({
  maxH: { base: '24', lg: '28' },
  minH: { base: '24', lg: '28' },
  w: '100%',
  objectFit: 'cover',
  border: 'solid 1px',
  opacity: bannerError?.length ? '10%' : isHoveringBanner ? '60%' : '100%',
  borderColor: bannerError?.length ? 'red.500' : 'heds.bg2',
  transitionDuration: '0.2s',
  rounded: 'lg',
});

/**
 * @constant $bannerVStackStyles
 * @description Styles to add gap to the banner form items.
 * @type {CenterProps}
 **/

export const $bannerVStackStyles: StackProps = {
  spacing: 2,
};

/**
 * @constant $bannerCenterStyles
 * @description Styles for the click area to trigger the file input.
 * @type {CenterProps}
 **/

export const $bannerCenterStyles: CenterProps = {
  role: 'button',
  pointerEvents: 'auto',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

/**
 * @function $bannerTextStyles
 * @description Generates styles for the banner text based on error and hover states.
 * @param {string} bannerError - Error message related to the banner image, if any.
 * @param {boolean} isHoveringBanner - Whether the mouse is hovering over the banner image or not.
 * @returns {TextProps} - Styles for the banner text.
 **/

export const $bannerTextStyles = (bannerError: string, isHoveringBanner: boolean): TextProps => ({
  color: bannerError ? 'red.500' : 'white',
  opacity: bannerError ? '100%' : isHoveringBanner ? '100%' : '0%',
  transitionDuration: '0.2s',
  fontSize: 'sm',
  fontWeight: 'bold',
});

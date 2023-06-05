import { ButtonProps, TextProps } from '@chakra-ui/react';

/**
 * @constant {ButtonProps} $likeButtonStyles
 * @description ButtonProps object that contains styles for the LikeButton component.
 */

export const $likeButtonStyles: ButtonProps = {
  mt: '0.5 !important',
  bg: 'transparent',
  _hover: { bg: 'transparent' },
  mr: 2.5,
  ml: { base: 2, lg: 0 },
};

/**
 * @constant {TextProps} $likeButtonIconStyles
 * @description TextProps object that contains styles for the LikeButton Icon Heart.
 */

export const $likeButtonIconStyles = (liked: boolean): TextProps => ({
  color: 'white',
  fontSize: { base: 'sm', lg: 'md' },
  as: 'i',
  className: liked ? 'fas fa-heart' : 'fal fa-heart',
});

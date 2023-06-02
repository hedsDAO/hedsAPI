import { TextProps } from '@chakra-ui/react';

interface ExtendedTextProps extends TextProps {
  'data-testid'?: string;
}

/**
 * @constant {ExtendedTextProps} $likeButtonStyles
 * @description TextProps object that contains styles for the LikeButton component.
 */

export const $likeButtonStyles = (liked: boolean, onClick: () => void): ExtendedTextProps => ({
  'data-testid': 'ga-like-button',
  onClick,
  role: 'button',
  pointerEvents: 'auto',
  mt: '0.5 !important',
  mr: 2.5,
  ml: {base: 2, lg: 0},
  color: 'white',
  fontSize: {base: 'sm', lg: 'md'},
  as: 'i',
  className: liked ? 'fas fa-heart' : 'fal fa-heart',
});

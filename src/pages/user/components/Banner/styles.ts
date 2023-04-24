import { SkeletonProps, ImageProps } from '@chakra-ui/react';

/**
 * @constant {SkeletonProps} $skeletonStyles
 * @description SkeletonProps object that contains styles for the Skeleton component used for
 * the User banner image.
 */
export const $skeletonStyles: SkeletonProps = {
  minW: '100vw',
  minH: '30vh',
  maxH: '30vh',
};

/**
 * @constant {ImageProps} $imageStyles
 * @description ImageProps object that contains styles for the Banner image component.
 */
export const $imageStyles: ImageProps = {
  objectFit: 'cover',
  minW: '100vw',
  minH: '30vh',
  maxH: '30vh',
};

import { AspectRatioProps, ImageProps, SkeletonProps } from '@chakra-ui/react';

/**
 * @constant {AspectRatioProps} $songCoverAspectRatioStyles
 * @description AspectRatioProps object that contains styles for the SongCover component container.
 */
export const $songCoverAspectRatioStyles: AspectRatioProps = {
  h: '80px',
  width: '80px',
  ratio: 1,
};

/**
 * @constant {SkeletonProps} $songCoverSkeletonStyles
 * @description SkeletonProps object that contains styles for the Skeleton component used in the SongCover.
 */
export const $songCoverSkeletonStyles = (isLoaded: boolean): SkeletonProps => ({
  startColor: 'heds.bg2',
  endColor: 'heds.400',
  isLoaded,
  fitContent: true,
  rounded: 'md',
});

/**
 * @constant {ImageProps} $songCoverImageStyles
 * @description ImageProps object that contains styles for the SongCover image component.
 */
export const $songCoverImageStyles: ImageProps = {
  h: '80px',
  rounded: 'md',
  objectFit: 'cover',
};

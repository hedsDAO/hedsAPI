import { AspectRatioProps, ImageProps, SkeletonProps } from '@chakra-ui/react';

interface ExtendedImageProps extends ImageProps {
  'data-testid'?: string;
}

interface ExtendedSkeletonProps extends SkeletonProps {
  'data-testid'?: string;
}

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
 * @constant {ExtendedSkeletonProps} $songCoverSkeletonStyles
 * @description SkeletonProps object that contains styles for the Skeleton component used in the SongCover.
 */
export const $songCoverSkeletonStyles = (isLoaded: boolean): ExtendedSkeletonProps => ({
  startColor: 'heds.bg2',
  endColor: 'heds.400',
  isLoaded,
  fitContent: true,
  rounded: 'md',
  "data-testid": 'ga-cover-image-skeleton'
});

/**
 * @constant {ImageProps} $songCoverImageStyles
 * @description ImageProps object that contains styles for the SongCover image component.
 */
export const $songCoverImageStyles: ExtendedImageProps = {
  h: '80px',
  rounded: 'md',
  objectFit: 'cover',
  "data-testid": 'ga-cover-image'
};

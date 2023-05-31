import { AspectRatioProps, BoxProps, GridItemProps, ImageProps, SimpleGridProps, SkeletonProps, TextProps } from '@chakra-ui/react';


interface ExtendedSimpleGridProps extends SimpleGridProps {
  'data-testid'?: string;
}

export const $simpleGridStyles: SimpleGridProps = {
  gap: { base: 3, lg: 5 },
  pt: { base: 6, lg: 12 },
  columns: { base: 2, lg: 4 },

};

export const $gridItemStyles: GridItemProps = {
  colSpan: 1,
};

export const $relatedBoxStyles: BoxProps = {
  pointerEvents: 'auto',
  role: 'button',
  border: 'solid 1px',
  _hover: { opacity: '75%', transition: 'opacity 0.35s ease-in-out' },
  borderColor: 'heds.100',
  rounded: 'md',
  px: 3,
  pt: 3,
  pb: 2,
  bg: 'heds.bg2',
};

export const $aspectRatioStyles: AspectRatioProps = {
  ratio: 1,
};

export const $skeletonStyles: SkeletonProps = {
  startColor: 'heds.bg3',
  endColor: 'heds.bg2',
};

export const $imageStyles: ImageProps = {
  border: 'solid 1px',
  borderColor: 'heds.100',
  rounded: 'lg',
};

export const $songTextStyles: TextProps = {
  letterSpacing: 'wide',
  fontWeight: 'medium',
  fontFamily: 'inter',
  mt: 2,
  minH: '2.5ch',
  color: 'white',
  opacity: '75%',
  fontSize: 'sm',
};

export const $placeholderBoxStyles: BoxProps = {
  border: 'solid 1px',
  borderColor: 'heds.100',
  rounded: 'md',
  px: 3,
  pt: 3,
  pb: 2,
  bg: 'heds.bg2',
};

export const $placeholderTextStyles: TextProps = {
  letterSpacing: 'wide',
  fontWeight: 'medium',
  fontFamily: 'inter',
  mt: 2,
  color: 'white',
  fontSize: 'sm',
  minH: '2.5ch',
  minW: '10ch',
};

export const $emptyRelatedGridItemStyles: GridItemProps = {
  colSpan: 1,
};

export const $emptyRelatedBoxStyles: BoxProps = {
  rounded: 'md',
  px: 3,
  pt: 3,
  pb: 2,
  bg: 'heds.bg3',
};

export const $paginationContainerStyles: GridItemProps = {
  colSpan: { base: 2, lg: 6 },
  mt: 4,
};

export const $loadingBoxStyles: BoxProps = {
  h: 'full',
  w: 'full',
  border: 'solid 1px',
  borderColor: 'heds.bg3',
  rounded: 'md',
};

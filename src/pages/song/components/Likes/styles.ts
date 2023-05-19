import { AspectRatioProps, BoxProps, GridItemProps, ImageProps, SkeletonProps, SimpleGridProps, TextProps } from '@chakra-ui/react';

interface ExtendedSimpleGridProps extends SimpleGridProps {
  'data-testid'?: string;
}

export const $likesGridStyles: ExtendedSimpleGridProps = {
  gap: { base: 3, lg: 5 },
  pt: { base: 6, lg: 12 },
  columns: { base: 2, lg: 6 },
  'data-testid': 'song-likes-grid',
};

export const $gridItemStyles: GridItemProps = {
  colSpan: 1,
};

export const $likesBoxStyles = (onClick: () => void, empty: boolean): BoxProps => ({
  onClick,
  border: empty ? '0px solid' : 'solid 1px',
  borderColor: 'heds.100',
  rounded: 'lg',
  px: 3,
  pt: 3,
  pb: 2,
  bg: 'heds.bg3',
});

export const $skeletonStyles: SkeletonProps = {
  bg: 'transparent',
  isLoaded: true,
};

export const $aspectRatioStyles: AspectRatioProps = {
  ratio: 1,
  width: '100%',
  height: '100%',
};

export const $imageStyles: ImageProps = {
  border: 'solid 1px',
  borderColor: 'heds.100',
  rounded: 'full',
};

export const $userTextStyles: TextProps = {
  letterSpacing: 'wide',
  fontWeight: 'medium',
  fontFamily: 'inter',
  mt: 2,
  minH: '2.5ch',
  color: 'white',
  fontSize: 'sm',
};

export const $placeholderBoxStyles: BoxProps = {
  rounded: 'md',
  px: 3,
  pt: 3,
  pb: 2,
  bg: 'heds.bg3',
  opacity: '30%',
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

export const $emptyBoxStyles: BoxProps = {
  h: 'full',
  w: 'full',
};

export const $emptyTextStyles: TextProps = {
  minH: '3ch',
}

export const $paginationContainerStyles: GridItemProps = {
  colSpan: { base: 2, lg: 6 },
  mt: 4,
};

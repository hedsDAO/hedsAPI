import { AspectRatioProps, BoxProps, GridItemProps, ImageProps, SimpleGridProps, SkeletonProps, TextProps } from '@chakra-ui/react';

export interface ExtendedGridItemProps extends GridItemProps {
  'data-testid'?: string;
}


export interface ExtendedImageProps extends ImageProps {
  'data-testid'?: string;
}

export const $appearsOnSimpleGridStyles: SimpleGridProps = {
  gap: { base: 3, lg: 5 },
  pt: { base: 6, lg: 12 },
  columns: { base: 2, lg: 6 },
};

export const $appearsOnGridItemStyles: ExtendedGridItemProps = {
  colSpan: 1,
  "data-testid": 'song-appears-on',
};

export const $appearsOnBoxStyles = (empty: boolean): BoxProps => ({
  border: 'solid 1px',
  borderColor: empty ? 'transparent' : 'heds.100',
  rounded: 'lg',
  px: 3,
  pt: 3,
  pb: 2,
  bg: 'heds.bg3',
});

export const $appearsOnAspectRatioStyles: AspectRatioProps = {
  ratio: 1,
};

export const $appearsOnImageStyles: ExtendedImageProps = {
  border: 'solid 1px',
  borderColor: 'heds.100',
  rounded: 'md',
  "data-testid": 'song-appears-on-image',
};

export const $appearsOnTextStyles: TextProps = {
  letterSpacing: 'wide',
  minH: '2.5ch',
  fontWeight: 'medium',
  fontFamily: 'inter',
  mt: 2,
  color: 'white',
  fontSize: 'sm',
};

export const $appearsOnSkeletonStyles: SkeletonProps = {
  minH: 'full',
  startColor: 'heds.bg2',
  endColor: 'heds.bg3',
  minW: 'full',
  rounded: 'md',
  fitContent: true,
};

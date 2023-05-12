import { BoxProps, FlexProps, GridProps, SimpleGridProps, SkeletonProps, StackProps, TextProps } from '@chakra-ui/react';

interface ExtendedSimpleGridProps extends SimpleGridProps {
  'data-testid'?: string;
}

interface ExtendedTextProps extends TextProps {
  'data-testid'?: string;
}
interface ExtendedGridProps extends GridProps {
  'data-testid'?: string;
}
interface ExtendedFlexProps extends FlexProps {
  'data-testid'?: string;
}

export const $simpleGridStyles: ExtendedSimpleGridProps = {
  columns: [1, 2, 3],
  spacing: 4,
  'data-testid': 'details-simple-grid',
};

export const $gridItemStyles: GridProps = {
  py: 2,
};

export const $stackStyles: StackProps = {
  px: 2,
};

export const $sectionTitleStyles = (dataTestId: string): ExtendedTextProps => ({
  textTransform: 'uppercase',
  fontFamily: 'karla',
  fontWeight: 'medium',
  letterSpacing: 'wide',
  color: 'white',
  opacity: '50%',
  fontSize: 'sm',
  mt: 5,
  mb: 2,
  'data-testid': dataTestId,
});

export const $stackInnerStyles: StackProps = {};

export const $skeletonSongEventStyles = (isLoading: boolean): SkeletonProps => ({
  isLoaded: !isLoading,
  bg: 'heds.bg3',
  rounded: 'lg',
  startColor: 'heds.bg3',
  endColor: 'heds.bg2',
  p: 1,
});

export const $skeletonEmptyEventStyles = (isLoading: boolean): SkeletonProps => ({
  isLoaded: !isLoading,
  rounded: 'lg',
  startColor: 'heds.bg2',
  endColor: 'heds.bg3',
  minW: 'full',
  h: '16',
});

export const $emptyEventStyles = (dataTestIdIndex: number): ExtendedFlexProps => ({
  borderRadius: 'lg',
  bg: 'heds.bg3',
  minH: 'full',
  opacity: '50%',
  'data-testid': `empty-event-${dataTestIdIndex}`
});

export const $attributesGridStyles: ExtendedGridProps = {
  templateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: 2,
  'data-testid': 'attributes-grid',
};

export const $skeletonAttributeStyles = (isLoading: boolean) => ({
  isLoaded: !isLoading,
  bg: 'heds.bg3',
  rounded: 'lg',
  startColor: 'heds.bg3',
  endColor: 'heds.bg2',
});

export const $skeletonAttributeEmptyStyles = (isLoading: boolean) => ({
  isLoaded: !isLoading,
  rounded: 'lg',
  bg: 'heds.bg3',
  opacity: '50%',
  startColor: 'heds.bg3',
  endColor: 'heds.bg2',
});

export const $attributeEmptyBoxStyles: BoxProps = {
  borderRadius: 'lg',
  bg: 'heds.bg2',
};

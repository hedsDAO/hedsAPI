import { GridItemProps, SimpleGridProps, StackProps, TextProps } from '@chakra-ui/react';

export const $statsSimpleGridStyles: SimpleGridProps = {
  gap: 2,
  columns: { base: 2, lg: 4 },
  my: { base: 10, lg: 16 },
  px: { base: 4, lg: 0 },
  maxW: { base: '100%', lg: '50vw' },
  mx: 'auto',
};

export const $statsGridItemStyles: GridItemProps = {
  colSpan: 1,
};

export const $statsStackStyles: StackProps = {
  flex: 1,
  alignItems: 'center',
  py: 2,
  px: 3.5,
  rounded: 'lg',
  bg: 'heds.bg3',
};

export const $statsLabelStyles: TextProps = {
  color: 'white',
  fontSize: 'l',
  letterSpacing: 'wide',
  fontFamily: 'karla',
};

export const $statsValueStyles: TextProps = {
  mt: '0 !important',
  color: 'heds.200',
  fontSize: 'm',
};

import { SimpleGridProps, GridItemProps, BoxProps, TextProps } from '@chakra-ui/react';

/**
 * @constant {GridItemProps} $mainContainerStyles
 * @description GridItemsProps object contains styles for the collections container.
 */
export const $mainContainerStyles: GridItemProps = {
  colSpan: 6,
};

/**
 * @constant {GridItemProps} $paginationContainerStyles
 * @description GridItemsProps object contains styles for the collections container.
 */
export const $paginationContainerStyles: GridItemProps = {
  colSpan: 6,
  mt: 4,
};

/**
 * @constant {SimpleGridProps} $collectionGridStyles
 * @description GridItemsProps object contains styles for the collections container.
 */
export const $collectionGridStyles: SimpleGridProps = {
  gap: 5,
  columns: { base: 2, md: 4, xl: 4 },
};

export const $emptyBoxStyles: BoxProps = {
  h: 'full',
  w: 'full',
};

export const $emptyTextStyles: TextProps = {
  minH: '3ch',
}

export const $gridItemStyles: GridItemProps = {
  colSpan: 1,
};

export const $emptyCollectionBoxStyles:BoxProps ={
  border: 'solid 1px',
  rounded: 'lg',
  px: 3,
  pt: 3,
  pb: 2,
  bg: 'heds.bg3',
};

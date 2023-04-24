import { SimpleGridProps, GridItemProps } from '@chakra-ui/react';

/**
 * @constant {GridItemProps} $mainContainerStyles
 * @description GridItemsProps object contains styles for the likes container.
 */
export const $mainContainerStyles: GridItemProps = {
  colSpan: 6,
};

/**
 * @constant {GridItemProps} $paginationContainerStyles
 * @description GridItemsProps object contains styles for the likes container.
 */
export const $paginationContainerStyles: GridItemProps = {
  colSpan: 6,
  mt: 4,
};

/**
 * @constant {SimpleGridProps} $likesGridStyles
 * @description GridItemsProps object contains styles for the likes container.
 */
export const $likesGridStyles: SimpleGridProps = {
  gap: 5,
  columns: { base: 2, md: 4, xl: 4 },
};

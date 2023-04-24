import { SimpleGridProps, GridItemProps } from '@chakra-ui/react';

/**
 * @constant {GridItemProps} $mainContainerStyles
 * @description GridItemsProps object contains styles for the discography container.
 */
export const $mainContainerStyles: GridItemProps = {
  colSpan: 6,
};

/**
 * @constant {GridItemProps} $paginationContainerStyles
 * @description GridItemsProps object contains styles for the discography container.
 */
export const $paginationContainerStyles: GridItemProps = {
  colSpan: 6,
  mt: 4,
};

/**
 * @constant {SimpleGridProps} $discographyGridStyles
 * @description GridItemsProps object contains styles for the discography container.
 */
export const $discographyGridStyles: SimpleGridProps = {
  gap: 5,
  columns: { base: 2, md: 4, xl: 4 },
};

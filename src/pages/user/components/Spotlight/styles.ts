import { SimpleGridProps, StackProps, ImageProps, TextProps, FlexProps, BoxProps, DividerProps, GridItemProps, Stack } from '@chakra-ui/react';

export interface ExtendedTextProps extends TextProps {
  'data-testid'?: string;
}

/**
 * @type {SimpleGridProps}
 * @description Styles for the spotlight SimpleGrid.
 */
export const $simpleGridStyles: SimpleGridProps = {
  px: 5,
  py: { base: 5, xl: 5 },
  columns: { base: 6, xl: 5 },
  gap: { base: 4, xl: 8 },
};

/**
 * @type {GridItemProps}
 * @description Styles for the grid item containing the spotlight cover image Stack.
 */
export const $gridItemStackStyles: GridItemProps = {
  as: Stack,
  justifyContent: 'center',
  colSpan: { base: 2, xl: 1 },
};

/**
 * @type {ImageProps}
 * @description Styles for the spotlight cover Image.
 */
export const $imageStyles: ImageProps = {
  alt: 'spotlight cover',
  border: 'solid 1px',
  borderColor: 'heds.100',
  shadow: 'md',
  rounded: 'lg',
  objectFit: 'cover',
};

/**
 * @type {GridItemProps}
 * @description Styles for the grid item containing the text elements.
 */
export const $gridItemTextStyles: GridItemProps = {
  colSpan: { base: 4, xl: 3 },
};

/**
 * @type {TextProps}
 * @description Styles for the 'TRACK' Text element.
 */
export const $trackTextStyles: TextProps = {
  mt: '0 !important',
  fontSize: { base: '2xs', xl: 'xs' },
  fontFamily: 'karla',
  fontWeight: 'bold',
  opacity: '40%',
  color: 'white',
};

/**
 * @type {ExtendedTextProps}
 * @description Styles for the submission data Text element.
 */
export const $submissionTextStyles: ExtendedTextProps = {
  'data-testid': 'spotlight-track-name',
  letterSpacing: 'wide',
  fontFamily: 'inter',
  mt: '-1 !important',
  color: 'white',
  fontSize: { base: 'sm', md: 'md', xl: 'md' },
};

/**
 * @type {DividerProps}
 * @description Styles for the Divider element.
 */
export const $dividerStyles: DividerProps = {
  opacity: '30%',
  maxW: { base: '24', xl: '52' },
  w: 'full',
  borderColor: 'heds.100',
};

/**
 * @type {TextProps}
 * @description Styles for the 'ARTIST' Text element.
 */
export const $artistTextStyles: TextProps = {
  fontSize: { base: '2xs', xl: 'xs' },
  fontFamily: 'karla',
  fontWeight: 'bold',
  opacity: '40%',
  color: 'white',
};

/**
 * @type {ExtendedTextProps}
 * @description Styles for the artist name Text element.
 */
export const $artistNameTextStyles: ExtendedTextProps = {
  'data-testid': 'spotlight-artist-name',
  opacity: '80%',
  letterSpacing: 'wide',
  fontFamily: 'inter',
  mt: '-1 !important',
  color: 'white',
  fontSize: { base: 'sm', md: 'md', xl: 'md' },
};

/**
 * @type {StackProps}
 * @description Styles for the details Stack element.
 */
export const $detailsStackStyles: StackProps = {
  ml: { base: 3, md: 10, lg: 5, xl: 0 },
  h: 'full',
  justifyContent: 'center',
};

/**
 * @type {FlexProps}
 * @description Styles for the Flex element containing artist name and icons.
 */
export const $flexStyles: FlexProps = {
  alignItems: 'center',
  justifyContent: 'space-between',
};

/**
 * @type {FlexProps}
 * @description Styles for the Flex element containing icons for smaller screens.
 */
export const $flexIconsStyles: FlexProps = {
  display: { base: 'flex', xl: 'none' },
  gap: 2.5,
  justifyContent: 'end',
};

/**
 * @type {BoxProps}
 * @description Styles for the play-circle icon Box element.
 */
export const $playCircleIconStyles: BoxProps = {
  as: 'i',
  className: 'fa-solid fa-play-circle',
  color: 'heds.200',
  fontSize: '2xl',
};

/**
 * @type {BoxProps}
 * @description Styles for the heart icon Box element.
 */
export const $heartIconStyles: BoxProps = {
  as: 'i',
  className: 'fa-solid fa-heart',
  color: 'heds.100',
  opacity: '40%',
  fontSize: '2xl',
};

/**
 * @type {GridItemProps}
 * @description Styles for the grid item containing icons for larger screens.
 */
export const $gridItemIconStyles: GridItemProps = {
  display: { base: 'none', xl: 'flex' },
  h: 'full',
  colSpan: 1,
};

/**
 * @type {FlexProps}
 * @description Styles for the Flex element containing icons for larger screens.
 */
export const $flexIconLargeStyles: FlexProps = {
  h: 'full',
  alignItems: 'center',
};

/**
 * @type {BoxProps}
 * @description Styles for the play-circle icon Box element for larger screens.
 */
export const $playCircleIconLargeStyles: BoxProps = {
  as: 'i',
  className: 'fa-solid fa-play-circle',
  color: 'heds.200',
  fontSize: '4xl',
};

/**
 * @type {BoxProps}
 * @description Styles for the heart icon Box element for larger screens.
 */
export const $heartIconLargeStyles: BoxProps = {
  as: 'i',
  className: 'fa-solid fa-heart',
  color: 'heds.100',
  opacity: '40%',
  fontSize: '4xl',
  ml: 5,
};

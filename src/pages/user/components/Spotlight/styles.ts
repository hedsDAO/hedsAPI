import { SimpleGridProps, StackProps, ImageProps, TextProps, FlexProps, BoxProps, DividerProps, GridItemProps, Stack, ButtonProps } from '@chakra-ui/react';

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
  border: 'solid 1px',
  borderColor: 'heds.bg2',
  rounded: 'lg',
  opacity: '70%', // temp: remove when spotlight functionality is added
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
  borderColor: 'heds.bg2',
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
 * @name TEMP_HEADER_STYLES
 * @description Temporary styles for the header Text elements. remove when spotlight functionality is added.
 */

const TEMP_HEADER_STYLES = { fontSize: { base: 'md', lg: 'lg !important' }, mb: { base: '-4 !important', lg: '0 !important' }, mt: { lg: '-1 !important' } };

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
  ...TEMP_HEADER_STYLES, // remove when spotlight functionality is added
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
  fontWeight: 'medium',
  opacity: '40%',
  color: 'white',
  mt: '0 !important',
};

/**
 * @type {ExtendedTextProps}
 * @description Styles for the artist name Text element.
 */
export const $artistNameTextStyles: ExtendedTextProps = {
  'data-testid': 'spotlight-artist-name',
  opacity: '70%',
  letterSpacing: 'wide',
  fontFamily: 'inter',
  mt: '-1 !important',
  color: 'white',
  fontSize: { base: 'xs', md: 'sm', xl: 'sm' },
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
  gap: 1,
  justifyContent: 'end',
};

/**
 * @type {ButtonProps}
 * @description Styles for the pen-circle icon Box element.
 */
export const $penCircleIconStyles: ButtonProps = {
  as: 'i',
  className: 'fa-solid fa-pen-circle',
  color: 'heds.200',
  fontSize: '2xl',
  px: '0',
  py: '0',
  isDisabled: true,
  backgroundColor: 'transparent',
  _hover: { bg: 'transparent' },
  minH: 'unset !important',
};

/**
 * @type {ButtonProps}
 * @description Styles for the play-circle icon Box element.
 */
export const $playCircleIconStyles: ButtonProps = {
  as: 'i',
  className: 'fa-solid fa-play-circle',
  color: 'heds.200',
  fontSize: '2xl',
  px: '0',
  py: '0',
  isDisabled: true,
  backgroundColor: 'transparent',
  _hover: { bg: 'transparent' },
  minH: 'unset !important',
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
  w: 'full',
  pr: 3,
  alignItems: 'center',
  justifyContent: 'end',
};

/**
 * @type {ButtonProps}
 * @description Styles for the play-circle icon Box element for larger screens.
 */
export const $penCircleIconLargeStyles: ButtonProps = {
  as: 'i',
  className: 'fa-solid fa-pen-circle',
  color: 'heds.200',
  fontSize: '4xl',
  px: '0',
  py: '0',
  backgroundColor: 'transparent',
  _hover: { bg: 'transparent' },
};

/**
 * @type {ButtonProps}
 * @description Styles for the play-circle icon Box element for larger screens.
 */
export const $playCircleIconLargeStyles: ButtonProps = {
  as: 'i',
  className: 'fa-solid fa-play-circle',
  color: 'heds.200',
  fontSize: '4xl',
  px: '0',
  ml: 2,
  py: '0',
  isDisabled: true,
  backgroundColor: 'transparent',
  _hover: { bg: 'transparent' },
};

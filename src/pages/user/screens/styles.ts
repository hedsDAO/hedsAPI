import { FlexProps, StackProps, GridProps, GridItemProps, Stack } from '@chakra-ui/react';

/**
 * @constant {FlexProps} $flexStyles
 * @description FlexProps object that contains styles for the Flex component used in
 * the User component for the top half of the page.
 */

export const $flexStyles: FlexProps = {
  justifyContent: { base: 'center', lg: 'space-between' },
  alignItems: { base: 'end', lg: 'baseline' },
  direction: { base: 'column', lg: 'row' },
  maxW: { base: 'full', lg: '3xl', xl: '6xl' },
  mt: 3,
  mx: 'auto',
};

/**
 * @constant {StackProps} $stackStyles
 * @description StackProps object that contains styles for the Stack component used
 * to wrap the user picture and details.
 */

export const $stackStyles: StackProps = {
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: { base: 'center', lg: 'start' },
  direction: { base: 'column', lg: 'row' },
  gap: { base: 2, lg: 6 },
};

/**
 * @constant {GridProps} $gridStyles
 * @description GridProps object that contains styles for the Grid component used for
 * displaying the user's collection, likes, and discography.
 */

export const $gridStyles: GridProps = {
  mt: { base: 56, lg: 20, xl: 20 },
  maxW: { base: 'full', xl: '6xl' },
  px: { base: 4, md: 10, lg: 20, xl: 0 },
  templateColumns: 'repeat(6, 1fr)',
  mx: 'auto',
  gap: 5,
};

/**
 * @constant {GridItemProps} $spotlightItemStyles
 * @description Spotlight grid item styles
 */

export const $spotlightItemStyles: GridItemProps = {
  rounded: 'lg',
  bg: 'heds.bg3',
  colSpan: { base: 6, xl: 4 },
};

/**
 * @constant {GridItemProps} $recentEventsItemStyles
 * @description Recent Events grid item styles
 */

export const $recentEventsItemStyles: GridItemProps = {
  rounded: 'lg',
  p: 3,
  as: Stack,
  bg: 'heds.bg3',
  colSpan: { base: 6, xl: 2 },
};

/**
 * @constant {GridItemProps} $navItemStyles
 * @description User nav grid item styles
 */

export const $navItemStyles: GridItemProps = {
  colSpan: 6,
  justifyContent: 'space-between',
  alignItems: 'center'
};

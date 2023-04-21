import { FlexProps, StackProps, GridProps } from '@chakra-ui/react';

/**
 * @constant {FlexProps} FlexStyles
 * @description FlexProps object that contains styles for the Flex component used in
 * the User component for the top half of the page.
 */

export const FlexStyles: FlexProps = {
  justifyContent: { base: 'center', lg: 'space-between' },
  alignItems: { base: 'end', lg: 'baseline' },
  direction: { base: 'column', lg: 'row' },
  maxW: { base: 'full', lg: '3xl', xl: '6xl' },
  mt: 3,
  mx: 'auto',
};

/**
 * @constant {StackProps} StackStyles
 * @description StackProps object that contains styles for the Stack component used
 * to wrap the user picture and details.
 */

export const StackStyles: StackProps = {
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: { base: 'center', lg: 'start' },
  direction: { base: 'column', lg: 'row' },
  gap: { base: 2, lg: 6 },
};

/**
 * @constant {GridProps} GridStyles
 * @description GridProps object that contains styles for the Grid component used for
 * displaying the user's collection, likes, and discography.
 */

export const GridStyles: GridProps = {
  mt: { base: 56, lg: 20, xl: 20 },
  maxW: { base: 'full', xl: '6xl' },
  px: { base: 4, md: 10, lg: 20, xl: 0 },
  templateColumns: 'repeat(6, 1fr)',
  mx: 'auto',
  gap: 5,
};

/**
 * @constant {string[]} USER_NAV_TABS
 * @description Array of strings that contains the names of the tabs used in
 * the User component.
 */

export const USER_NAV_TABS: string[] = ['Collection', 'Likes', 'Discography'];

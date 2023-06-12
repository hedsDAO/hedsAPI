import { DrawerProps, IconButtonProps, StackProps, TextProps, FlexProps, ModalBodyProps, ModalOverlayProps } from '@chakra-ui/react';

/**
 * @type {DrawerProps}
 * @description Styles for the Drawer component.
 **/
export const $drawerStyles: Partial<DrawerProps> = {
  size: 'full',
  placement: 'right',
};

/**
 * @type {ModalOverlayProps}
 * @description Styles for the DrawerOverlay component.
 */

export const $drawerOverlayStyles: ModalOverlayProps = {
  bg: 'heds.bg3',
};

/**
 * @type {ModalBodyProps}
 * @description Styles for the DrawerBody component.
 **/
export const $drawerBodyStyles: ModalBodyProps = {
  mt: 4,
};

/**
 * @type {FlexProps}
 * @description Styles for the Flex component.
 **/
export const $flexStyles: FlexProps = {
  gap: 2,
};

/**
 * @type {IconButtonProps}
 * @description Styles for the IconButton component.
 **/
export const $iconButtonStyles: IconButtonProps = {
  bg: 'heds.bg2',
  color: 'white',
  size: 'sm',
  'aria-label': 'close search',
};

/**
 * @type {StackProps}
 * @description Styles for the Stack component.
 **/
export const $stackStyles: StackProps = {
  pt: 5,
  pb: 4,
  justifyContent: 'center',
};

/**
 * @type {TextProps}
 * @description Styles for the Text component.
 **/
export const $textStyles: TextProps = {
  fontFamily: 'space',
  color: 'white',
  opacity: 0.8,
  fontSize: '2xs',
  px: 2,
};

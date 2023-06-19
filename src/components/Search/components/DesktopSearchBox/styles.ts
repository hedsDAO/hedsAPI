// styles.ts
import { ModalProps, ModalOverlayProps, ModalContentProps, ModalBodyProps, TextProps } from '@chakra-ui/react';

/**
 * @constant
 * @description Style properties for the search modal
 * @type {ModalProps}
 */
export const modalStyles: Partial<ModalProps> = {
  trapFocus: false,
  size: '3xl',
};

/**
 * @constant
 * @description Style properties for the search modal overlay
 * @type {ModalOverlayProps}
 */
export const modalOverlayStyles: ModalOverlayProps = {
  bg: 'transparent',
  opacity: 0,
};

/**
 * @constant
 * @description Style properties for the content in the search modal
 * @type {ModalContentProps}
 */
export const modalContentStyles: ModalContentProps = {
  pb: 3,
  pt: 2,
  bg: 'heds.bg2',
};

/**
 * @constant
 * @description Style properties for the modal body when there are no search results
 * @type {ModalBodyProps}
 */
export const modalBodyEmptyStyles: ModalBodyProps = {
  pt: 5,
  pb: 4,
  justifyContent: 'center',
};

/**
 * @constant
 * @description Style properties for the text in the search modal
 * @type {TextProps}
 */
export const textStyles: TextProps = {
  fontFamily: 'space',
  color: 'white',
  opacity: 0.8,
  fontSize: '2xs',
  px: 2,
};

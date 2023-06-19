import { ModalProps, ModalContentProps, ModalHeaderProps, TextProps, ModalCloseButtonProps, ModalBodyProps, ModalOverlayProps } from '@chakra-ui/react';

/**
 * @constant
 * @description Style properties for the Modal component
 * @type {ModalProps}
 */
export const $modalStyles: Partial<ModalProps> = {
  size: 'md',
  motionPreset: 'slideInBottom',
  isCentered: true,
};

/**
 * @constant
 * @description Style properties for the ModalOverlay component
 * @type {ModalOverlayProps}
 */

export const $modalOverlayStyles: ModalOverlayProps = {
  bg: 'heds.bg',
};

/**
 * @constant
 * @description Style properties for the ModalContent component
 * @type {ModalContentProps}
 */
export const $modalContentStyles: ModalContentProps = {
  rounded: '2xl',
  bg: 'heds.bg4',
  m: 1,
  p: 1.5,
};

/**
 * @constant
 * @description Style properties for the ModalHeader component
 * @type {ModalHeaderProps}
 */
export const $modalHeaderStyles: ModalHeaderProps = {
  fontSize: 'md',
};

/**
 * @constant
 * @description Style properties for the Text component
 * @type {TextProps}
 */
export const $textStyles: TextProps = {
  color: 'heds.100',
  fontFamily: 'poppins',
  fontWeight: 'bold',
  letterSpacing: 'widest',
};

/**
 * @constant
 * @description Style properties for the ModalCloseButton component
 * @type {ModalCloseButtonProps}
 */
export const $modalCloseButtonStyles: ModalCloseButtonProps = {
  m: 2,
  color: 'white',
};

/**
 * @constant
 * @description Style properties for the ModalBody component
 * @type {ModalBodyProps}
 */
export const $modalBodyStyles: ModalBodyProps = {
  gap: 8,
  pb: 5,
};

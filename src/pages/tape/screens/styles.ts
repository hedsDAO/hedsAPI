import { DividerProps, ImageProps, StackProps } from '@chakra-ui/react';

/**
 * @constant {StackProps} $tapeStackStyles
 * @description StackProps object contains styles for the Tape component container.
 */
export const $tapeStackStyles: StackProps = {
  pt: { base: 2, lg: 12 },
  mx: { base: 2, lg: 8 },
  px: ['20px', '60px', '100px', '120px'],
  spacing: ['30px', '80px'],
  direction: { base: 'column', lg: 'row' },
};

/**
 * @constant {ImageProps} $tapeImageStyles
 * @description ImageProps object contains styles for the tape cover image.
 */
export const $tapeImageStyles: ImageProps = {
  boxSize: ['xs', 'sm', 'md'],
  border: '1px',
  borderColor: 'heds.400',
};

/**
 * @constant {DividerProps} $tapeDividerStyles
 * @description DividerProps object contains styles for the Divider component.
 */
export const $tapeDividerStyles: DividerProps = {
  orientation: 'horizontal',
  py: 8,
};

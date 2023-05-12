import { ButtonProps, StackProps, TextProps } from '@chakra-ui/react';

/**
 * @constant {StackProps} $timelineButtonsStackStyles
 * @description StackProps object contains styles for the TimelineButtons component container.
 */
export const $timelineButtonsStackStyles: StackProps = {
  justifyContent: ['flex-start', 'center'],
  alignItems: 'flex-start',
};

/**
 * @constant {TextProps} $cycleNameTextStyles
 * @description TextProps object contains styles for the cycle name text.
 */
export const $cycleNameTextStyles: TextProps = {
  color: 'heds.100',
  fontFamily: 'sans-serif',
};

/**
 * @constant {TextProps} $cycleTimeTextStyles
 * @description TextProps object contains styles for the cycle time text.
 */
export const $cycleTimeTextStyles: TextProps = {
  color: 'white.pure',
  fontFamily: 'sans-serif',
  fontSize: 'xs',
};

/**
 * @constant {ButtonProps} $buttonStyles
 * @description ButtonProps object contains styles for all 3 buttons.
 */
export const $buttonStyles: ButtonProps = {
  bgColor: 'heds.700',
  color: 'white.pure',
  fontFamily: 'sans-serif',
  fontWeight: 'light',
  fontSize: 'xs',
  _hover: { bgColor: 'purple.200' },
};

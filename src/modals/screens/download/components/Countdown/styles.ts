import { StackProps, TextProps } from '@chakra-ui/react';

/**
 * @constant {StackProps} $countdownStackStyles
 * @description StackProps object contains styles for the Countdown component container.
 */
export const $countdownStackStyles: StackProps = {
  spacing: 4,
  justifyContent: 'center',
};

/**
 * @constant {TextProps} $countdownBigTextStyles
 * @description TextProps object contains styles for the larger text elements in Countdown component.
 */
export const $countdownBigTextStyles: TextProps = {
  fontSize: '2xl',
  fontFamily: 'space',
  color: 'heds.200',
  letterSpacing: 'wide',
};

/**
 * @constant {TextProps} $countdownSmallTextStyles
 * @description TextProps object contains styles for the smaller text elements in Countdown component.
 */
export const $countdownSmallTextStyles: TextProps = {
  fontFamily: 'inter',
  fontWeight: '400',
  color: 'white.off',
};

import { BoxProps, ButtonProps, Flex, FlexProps, GridItemProps, SimpleGridProps, WithCSSVar } from '@chakra-ui/react';
import { Transition } from 'framer-motion';

/**
 * @constant {ButtonProps} $globalAudioTestButtonStyles
 * @description ButtonProps object for the test button in the GlobalAudio component.
 */
export const $globalAudioTestButtonStyles: ButtonProps = {
  mb: -20,
};

/**
 * @constant {BoxProps} $globalAudioContainerStyles
 * @description BoxProps object for the container of the GlobalAudio component.
 */
export const $globalAudioContainerStyles: BoxProps = {
  minH: '100px',
  position: 'fixed',
  bottom: 0,
  left: 0,
  maxH: '100px',
  zIndex: 50,
  mx: 4,
};

/**
 * @constant {SimpleGridProps} $globalAudioSimpleGridStyles
 * @description SimpleGridProps object for the grid layout of the GlobalAudio component.
 */
export const $globalAudioSimpleGridStyles: SimpleGridProps = {
  gap: 4,
  columns: 6,
  display: {base: 'none', lg: 'grid'}
};

/**
 * @constant {FlexProps} $globalAudioFlexStyles
 * @description FlexProps object for the Flex components in the GlobalAudio component.
 */
export const $globalAudioFlexStyles: FlexProps = {
  alignItems: 'center',
};

/**
 * @constant {GridItemProps} $globalAudioGridItemStyles
 * @description GridItemProps object for the GridItem components in the GlobalAudio component.
 */
export const $globalAudioGridItemStyles: GridItemProps = {
  as: Flex,
  alignItems: 'center',
  ml: 3,
  gap: 1,
  colSpan: 4,
};

/**
 * @function $getMotionBoxTransition
 * @description Function that returns an object for the MotionBox transition in the GlobalAudio component.
 * @returns {Transition} The transition settings for the MotionBox.
 */
export function $getMotionBoxTransition(): Transition {
  return {
    type: 'spring',
    stiffness: 100,
    damping: 20,
  };
}

export const $getBoxControlsAnimation = (isOpen: boolean, theme: WithCSSVar<any>) => ({
  y: isOpen ? '-20%' : '100%',
  opacity: isOpen ? 1 : 0,
  background: theme.colors.heds.bg4,
  borderRadius: '0.5rem',
});

export const $getBoxControlFirstMountAnimation = (theme: WithCSSVar<any>) => ({
  display: 'none',
  opacity: 0,
  background: theme.colors.heds.bg4,
  borderRadius: '0.5rem',
});

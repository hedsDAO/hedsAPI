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
export const $globalAudioSimpleGridStyles = (isMinimized: boolean): SimpleGridProps => ({
  gap: 4,
  columns: isMinimized ? 1 : 6,
  display: { base: 'none', lg: 'grid' },
});

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

/**
 * @constant {FlexProps} $minimizeFlexStyles
 * @description FlexProps object for the Flex components that wraps the MinimizeButton and CloseButton in the GlobalAudio component.
 */
export const $minimizeFlexStyles: FlexProps = {
  alignItems: 'center',
  justifyContent: 'end',
};

/**
 * @constant {GridItemProps} $songCoverGridItemStyles
 * @description GridItemProps object for the GridItem component that wraps the SongCover in the GlobalAudio component.
 */
export const $songCoverGridItemStyles: GridItemProps = {
  as: Flex,
  alignItems: 'center',
  m: 1.5,
  colSpan: 1,
};

/**
 * @constant {GridItemProps} $songDetailsGridItemStyles
 * @description GridItemProps object for the GridItem component that wraps the SongDetails in the GlobalAudio component.
 */
export const $songDetailsGridItemStyles: GridItemProps = {
  as: Flex,
  alignItems: 'center',
  colSpan: 2,
};

/**
 * @constant {GridItemProps} $playerButtonsGridItemStyles
 * @description GridItemProps object for the GridItem component that wraps the PlayerButtons in the GlobalAudio component.
 */
export const $playerButtonsGridItemStyles: GridItemProps = {
  as: Flex,
  alignItems: 'center',
  colSpan: 1,
};

/**
 * @constant {GridItemProps} $likeButtonGridItemStyles
 * @description GridItemProps object for the GridItem component that wraps the LikeButton and VolumeControl in the GlobalAudio component.
 */
export const $likeButtonGridItemStyles: GridItemProps = {
  ml: { base: 4, lg: 2 },
  gap: 1,
  as: Flex,
  alignItems: 'center',
  colSpan: 2,
};

/**
 * @constant {FlexProps} $bottomFlexStyles
 * @description FlexProps object for the Flex component at the bottom of the GlobalAudio component.
 */
export const $bottomFlexStyles = (isMinimized: boolean): FlexProps => ({
  width: { base: isMinimized ? 'auto' : '92vw', lg: 'unset' },
  display: { base: 'flex', lg: 'none' },
  p: 2,
  gap: 2,
  alignItems: 'center',
});

/**
 * @constant {FlexProps} $progressBarFlexStyles
 * @description FlexProps object for the Flex component that wraps the ProgressBar in the GlobalAudio component.
 */
export const $progressBarFlexStyles: FlexProps = {
  minW: '100%',
};

/**
 * @constant {BoxProps} $waveformBoxStyles
 * @description BoxProps object for the Box component that wraps the Waveform in the GlobalAudio component.
 */
export const $waveformBoxStyles: BoxProps = {
  display: 'none',
};

/**
 * @constant {FlexProps} $mobileDetailsFlexStyles
 * @description FlexProps object for the Flex component that wraps the SongCover and SongDetails in the GlobalAudio component on mobile.
 */

export const $mobileDetailsFlexStyles: FlexProps = {
  px: 4,
  gap: 3,
  alignItems: 'center',
};

export const $getBoxControlsAnimation = (isOpen: boolean, theme: WithCSSVar<any>) => ({
  y: isOpen ? '-20%' : '100%',
  opacity: isOpen ? 1 : 0,
  background: theme.colors.heds.bg4,
  borderRadius: '0.5rem',
});

export const $getMinimizeControlAnimation = (isMinimized: boolean, theme: WithCSSVar<any>) => ({});

export const $getBoxControlFirstMountAnimation = (theme: WithCSSVar<any>) => ({
  display: 'none',
  opacity: 0,
  background: theme.colors.heds.bg4,
  borderRadius: '0.5rem',
});

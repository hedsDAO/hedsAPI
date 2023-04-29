import { BoxProps, FlexProps, SliderProps, SliderTrackProps, SliderThumbProps, TextProps, SliderInnerTrackProps } from '@chakra-ui/react';
import { Variants } from 'framer-motion';

/**
 * @constant {TextProps} $volumeIconTextStyles
 * @description TextProps object that contains styles for the volume icon in the VolumeControl component.
 */
export const $volumeIconTextStyles = (onClick: () => void, volume: number, isMuted: boolean): TextProps => ({
  onClick,
  role: 'button',
  minW: '22px',
  pointerEvents: 'auto',
  mt: '5px !important',
  fontSize: 'md',
  as: 'i',
  mr: '-2px !important',
  color: 'white',
  className: volume === 0 || isMuted ? 'fas fa-volume-xmark' : 'fa-solid fa-volume',
});

/**
 * @constant {Variants} $volumeBoxAnimation
 * @description Variants object that contains animation variants for the volume box in the VolumeControl component.
 */
export const $volumeBoxAnimation: Variants = {
  visible: {
    opacity: 1,
    width: '100%',
    transition: { duration: 0.35 },
  },
  hidden: {
    opacity: 0,
    width: '0px',
    transition: { duration: 0.35 },
  },
};

/**
 * @constant {FlexProps} $volumeControlFlexStyles
 * @description FlexProps object for the container of the VolumeControl component.
 */
export const $volumeControlFlexStyles: FlexProps ={
  gap: 1,
  alignContent: 'center',
  w: 'full',
  mr: 10,
};

/**
 * @constant {TextProps} $volumeControlTextStyles
 * @description TextProps object for the volume control text in the VolumeControl component.
 */
export const $volumeControlTextStyles: TextProps = {
  minW: '22px',
  pointerEvents: 'auto',
  role: 'button',
  mt: '5px !important',
  fontSize: 'md',
  as: 'i',
  mr: '-2px !important',
  color: 'white',
};

/**
 * @constant {BoxProps} $volumeControlMotionBoxStyles
 * @description BoxProps object for the motion box containing the slider in the VolumeControl component.
 */

export const $volumeControlMotionBoxStyles: BoxProps = {
  ml: 1,
  mt: '-1 !important',
};

/**
 * @constant {SliderProps} $volumeControlSliderStyles
 * @description SliderProps object for the volume control slider in the VolumeControl component.
 */
export const $volumeControlSliderStyles = (value: number, defaultValue: number, onChange: (e: number) => void): SliderProps => ({
  value,
  defaultValue,
  onChange,
  size: 'sm',
  ml: 1,
  mt: '-1 !important',
});

/**
 * @constant {SliderTrackProps} $volumeControlSliderTrackStyles
 * @description SliderTrackProps object for the track of the volume control slider in the VolumeControl component.
 */
export const $volumeControlSliderTrackStyles: SliderTrackProps = {
  bg: 'heds.500',
};

/**
 * @constant {SliderInnerTrackProps} $volumeControlSliderFilledTrackStyles
 * @description SliderInnerTrackProps object for the filled track of the volume control slider in the VolumeControl component.
 */
export const $volumeControlSliderFilledTrackStyles: SliderInnerTrackProps = {
  bg: 'heds.100',
};

/**
 * @constant {SliderThumbProps} $volumeControlSliderThumbStyles
 * @description SliderThumbProps object for the thumb of the volume control slider in the VolumeControl component.
 */
export const $volumeControlSliderThumbStyles: SliderThumbProps = {
  _focus: {
    boxShadow: 'none',
    outlineColor: 'transparent',
  },
};

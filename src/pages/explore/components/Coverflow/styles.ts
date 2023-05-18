import { BoxProps, CenterProps, ImageProps } from '@chakra-ui/react';
import { MotionProps } from 'framer-motion';

export const $coverflowCenterStyles: CenterProps = {
  mt: { base: 5, lg: -10 },
  mb: { base: 20, lg: 20 },
  maxW: '100vw',
  overflow: 'hidden',
  position: 'relative',
  style: { perspective: 1000 },
};

export const $coverflowFlexStyles: BoxProps = {
  w: 'full',
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
};

export const $coverflowNavMotionBoxStyles: BoxProps = {
  position: 'absolute',
  p: 4,
  cursor: 'pointer',
  fontSize: '2xl',
  zIndex: '1',
  color: 'white',
};

export const $coverflowImageBoxOverflowStyles: BoxProps = {
  overflow: 'hidden',
};

export const $coverflowImageStyles = (size: number): ImageProps => ({
  draggable: false,
  objectFit: 'cover',
  rounded: 'lg',
  height: size,
  width: size,
});

export const $coverflowImageMotionBoxStyles = (imageSize: number, offset: number): MotionProps & BoxProps => ({
  width: imageSize,
  height: imageSize,
  position: 'absolute',
  shadow: 'md',
  zIndex: calculateZIndex(offset),
  initial: { x: offset * 200 },
  animate: {
    x: offset === 0 ? 0 : Math.abs(offset) === 1 ? offset * 250 : offset * 200,
    y: -0.5 * Math.abs(5 * offset),
    scale: offset === 0 ? 1.3 : 1 - 0.05 * Math.abs(offset),
    rotateY: offset === 0 ? 0 : offset * 10,
    skewY: offset === 0 ? 0 : offset * 0.25,
    transition: { type: 'spring', damping: 20, stiffness: 200 },
  },
  drag: 'x',
  dragConstraints: { left: 0, right: 0 },
  dragElastic: 0.35,
  onClick: offset === 0 ? () => {} : undefined, // we'll handle onClick in the component itself
});

export const $coverflowImageBoxStyles: BoxProps = {
  position: 'relative',
};

export const coverflowImageReflectionBoxAfterStyles = (src: string, offset: number): BoxProps => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  width: '100%',
  height: '100%',
  _after: {
    rounded: 'lg',
    content: '""',
    zIndex: calculateZIndex(offset),
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${src})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    transform: 'scaleY(-1)',
    opacity: offset === 0 ? '20%' : `${2 * (1 / Math.abs(offset))}%`,
  },
});

// Util function to calculate ZIndex
export const calculateZIndex = (offset: number) => (offset === 0 ? 2 : -Math.abs(offset) + 1);

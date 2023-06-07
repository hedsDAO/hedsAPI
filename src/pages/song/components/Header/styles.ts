import {
  AvatarProps,
  BoxProps,
  ImageProps,
  SkeletonProps,
  ButtonProps,
  DividerProps,
  FlexProps,
  GridItemProps,
  SimpleGridProps,
  StackProps,
  TextProps,
  Flex,
  StyleProps,
} from '@chakra-ui/react';

interface ExtendedButtonProps extends ButtonProps {
  'data-testid'?: string;
}

export const $outerBoxStyles: BoxProps = {
  pos: 'relative',
};

export const $innerBoxStyles: BoxProps = {
  display: { base: 'block', lg: 'none' },
};

export const $skeletonStyles = (hasLargeCoverLoaded: boolean, isLoading: boolean): SkeletonProps => ({
  fitContent: true,
  startColor: 'heds.bg2',
  endColor: 'heds.bg3',
  isLoaded: hasLargeCoverLoaded || isLoading,
});

export const $imageStyles = (cover: string, onLoad: () => void): ImageProps => ({
  onLoad,
  opacity: 0,
  borderRadius: '0',
  src: cover,
  w: '100%',
  h: '100%',
});

export const $absoluteBoxStyles: BoxProps = {
  position: 'absolute',
  top: 4,
  right: 4,
};

export const $relativeBoxStyles: BoxProps = {
  position: 'relative',
  top: '50%',
  right: '50%',
};

export const $smallSkeletonStyles = (hasSmallCoverLoaded: boolean): SkeletonProps => ({
  isLoaded: hasSmallCoverLoaded,
  w: '16',
  h: '16',
});

export const $avatarStyles = (subCover: string, onLoad: () => void): AvatarProps => ({
  onLoad,
  size: 'lg',
  position: 'absolute',
  shadow: 'md',
  borderRadius: 'md',
  src: subCover,
});

export const $simpleGridStyles: SimpleGridProps = {
  columns: { base: 1, lg: 10 },
};

export const $gridItemStyles: GridItemProps = {
  w: 'full',
  as: Flex,
  gap: 7,
  alignItems: 'center',
  position: { base: 'absolute', lg: 'static' },
  bottom: { base: 32, lg: 'auto' },
  left: { base: 0, lg: 'auto' },
  zIndex: 1,
};

export const $playPauseButtonStyles = (isLoading: boolean, handlePlayPause: () => void): ExtendedButtonProps => ({
  isDisabled: isLoading,
  onClick: () => {
    handlePlayPause();
  },
  _hover: { bg: 'heds.bg5', opacity: '80%' },
  bg: 'heds.bg5',
  py: '8',
  px: '6',
  minW: '16',
  maxW: '16',
  mb: { base: 4, lg: 0 },
  ml: { base: 6, lg: 32 },
  'data-testid': 'song-play-pause-button',
});

export const $artistTextStyles: TextProps = {
  fontFamily: 'inter',
  fontSize: { base: 'xs', lg: 'sm' },
  color: 'white',
  fontWeight: 'medium',
  letterSpacing: 'wide',
};

export const $dividerStyles: DividerProps = {
  border: '1px',
  my: '0.5 !important',
  color: 'heds.bg5',
};

export const $songNameTextStyles: TextProps = {
  fontFamily: 'inter',
  fontWeight: 'bold',
  letterSpacing: 'wide',
  mt: '-1 !important',
  fontSize: { base: 'lg', lg: '3xl' },
  color: 'heds.100',
};

export const $likeButtonStyles = (connectedUserId: number | null): ExtendedButtonProps => ({
  isDisabled: !connectedUserId,
  mr: 3,
  bg: 'transparent',
  _hover: { bg: 'transparent' },
  _active: { bg: 'transparent' },
  _focus: { bg: 'transparent' },
  'data-testid': 'song-like-button',
});

export const $likeIconStyles = (songLikes: any[], connectedUserId: number | null): TextProps => ({
  fontSize: { base: '2xl', lg: '3xl' },
  color: songLikes?.map((like: any) => like.user_id)?.includes(connectedUserId) ? 'red.500' : 'heds.bg2',
  as: 'i',
  transform: 'scale(1)',
  transition: 'all 0.35s ease-out',
  className: songLikes?.map((like: any) => like.user_id)?.includes(connectedUserId) ? 'fas fa-heart' : 'fal fa-heart',
  _hover: { color: 'red.600', transition: 'all 0.35s ease-in', transform: 'scale(1.05)' },
});

export const $playButtonIconStyles = (isLoading: boolean, isPlaying: boolean): TextProps => ({
  fontSize: '3xl',
  color: 'white',
  as: 'i',
  className: isLoading ? 'fas fa-circle-notch fa-spin' : isPlaying ? 'fas fa-pause' : 'fas fa-play',
});

export const $stackWrapperStyles: StackProps = {
  mt: { base: -4, lg: 2 },
  alignItems: 'start',
  justifyContent: 'center',
};

export const $stackStyles = {
  alignItems: 'end',
};

export const $flexStyles: FlexProps = {
  alignItems: 'baseline',
  gap: 1.5,
};

export const $artistLabelTextStyles: TextProps = {
  fontFamily: 'inter',
  fontSize: { base: 'xs', lg: 'sm' },
  color: 'white',
  fontWeight: 'medium',
  letterSpacing: 'wide',
};

export const $artistNameTextStyles: TextProps = {
  pointerEvents: 'auto',
  role: 'button',
  _hover: { opacity: '75%', transition: '0.35s ease-in-out' },
  fontFamily: 'inter',
  fontSize: { base: 'xs', lg: 'sm' },
  color: 'heds.200',
  fontWeight: 'medium',
  letterSpacing: 'wide',
};

export const $gridItemImageStyles: GridItemProps = {
  colSpan: 3,
  display: { base: 'none', lg: 'block' },
};

export const $coverImageStyles: ImageProps = {
  opacity: { base: '50%', xl: '90%' },
  rounded: 'lg',
};

export const $privateLabelStyles: BoxProps = {
  width: '60px',
  h: { base: '9px', lg: '11px' },
  bg: { base: 'heds.bg3', lg: 'heds.bg3' },
};

export const $privateTooltipStyles: StyleProps = {
  fontSize: 'xs',
};

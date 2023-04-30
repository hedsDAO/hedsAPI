import { Song } from '@/models/common';
import { store } from '@/store';
import { Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { $likeButtonStyles } from '@/components/GlobalAudio/components/LikeButton/styles';

/**
 * @function LikeButton
 * @description A like button component that displays a solid heart if the current song is liked or an outlined heart otherwise.
 * @returns {JSX.Element} - Rendered LikeButton component.
 */
export const LikeButton = () => {
  const connectedUserLikes: Song[] = useSelector(store.select.authModel.selectUserLikes);
  const currentSong: Song = useSelector(store.select.globalAudioModel.selectCurrentSong);
  const currentSongId = currentSong?.id;
  const isLiked = connectedUserLikes?.some((song) => song?.id === currentSongId);

  return <Text {...$likeButtonStyles(isLiked, () => {})} />;
};

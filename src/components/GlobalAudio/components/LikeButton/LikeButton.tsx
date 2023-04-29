import { Song } from '@/models/common';
import { store } from '@/store';
import { Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const LikeButton = () => {
  const connectedUserLikes: Song[] = useSelector(store.select.authModel.selectUserLikes);
  const currentSong: Song = useSelector(store.select.globalAudioModel.selectCurrentSong);
  const currentSongId = currentSong?.id;
  return (
    <Text
      role="button"
      pointerEvents={'auto'}
      mt={'0.5 !important'}
      mr={2.5}
      color="white"
      as={'i'}
      className={connectedUserLikes?.some((song) => song?.id === currentSongId) ? 'fas fa-heart' : 'fal fa-heart'}
    ></Text>
  );
};

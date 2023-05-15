import { Dispatch, store } from '@/store';
import { Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { $likeButtonStyles } from '@/components/GlobalAudio/components/LikeButton/styles';

/**
 * @function LikeButton
 * @description A like button component that displays a solid heart if the current song is liked or an outlined heart otherwise.
 * @returns {JSX.Element} - Rendered LikeButton component.
 */
export const LikeButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const songLikes = useSelector(store.select.songModel.selectSongLikes);
  const connectedUserId = useSelector(store.select.authModel.selectUserId);
  const isLiked = songLikes?.map((like: any) => like.user_id)?.includes(connectedUserId);
  const songId = useSelector(store.select.audioModel.selectSongId);
  const songHash = useSelector(store.select.audioModel.selectSongHash);
  const handleLikeAndUnlike = () => {
    songLikes?.map((like: any) => like.user_id).includes(connectedUserId)
      ? dispatch.songModel.handleUnlikeSong([songId, connectedUserId, songHash])
      : dispatch.songModel.handleLikeSong([songId, connectedUserId, songHash]);
  };

  return <>{connectedUserId ? <Text {...$likeButtonStyles(isLiked, handleLikeAndUnlike)} /> : <></>}</>;
};

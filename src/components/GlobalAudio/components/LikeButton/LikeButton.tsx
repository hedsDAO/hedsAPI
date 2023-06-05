import { Dispatch, store } from '@/store';
import { Button, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { $likeButtonIconStyles, $likeButtonStyles } from '@/components/GlobalAudio/components/LikeButton/styles';
import { useEffect } from 'react';

/**
 * @function LikeButton
 * @description A like button component that displays a solid heart if the current song is liked or an outlined heart otherwise.
 * @returns {JSX.Element} - Rendered LikeButton component.
 */
export const LikeButton = () => {
  const dispatch = useDispatch<Dispatch>();
  const songLikes = useSelector(store.select.audioModel.selectSongLikes);
  const connectedUserId = useSelector(store.select.authModel.selectUserId);
  const songId = useSelector(store.select.audioModel.selectSongId);
  const songHash = useSelector(store.select.audioModel.selectSongHash);
  const isLoading = useSelector(store.select.audioModel.selectIsLoading);
  const handleLikeAndUnlike = () => {
    songLikes?.map((like: any) => like.user_id).includes(connectedUserId)
      ? dispatch.audioModel.handleUnlikeSong([songId, connectedUserId, songHash])
      : dispatch.audioModel.handleLikeSong([songId, connectedUserId, songHash]);
  };
  
  return (
    <>
      {connectedUserId ? (
        <Button {...$likeButtonStyles} isDisabled={!connectedUserId} isLoading={isLoading} data-testid="ga-like-button" onClick={handleLikeAndUnlike}>
          <Text {...$likeButtonIconStyles(songLikes?.map((like: any) => like.user_id)?.includes(connectedUserId))} />
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

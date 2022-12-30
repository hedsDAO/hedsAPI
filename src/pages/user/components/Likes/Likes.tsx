import { AudioTrack } from '@/common/media';
import { RootState, store } from '@/store';
import { Stack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Likes = () => {
  const userLikes = useSelector(store.select.userModel.selectCurrentUserLikes);
  return (
    <Stack minW='full' w='full' py={2}>
      {userLikes && userLikes?.length &&
        userLikes.map((track) => {
          return <AudioTrack key={track.audio} track={track} />;
        })}
    </Stack>
  );
};

export default Likes;

import { Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { isEmpty } from '@/utils';
import { AudioTrack } from '@/common/media';

const Tracks = () => {
//   const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const userTracks = useSelector(store.select.userModel.selectCurrentUserTracks);

  return (
    <Stack py={2}>
      {!isEmpty(userTracks) &&
        Object.values(userTracks).map((track) => {
          return <AudioTrack key={track.audio} track={track} />;
        })}
    </Stack>
  );
};

export default Tracks;

import { Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { store } from '@/store';
import { isEmpty } from '@/utils';
import { AudioTrack } from '@/common/media';

const Tracks = () => {
  const allTracks = useSelector(store.select.userModel.selectCurrentUserAllTracks);
  return (
    <Stack pt={2}>
      {!isEmpty(allTracks) &&
        Object.entries(allTracks).map(([text, track]) => {
          return Object.values(track).map((track) => <AudioTrack key={track.audio} track={track} />);
        })}
    </Stack>
  );
};

export default Tracks;

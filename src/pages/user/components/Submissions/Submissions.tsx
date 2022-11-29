import { AudioTrack } from '@/common/media';
import { store } from '@/store';
import { isEmpty } from '@/utils';
import { Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Submissions = () => {
  const userSubmissions = useSelector(store.select.userModel.selectCurrentUserSubmissions);
  return (
    <Stack py={2}>
      {!isEmpty(userSubmissions) &&
        Object.values(userSubmissions).map((track) => {
          return <AudioTrack key={track.audio} track={track} />;
        })}
    </Stack>
  );
};

export default Submissions;

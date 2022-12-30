import { Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { store } from '@/store';
import { isEmpty } from '@/utils';
import { AudioTrack } from '@/common/media';

const Samples = () => {
  const userSamples = useSelector(store.select.userModel.selectCurrentUserSamples);
  return (
    <Stack pt={2}>
      {!isEmpty(userSamples) &&
        Object.values(userSamples).map((track) => {
          return <AudioTrack key={track.audio} track={track} />;
        })}
    </Stack>
  );
};

export default Samples;

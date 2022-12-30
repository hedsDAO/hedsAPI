import { AudioTrack } from '@/common/media';
import { store } from '@/store';
import { isEmpty } from '@/utils';
import { Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Submissions = () => {
  const userSubmissions = useSelector(store.select.userModel.selectCurrentUserSubmissions);
  const connectedWallet = useSelector(store.select.userModel.selectConnectedUserWallet);
  return (
    <Stack pt={2}>
      {!isEmpty(userSubmissions) &&
        Object.values(userSubmissions).map((track) => {
          if (track.wallet === connectedWallet || track.public) return <AudioTrack key={track.audio} track={track} />;
        })}
    </Stack>
  );
};

export default Submissions;

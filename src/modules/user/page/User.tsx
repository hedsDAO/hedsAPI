import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { TapeData } from '@/models/common';
import { Flex, Stack } from '@chakra-ui/react';
import { UserWrapper, PrivateUserWrapper } from '@/common/wrappers';
import { CopyWalletButton, TwitterLinkButton } from '@/common/buttons';
import { Tracks, Submissions, ProfilePicture, DisplayName, Description, Collection, Badges, Samples } from '@/common/user';

export const User: React.FC = (): JSX.Element => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const userData = useSelector((state: RootState) => state.userModel);
  const tapeData = useSelector((state: RootState) => state.tapesModel);
  const userTracks: { [key: string]: TapeData } = store.select.userModel.getTapeCovers(store.getState(), tapeData.allTapes);
  return (
    <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={['column', 'column', 'row', 'row']} gap={10} px={[10, 4, 2, 0]} py={10}>
      <UserWrapper>
        <Stack direction={'column'} spacing={4}>
          <ProfilePicture loading={loading} userData={userData} />
          <Badges loading={loading} userData={userData} />
          <DisplayName loading={loading} userData={userData} />
<<<<<<< HEAD
          <Description loading={loading} userData={userData} />
=======
          <UserDescription loading={loading} userData={userData} />
          <Divider />
>>>>>>> 62c801df32deef2ac3bdb9d30c4181436cffbe26
          <CopyWalletButton loading={loading} wallet={userData?.wallet} />
          <TwitterLinkButton loading={loading} userData={userData} />
        </Stack>
        <Stack direction={'column'} spacing="2" width={'full'}>
          <PrivateUserWrapper loading={loading} userData={userData}>
            <Submissions loading={loading} userData={userData} />
            <Tracks loading={loading} userTracks={userTracks} />
            <Collection loading={loading} userData={userData} />
            <Samples loading={loading} userData={userData} />
          </PrivateUserWrapper>
        </Stack>
      </UserWrapper>
    </Flex>
  );
};

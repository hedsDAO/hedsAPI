import { useSelector } from 'react-redux';
import { TapeData } from '@/models/common';
import { RootState, store } from '@/store';
import { Stack } from '@chakra-ui/react';
import UserWrapper from '@/common/components/wrappers/UserWrapper';
import {
  FeaturedSubmissions,
  TwitterLinkButton,
  UserSubmissions,
  ProfilePicture,
  CopyWalletButton,
  DisplayName,
  UserDescription,
  PrivateUserWrapper,
} from '@/modules/user/components';

export const User = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const userData = useSelector((state: RootState) => state.userModel);
  const tapeData = useSelector((state: RootState) => state.tapesModel);
  const userTracks: { [key: string]: TapeData } = store.select.userModel.getTapeCovers(store.getState(), tapeData.allTapes);
  return (
    <div className="max-w-7xl mx-auto flex md:flex-row flex-col gap-10 lg:px-0 px-4 py-10 min-h-screen">
      <UserWrapper>
        <Stack direction={'column'}>
          <ProfilePicture loading={loading} userData={userData} />
          <DisplayName loading={loading} userData={userData} />
          <UserDescription loading={loading} userData={userData} />
          <CopyWalletButton loading={loading} wallet={userData?.wallet} />
          <TwitterLinkButton loading={loading} userData={userData} />
        </Stack>
        <Stack direction={'column'} spacing="2" width={'full'}>
          <PrivateUserWrapper loading={loading} userData={userData}>
            <UserSubmissions loading={loading} userData={userData} />
            <FeaturedSubmissions loading={loading} userTracks={userTracks} />
          </PrivateUserWrapper>
        </Stack>
      </UserWrapper>
    </div>
  );
};

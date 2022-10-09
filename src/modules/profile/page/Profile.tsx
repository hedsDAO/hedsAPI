import { useSelector } from 'react-redux';
import { TapeData } from '@/models/common';
import { RootState, store } from '@/store';
import { Stack, Flex } from '@chakra-ui/react';
import { ProfileWrapper } from '@/common/wrappers';
import { CopyWalletButton, TwitterLinkButton } from '@/common/buttons';
import { SettingsButton, VerifyTwitterButton, NameButton } from '@/modules/profile/components';
import { Badges, Collection, Description, DisplayName, ProfilePicture, Samples, Submissions, Tracks } from '@/common/user';

export const Profile = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const userData = useSelector((state: RootState) => state.userModel);
  const tapeData = useSelector((state: RootState) => state.tapesModel);
  const userTracks: { [key: string]: TapeData } = store.select.userModel.getTapeCovers(store.getState(), tapeData.allTapes);

  return (
    <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={['column', 'column', 'row', 'row']} gap={10} px={[10, 4, 2, 0]} py={10}>
      <ProfileWrapper>
        <Stack direction={'column'}>
          <ProfilePicture loading={loading} userData={userData} />
          <Flex gap={2} alignItems={'stretch'}>
            <SettingsButton />
            {!userData?.displayName && <NameButton />}
            {!userData?.twitterHandle && <VerifyTwitterButton />}
          </Flex>
          <Badges loading={loading} userData={userData} />
          <DisplayName loading={loading} userData={userData} />
          <Description loading={loading} userData={userData} />
          <CopyWalletButton loading={loading} wallet={userData?.wallet} />
          <TwitterLinkButton loading={loading} userData={userData} />
        </Stack>
        <Stack direction={'column'} spacing="2" width={'full'}>
          <Submissions loading={loading} userData={userData} />
          <Tracks loading={loading} userTracks={userTracks} />
          <Collection loading={loading} userData={userData} />
          <Samples loading={loading} userData={userData} />
        </Stack>
      </ProfileWrapper>
    </Flex>
  );
};

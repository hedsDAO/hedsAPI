import { useSelector } from 'react-redux';
import { TapeData } from '@/models/common';
import { RootState, store } from '@/store';
import { Stack, Flex, Image } from '@chakra-ui/react';
import { ProfileWrapper } from '@/common/wrappers';
import { CopyWalletButton, TwitterLinkButton } from '@/common/buttons';
import { SettingsButton, VerifyTwitterButton, NameButton } from '@/pages/profile/components';
import { Badges, Collection, Description, DisplayName, ProfilePicture, Samples, Submissions, Tracks } from '@/common/user';
const DEFAULT_BANNER =
  'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=652af26f-1f52-4e2d-852e-0b101c60a015';

export const Profile = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const userData = useSelector((state: RootState) => state.userModel);
  const tapeData = useSelector((state: RootState) => state.tapesModel);
  const userTracks: { [key: string]: TapeData } = store.select.userModel.getTapeCovers(store.getState(), tapeData.allTapes);

  return (
    <ProfileWrapper>
      <Image shadow={'lg'} src={DEFAULT_BANNER} className="w-screen -mb-32 bg-gray-600" h="48" />
      <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={['column', 'column', 'row', 'row']} gap={6} px={[10, 4, 2, 0]} py={4}>
        <Stack direction={'column'}>
          <ProfilePicture loading={loading} userData={userData} />
          <Flex gap={2} alignItems={'stretch'}>
            <SettingsButton />
          </Flex>
          <Badges loading={loading} userData={userData} />
          <Flex pt={3} gap={1} alignItems={'center'}>
            <DisplayName loading={loading} userData={userData} />
            {!userData?.displayName && <NameButton />}
          </Flex>
          <Description loading={loading} userData={userData} />
          <Flex pt={2} alignItems={'start'} direction={'column'} gap={1}>
            <CopyWalletButton loading={loading} wallet={userData?.wallet} />
            {userData?.twitterHandle ? <TwitterLinkButton loading={loading} userData={userData} /> : <VerifyTwitterButton />}
          </Flex>
        </Stack>
        <Stack mt={{ base: '0', md: '32' }} direction={'column'} spacing="2" width={'full'}>
          {/* <Tracks loading={loading} userTracks={userTracks} /> */}
          <Submissions loading={loading} userData={userData} />
          <Collection loading={loading} userData={userData} />
          <Samples loading={loading} userData={userData} />
        </Stack>
      </Flex>
    </ProfileWrapper>
  );
};

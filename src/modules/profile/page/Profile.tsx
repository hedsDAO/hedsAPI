import { useSelector } from 'react-redux';
import { TapeData } from '@/models/common';
import { RootState, store } from '@/store';
import { Stack, Flex } from '@chakra-ui/react';
import ProfileWrapper from '@/common/components/wrappers/ProfileWrapper';
import {
  TwitterLinkButton,
  UserSubmissions,
  ProfilePicture,
  CopyWalletButton,
  DisplayName,
  UserDescription,
  FeaturedSubmissions,
  ProfileCollection,
  RefreshCollectionButton,
} from '@/modules/profile/components';

export const Profile = () => {
  const loading = useSelector((state: RootState) => state.loading.models.profileModel);
  const profileData = useSelector((state: RootState) => state.profileModel);
  const tapeData = useSelector((state: RootState) => state.tapesModel);
  const userTracks: { [key: string]: TapeData } = store.select.profileModel.getTapeCovers(store.getState(), tapeData.allTapes);
  return (
    <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={['column', 'column', 'row', 'row']} gap={10} px={[10, 4, 2, 0]} py={10}>
      <ProfileWrapper>
        <Stack direction={'column'}>
          <ProfilePicture loading={loading} profileData={profileData} />
          <DisplayName loading={loading} profileData={profileData} />
          <UserDescription loading={loading} profileData={profileData} />
          <CopyWalletButton loading={loading} wallet={profileData?.wallet} />
          <TwitterLinkButton loading={loading} profileData={profileData} />
        </Stack>
        <Stack direction={'column'} spacing="2" width={'full'}>
          <UserSubmissions loading={loading} profileData={profileData} />
          <FeaturedSubmissions loading={loading} userTracks={userTracks} />
          <RefreshCollectionButton loading={loading} profileData={profileData} />
          <ProfileCollection loading={loading} profileData={profileData} />
        </Stack>
      </ProfileWrapper>
    </Flex>
  );
};

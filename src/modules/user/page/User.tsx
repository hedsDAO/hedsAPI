import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { TapeData } from '@/models/common';
import { Flex, Stack } from '@chakra-ui/react';
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
  UserCollection,
  RefreshCollectionButton,
} from '@/modules/user/components';

export const User: React.FC = (): JSX.Element => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const userData = useSelector((state: RootState) => state.userModel);
  const tapeData = useSelector((state: RootState) => state.tapesModel);
  const userTracks: { [key: string]: TapeData } = store.select.userModel.getTapeCovers(store.getState(), tapeData.allTapes);
  return (
    <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={['column', 'column', 'row', 'row']} gap={10} px={[10, 4, 2, 0]} py={10}>
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
            <RefreshCollectionButton userData={userData} />
            <UserCollection loading={loading} userData={userData} />
          </PrivateUserWrapper>
        </Stack>
      </UserWrapper>
    </Flex>
  );
};

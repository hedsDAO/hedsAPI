import { useSelector } from 'react-redux';
import { RootState, store } from '@/store';
import { TapeData } from '@/models/common';
import { Flex, Image, Stack } from '@chakra-ui/react';
import { UserWrapper, PrivateUserWrapper } from '@/common/wrappers';
import { CopyWalletButton, TwitterLinkButton } from '@/common/buttons';
import { Tracks, Submissions, ProfilePicture, DisplayName, Description, Collection, Badges, Samples } from '@/common/user';
import { isEmpty } from '@/utils';

export const User: React.FC = (): JSX.Element => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const userData = useSelector((state: RootState) => state.userModel);
  const tapeData = useSelector((state: RootState) => state.tapesModel);
  const userTracks: { [key: string]: TapeData } = store.select.userModel.getTapeCovers(store.getState(), tapeData.allTapes);
  return (
    <div className="bg-[#f5f5f5]">
      <Image shadow={'lg'} src={userData?.banner} className="object-fit object-cover w-screen -mb-32 bg-gray-600 shadow-sm" h="48" />
      <Flex maxWidth={'7xl'} mx={'auto'} flexDirection={['column', 'column', 'row', 'row']} gap={10} px={[10, 4, 2, 0]} py={4}>
        <UserWrapper>
          <Stack direction={'column'}>
            <ProfilePicture loading={loading} userData={userData} />
            <Badges loading={loading} userData={userData} />
            <DisplayName loading={loading} userData={userData} />
            <Description loading={loading} userData={userData} />
            <CopyWalletButton loading={loading} wallet={userData?.wallet} />
            <TwitterLinkButton loading={loading} userData={userData} />
          </Stack>
          <Stack mt={{ base: '0', md: '36' }} direction={'column'} spacing="10" width={'full'}>
            <PrivateUserWrapper loading={loading} userData={userData}>
              <Samples loading={loading} userData={userData} />
              <Tracks loading={loading} userTracks={userTracks} />
              <Submissions loading={loading} userData={userData} />
              <Collection loading={loading} userData={userData} />
            </PrivateUserWrapper>
          </Stack>
        </UserWrapper>
      </Flex>
    </div>
  );
};

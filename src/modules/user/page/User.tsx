import { useSelector } from 'react-redux';
import { Heading, Stack } from '@chakra-ui/react';
import UserWrapper from '@/common/components/wrappers/UserWrapper';
import {
  FeaturedSubmissions,
  TwitterLinkButton,
  UserSubmissions,
  ProfilePicture,
  CopyWalletButton,
  DisplayName,
  UserDescription,
  PrivateUserDisplay,
} from '@/modules/user/components';
import {
  selectUserData,
  selectUserDataLoading,
  selectPublicUserProfile,
  selectUserSubmissionsOnHedsTapes,
  selectUserFeaturedTracks,
} from '@/modules/user/models/selectors';

export const User = () => {
  const loading = useSelector(selectUserDataLoading);
  const userData = useSelector(selectUserData);
  const isPublic = useSelector(selectPublicUserProfile);
  const userSubmissions = useSelector(selectUserSubmissionsOnHedsTapes);
  const featuredTracks = useSelector(selectUserFeaturedTracks);

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
          {isPublic ? (
            <>
              {!!Object.keys(userSubmissions).length && <UserSubmissions loading={loading} submissions={userSubmissions} />}
              {!!Object.keys(featuredTracks).length && <FeaturedSubmissions loading={loading} featuredTracks={featuredTracks} />}
            </>
          ) : (
            <PrivateUserDisplay />
          )}
        </Stack>
      </UserWrapper>
    </div>
  );
};

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import { Heading, Stack } from '@chakra-ui/react';
import { TwitterLinkButton, UserSubmissions, ProfilePicture, CopyWalletButton, DisplayName, UserDescription } from '@/modules/profile/components';
import { selectProfileData, selectProfileDataLoading } from '@/modules/profile/selectors';
import ProfileWrapper from '@/common/components/wrappers/ProfileWrapper';

export const Profile = () => {
  const dispatch = useDispatch<Dispatch>();
  const loading = useSelector(selectProfileDataLoading);
  const profileData = useSelector(selectProfileData);

  return (
    <div className="max-w-7xl mx-auto flex md:flex-row flex-col gap-10 lg:px-0 px-4 py-10 min-h-screen">
      <ProfileWrapper>
        <Stack direction={'column'}>
          <ProfilePicture loading={loading} profileData={profileData} />
          <DisplayName loading={loading} profileData={profileData} />
          <UserDescription loading={loading} profileData={profileData} />
          <CopyWalletButton loading={loading} wallet={profileData?.wallet} />
          <TwitterLinkButton loading={loading} profileData={profileData} />
        </Stack>
        <Stack direction={'column'} spacing="2" width={'full'}>
          <Heading fontSize={'3xl'}>Submissions</Heading>
          <UserSubmissions loading={loading} profileData={profileData} />
          <Heading fontSize={'3xl'}>Featured On</Heading>
        </Stack>
      </ProfileWrapper>
    </div>
  );
};

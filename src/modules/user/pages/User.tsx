import React from 'react';
import { useSelector } from 'react-redux';
import { Heading, Stack } from '@chakra-ui/react';
import UserWrapper from '@/common/components/wrappers/UserWrapper';
import { TwitterLinkButton, UserSubmissions, ProfilePicture, CopyWalletButton, DisplayName, UserDescription } from '@/modules/user/components';
import { selectUserData, selectUserDataLoading } from '@/modules/user/selectors';

export const User = () => {
  const loading = useSelector(selectUserDataLoading);
  const userData = useSelector(selectUserData);

  return (
    <div className="max-w-7xl mx-auto flex md:flex-row flex-col gap-10 lg:px-0 px-4 py-10 min-h-screen">
      <UserWrapper>
        <Stack direction={'column'}>
          <ProfilePicture loading={loading} userData={userData} />
          <DisplayName loading={loading} userData={userData} />
          <UserDescription loading={loading} userData={userData} />
          <CopyWalletButton wallet={userData?.wallet} />
          <TwitterLinkButton userData={userData} />
        </Stack>
        <Stack direction={'column'} spacing="2" width={'full'}>
          <Heading fontSize={'3xl'}>Submissions</Heading>
          <UserSubmissions userData={userData} />
          <Heading fontSize={'3xl'}>Featured On</Heading>
        </Stack>
      </UserWrapper>
    </div>
  );
};

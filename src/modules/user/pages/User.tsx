import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Heading, Text } from '@chakra-ui/react';
import UserWrapper from '@/common/components/wrappers/UserWrapper';
import { TwitterLinkButton, UserSubmissions, ProfilePicture, CopyWalletButton } from '@/modules/user/components';

export const User = () => {
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const userData = useSelector((state: RootState) => state.userModel);
  return (
    <UserWrapper>
      <div className="max-w-7xl mx-auto flex md:flex-row flex-col gap-10 lg:px-0 px-4 py-10 min-h-screen">
        <div className="flex flex-col gap-2">
          <ProfilePicture loading={loading} userData={userData} />
          <Heading>{userData?.displayName}</Heading>
          <Text fontSize={'sm'}>{userData?.description}</Text>
          <CopyWalletButton wallet={userData?.wallet} />
          <TwitterLinkButton userData={userData} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Heading fontSize={'3xl'}>Submissions</Heading>
          <UserSubmissions userData={userData} />
          <Heading fontSize={'3xl'}>Featured On</Heading>
        </div>
      </div>
    </UserWrapper>
  );
};

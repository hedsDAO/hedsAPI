import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dispatch, RootState } from '@/store';
import { Heading, Text } from '@chakra-ui/react';
import { UserSubmissions } from '../components/UserSubmissions';
import { TwitterLinkButton } from '@/modules/user/components/TwitterLinkButton';
import { ProfilePicture } from '@/modules/user/components/ProfilePicture';
import { CopyWalletButton } from '@/modules/user/components/CopyWalletButton';

export const User = () => {
  const dispatch = useDispatch<Dispatch>();
  const loading = useSelector((state: RootState) => state.loading.models.userModel);
  const userData = useSelector((state: RootState) => state.userModel);
  const { wallet } = useParams<{ wallet: string }>();
  useEffect(() => {
    if (wallet) dispatch.userModel.getUserData(wallet);
    return () => {
      dispatch.userModel.clearUserState();
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto flex md:flex-row flex-col gap-10 lg:px-0 px-4">
      <div className="flex flex-col gap-2">
        <ProfilePicture loading={loading} userData={userData} />
        <Heading>{userData?.displayName}</Heading>
        <Text fontSize={'sm'}>{userData?.description}</Text>
        <CopyWalletButton wallet={userData?.wallet} />
        <TwitterLinkButton userData={userData} />
      </div>
      <div className="">
        <Heading fontSize={'3xl'}>Submissions</Heading>
        <UserSubmissions userData={userData} />
        <Heading fontSize={'3xl'}>Featured On</Heading>
      </div>
    </div>
  );
};

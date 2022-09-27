import React, { Fragment } from 'react';
import { useAccount } from 'wagmi';
import { Dispatch } from 'src/store';
import { useDispatch } from 'react-redux';

export const ProfileWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<Dispatch>();
  useAccount({
    onConnect({ address }) {
      dispatch.profileModel.getProfileData(address.toLowerCase());
    },
  });
  return <Fragment>{children}</Fragment>;
};

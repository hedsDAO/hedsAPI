import React, { Fragment } from 'react';
import { useAccount } from 'wagmi';
import { Dispatch } from 'src/store';
import { useDispatch } from 'react-redux';

export const ProfileWrapper = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch<Dispatch>();
  useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected });
      dispatch.profileModel.getProfileData(address);
    },
  });
  return <Fragment>{children}</Fragment>;
};

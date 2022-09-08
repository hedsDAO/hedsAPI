import React, { Fragment, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Dispatch } from 'src/store';
import { useDispatch } from 'react-redux';

export const ProfileWrapper = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    dispatch.artistModel.getAllArtists();
  }, []);
  useAccount({
    onConnect({ address }) {
      dispatch.profileModel.getProfileData(address.toLowerCase());
    },
  });
  return <Fragment>{children}</Fragment>;
};

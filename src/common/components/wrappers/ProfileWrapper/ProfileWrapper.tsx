import React, { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAccount } from 'wagmi';
import { Dispatch } from 'src/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const ProfileWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch<Dispatch>();
  const { address } = useAccount();
  useAccount({
    onConnect({ address }) {
      dispatch.profileModel.getProfileData(address.toLowerCase());
    },
    onDisconnect() {
      dispatch.profileModel.clearProfileState();
      navigate('/');
    },
  });
  useEffect(() => {
    if (!address && pathname === '/profile') navigate('/');
    if (address && pathname === '/profile') dispatch.profileModel.getProfileData(address.toLowerCase());
    return () => {
      dispatch.profileModel.clearProfileState();
    };
  }, [pathname]);
  return <Fragment>{children}</Fragment>;
};

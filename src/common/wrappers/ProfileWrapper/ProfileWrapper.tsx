import React, { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAccount } from 'wagmi';
import { Dispatch } from 'src/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const ProfileWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch<Dispatch>();
  const { address } = useAccount();
  useAccount({
    onConnect({ address }) {
      dispatch.userModel.getUserData(address.toLowerCase());
    },
    onDisconnect() {
      dispatch.userModel.clearUserState();
      navigate('/');
    },
  });
  useEffect(() => {
    if (!address && pathname === '/profile') navigate('/');
    if (address && pathname === '/profile') dispatch.userModel.getUserData(address.toLowerCase());
    return () => {
      dispatch.userModel.clearUserState();
    };
  }, [pathname]);
  return <div className="bg-[#f5f5f5]">{children}</div>;
};

export default ProfileWrapper;

import { Dispatch } from '@/store';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

const UserWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch<Dispatch>();
  const { address } = useAccount();
  const { isConnected, isDisconnected, status } = useAccount({});
  const wallet = pathname?.includes('/u') ? pathname?.split('/u')[1] : undefined;

  const handleFetchUserData = useCallback(() => {
    if (isConnected && address) dispatch.userModel.getConnectedUserData(address);
    if (pathname.includes('/u') && wallet?.length) dispatch.userModel.getCurrentUserData(wallet);
    if (isConnected && address && pathname === '/profile') dispatch.userModel.getCurrentUserData(address);
  }, [pathname, wallet, status]);

  useEffect(() => {
    handleFetchUserData();
    return () => {
      dispatch.userModel.clearUserState();
    };
  }, [pathname]);

  useEffect(() => {
    if (status === 'disconnected' && pathname === '/profile') {
      dispatch.userModel.clearUserState();
      navigate('/');
    }
  }, [status]);

  return <>{children}</>;
};

export default UserWrapper;

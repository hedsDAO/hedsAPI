import { Dispatch, RootState } from '@/store';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

const UserWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch<Dispatch>();
  const { address } = useAccount();
  const { isConnected, isDisconnected } = useAccount({});
  const wallet = pathname?.includes('/u') ? pathname?.split('/u')[1] : undefined;
  
  const handleFetchUserData = useCallback(() => {
    if (wallet?.length && pathname.includes('/u')) {
      return dispatch.userModel.getConnectedUserData(wallet);
    } else if (isConnected && address && pathname === '/profile') {
      return dispatch.userModel.getConnectedUserData(address);
    } else if (isDisconnected && pathname === '/profile') {
      return dispatch.userModel.clearUserState(), navigate('/');
    }
  }, [pathname, wallet, address]);

  useEffect(() => {
    handleFetchUserData();
    return () => {
      dispatch.userModel.clearUserState();
    };
  }, [pathname]);

  useEffect(() => {
  }, [isConnected])

  return <>{children}</>;
};

export default UserWrapper;

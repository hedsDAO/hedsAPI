import { Dispatch } from '@/store';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';

const UserWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch<Dispatch>();
  const { address } = useAccount();
  const { isDisconnected, status, isReconnecting } = useAccount({});
  const wallet = pathname?.split('/u/')?.[1];
  const isOnOwnPage = wallet?.toLowerCase() === address?.toLowerCase() || false;

  const handleFetchUserData = useCallback(() => {
    if (wallet) dispatch.userModel.getCurrentUserData(wallet.toLowerCase());
    if (wallet?.toLowerCase() === address?.toLowerCase()) dispatch.userModel.getConnectedUserData(wallet);
    if (!pathname.includes('/u')) dispatch.userModel.clearCurrentUserState();
  }, [wallet, pathname, status]);

  useEffect(() => {
    handleFetchUserData();
  }, [pathname, address, status]);

  useEffect(() => {
    if (isDisconnected && isOnOwnPage) {
      dispatch.userModel.clearConnectedUserState();
      navigate('/');
    }
  }, [isDisconnected]);

  useEffect(() => {
    if (address && isReconnecting) dispatch.userModel.getConnectedUserData(address.toLowerCase());
  }, [isReconnecting]);

  return <>{children}</>;
};

export default UserWrapper;

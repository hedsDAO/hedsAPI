import { Dispatch } from '@/store';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export const UserWrapper = ({ children }: { children: React.ReactNode }) => {
  const { wallet } = useParams<{ wallet: string }>();
  const dispatch = useDispatch<Dispatch>();
  useEffect(() => {
    if (wallet) dispatch.userModel.getUserData(wallet);
    return () => {
      dispatch.userModel.clearUserState();
    };
  }, []);
  return <>{children}</>;
};

import { Modals } from '@/modals/models/modalModel';
import { Dispatch, store } from '@/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<Dispatch>();
  const displayName = useSelector(store.select.authModel.selectUserDisplayName);
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (isConnected && address) dispatch.authModel.getUser(address);
  }, [isConnected]);

  useEffect(() => {
    if (displayName?.length === 0 && isConnected) {
      dispatch.modalModel.setModal(Modals.CONNECT);
    } else dispatch.modalModel.setModal(null);
  }, [displayName, isConnected]);

  return <>{children}</>;
};

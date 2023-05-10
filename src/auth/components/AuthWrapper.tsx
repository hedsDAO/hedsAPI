import { Dispatch } from '@/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAccount } from 'wagmi';

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<Dispatch>();
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (isConnected && address) dispatch.authModel.getUser(address);
  }, [isConnected]);

  return <>{children}</>;
};

import { useNavigate, useLocation } from 'react-router';
import { useAccount } from 'wagmi';
import { Dispatch, RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Modals } from '@/modules/modals/store/modalModel';

const DisplayNameWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch<Dispatch>();
  const { address } = useAccount();
  const userData = useSelector((state: RootState) => state.userModel);
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
  useEffect(() => {
    if (!userData?.displayName?.length) {
      dispatch.modalModel.setModal(Modals.NAME_MODAL);
      dispatch.modalModel.setModalOpen(true);
    }
  }, [userData]);
  return <>{children}</>;
};

export default DisplayNameWrapper;

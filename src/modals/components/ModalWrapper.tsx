import { useSelector } from 'react-redux';
import {  store } from '@/store';
import { Modals } from '@/modals/models/modalModel';
import { Connect } from '@/modals/screens/connect/Connect';
import { Settings } from '@/modals/screens/settings/Settings';
import { Twitter } from '@/modals/screens/twitter/Twitter';

export const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const modal = useSelector(store.select.modalModel.selectCurrentModal);
  const modalMap = {
    [Modals.CONNECT]: <Connect />,
    [Modals.SETTINGS]: <Settings />,
    [Modals.TWITTER]: <Twitter />,
  };
  return (
    <>
      {modal !== null && modalMap[modal]}
      {children}
    </>
  );
};

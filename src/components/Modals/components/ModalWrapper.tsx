import { useSelector } from 'react-redux';
import {  store } from '@/store';
import { Modals } from '@/components/modals/models/modalModel';
import { Connect } from '@/components/modals/screens/Connect';
import { Settings } from '@/components/modals/screens/Settings';
import { Twitter } from '@/components/modals/screens/Twitter';

export const ModalWrapper = ({ children }: { children: React.ReactNode }) => {

  const modal = useSelector(store.select.modalModel.selectCurrentModal);
  const isOpen = useSelector(store.select.modalModel.selectModalIsOpen);
  const modalMap = {
    [Modals.CONNECT]: <Connect />,
    [Modals.SETTINGS]: <Settings />,
    [Modals.TWITTER]: <Twitter />,
  };
  return (
    <>
      {isOpen && modalMap[modal]}
      {children}
    </>
  );
};

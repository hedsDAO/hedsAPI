import { store } from '@/store';
import { Modals } from '@components/Modals/models/modalModel';
import { Connect } from '@components/Modals/screens/Connect';
import { Settings } from '@components/Modals/screens/Settings';
import { Twitter } from '@components/Modals/screens/Twitter';
import { useSelector } from 'react-redux';

export const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const modal = useSelector(store.select.modalModel.selectModal);
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

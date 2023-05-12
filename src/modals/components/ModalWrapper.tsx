import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Modals } from '@/modals/models/modalModel';
import { Connect } from '@/modals/screens/connect/Connect';
import { Settings } from '@/modals/screens/settings/Settings';
import { Twitter } from '@/modals/screens/twitter/Twitter';
import { Download } from '@/modals/screens/download/Download';

export const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const modal = useSelector(store.select.modalModel.selectCurrentModal);
  const modalMap = {
    [Modals.CONNECT]: <Connect />,
    [Modals.SETTINGS]: <Settings />,
    [Modals.TWITTER]: <Twitter />,
    [Modals.DOWNLOAD]: <Download />,
  };
  return (
    <>
      <Download />
      {/* {modal !== null && modalMap[modal]} */}
      {children}
    </>
  );
};

import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Modals } from '@/modals/models/modalModel';
import { Connect } from '@/modals/screens/connect/Connect';
import { Settings } from '@/modals/screens/settings/Settings';
import { Twitter } from '@/modals/screens/twitter/Twitter';
import { Download } from '@/modals/screens/download/Download';
import { Mint } from '@/modals/screens/mint/Mint';
import { Spotlight } from '@/modals/screens/spotlight/Spotlight';

export const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const modal = useSelector(store.select.modalModel.selectCurrentModal);
  const modalMap = {
    [Modals.CONNECT]: <Connect />,
    [Modals.SETTINGS]: <Settings />,
    [Modals.TWITTER]: <Twitter />,
    [Modals.DOWNLOAD]: <Download />,
    [Modals.MINT]: <Mint />,
    [Modals.SPOTLIGHT]: <Spotlight />,
  };
  return (
    <>
      {modal !== null && modalMap[modal]}
      {children}
    </>
  );
};

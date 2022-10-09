import { Fragment, useEffect } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Modals } from '@/modals/global/models/modalModel';
import { SettingsModal } from '@/modals/screens/settings/SettingsModal/SettingsModal';
import { TwitterModal } from '@/modals/screens/twitter/TwitterModal/TwitterModal';
import { NameModal } from '@/modals/screens/name/NameModal/NameModal';

const ModalWrapper = ({ children }: { children: JSX.Element }) => {
  const { currentModal, isOpen } = useSelector((state: RootState) => state.modalModel);
  useEffect(() => {}, [isOpen, currentModal]);
  return (
    <Fragment>
      {isOpen && currentModal === Modals.SETTINGS_MODAL && <SettingsModal />}
      {isOpen && currentModal === Modals.TWITTER_MODAL && <TwitterModal />}
      {isOpen && currentModal === Modals.NAME_MODAL && <NameModal />}
      {children}
    </Fragment>
  );
};

export default ModalWrapper;

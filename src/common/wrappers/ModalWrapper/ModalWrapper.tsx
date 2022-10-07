import { Fragment, useEffect } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Modals } from '@/modals/modalModel';
import { SettingsModal } from '@/modules/profile/modals/settingsModal/SettingsModal';
import { TwitterModal } from '@/modules/profile/modals/TwitterModal/TwitterModal';

const ModalWrapper = ({ children }: { children: JSX.Element }) => {
  const { currentModal, isOpen } = useSelector((state: RootState) => state.modalModel);
  useEffect(() => {}, [isOpen, currentModal]);
  return (
    <Fragment>
      {isOpen && currentModal === Modals.SETTINGS_MODAL && <SettingsModal />}
      {isOpen && currentModal === Modals.TWITTER_MODAL && <TwitterModal />}
      {children}
    </Fragment>
  );
};

export default ModalWrapper;
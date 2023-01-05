import { Fragment, useEffect } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Modals } from '@/modules/modals/store/modalModel';
import { ConnectModal, UserModal, SettingsModal, SubmitModal, MintModal } from '@/modules/modals/screens';

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const { currentModal, isOpen } = useSelector((state: RootState) => state.modalModel);
  useEffect(() => {}, [isOpen, currentModal]);
  return (
    <Fragment>
      {/* TODO: add modal logic */}
      {isOpen && currentModal === Modals.CONNECT_MODAL && <ConnectModal />}
      {isOpen && currentModal === Modals.USER_MODAL && <UserModal />}
      {isOpen && currentModal === Modals.SETTINGS_MODAL && <SettingsModal />}
      {isOpen && currentModal === Modals.SUBMIT_MODAL && <SubmitModal />}
      {isOpen && currentModal === Modals.MINT_MODAL && <MintModal />}
      {/* {isOpen && currentModal === Modals.TWITTER_MODAL && <TwitterModal />} */}
      {/* {isOpen && currentModal === Modals.NAME_MODAL && <NameModal />} */}
      {/* {isOpen && currentModal === Modals.SAMPLE_MODAL && <SampleModal />} */}
      {children}
    </Fragment>
  );
};

export default ModalWrapper;

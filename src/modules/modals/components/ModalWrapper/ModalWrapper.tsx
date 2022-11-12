import { Fragment, useEffect } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Modals } from '@/modules/modals/store/modalModel';
import { TwitterModal, SettingsModal, NameModal, SampleModal, SubmitModal, MintModal, ConnectModal } from '@/modules/modals/screens';

const ModalWrapper = ({ children }: { children: JSX.Element }) => {
  const { currentModal, isOpen } = useSelector((state: RootState) => state.modalModel);
  useEffect(() => {}, [isOpen, currentModal]);
  return (
    <Fragment>
      {isOpen && currentModal === Modals.SETTINGS_MODAL && <SettingsModal />}
      {isOpen && currentModal === Modals.TWITTER_MODAL && <TwitterModal />}
      {isOpen && currentModal === Modals.NAME_MODAL && <NameModal />}
      {isOpen && currentModal === Modals.SAMPLE_MODAL && <SampleModal />}
      {isOpen && currentModal === Modals.SUBMIT_MODAL && <SubmitModal />}
      {isOpen && currentModal === Modals.MINT_MODAL && <MintModal />}
      {isOpen && currentModal === Modals.CONNECT_MODAL && <ConnectModal />}
      {children}
    </Fragment>
  );
};

export default ModalWrapper;

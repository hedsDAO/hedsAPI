import React, { Fragment, useEffect } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { Modals } from '@/modals/modalModel';
import { ProfileModal } from '@/modals/ProfileModal/ProfileModal';

export const ModalWrapper = ({ children }: { children: JSX.Element }) => {
  const { currentModal, isOpen } = useSelector((state: RootState) => state.modalModel);
  useEffect(() => {}, [isOpen, currentModal]);
  return (
    <Fragment>
      {isOpen && currentModal === Modals.PROFILE_MODAL && <ProfileModal />}
      {children}
    </Fragment>
  );
};

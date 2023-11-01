import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';
import { Dispatch, store } from '@/store';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { DisplayNameForm } from './components/DisplayNameForm';
import { WalletOptions } from './components/WalletOptions';

export const Connect = () => {
  const connectedUser = useSelector(store.select.authModel.selectUser);
  const userDisplayName = useSelector(store.select.authModel.selectUserDisplayName);
  const dispatch = useDispatch<Dispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isConnected } = useAccount();

  useEffect(() => {
    onOpen();
  }, []);

  useEffect(() => {
    if (isConnected && userDisplayName?.length > 0) {
      onClose();
      setTimeout(() => {
        dispatch.modalModel.setModal(null);
      }, 500);
    }
  }, [userDisplayName]);

  const handleClose = () => {
    dispatch.modalModel.setModal(null);
    onClose();
  };
  return (
    <Modal
      size="sm"
      motionPreset="slideInBottom"
      isCentered
      lockFocusAcrossFrames
      isOpen={isOpen}
      onClose={isConnected && userDisplayName?.length === 0 ? null : () => handleClose()}
    >
      <ModalOverlay />
      <ModalContent mx={2}>
        <ModalHeader>
          <Text color="white" fontSize={'xs'} fontFamily={'inter'} letterSpacing="widest">
            {isConnected && connectedUser && userDisplayName?.length === 0 ? 'CHOOSE A DISPLAY NAME' : 'CONNECT'}
          </Text>
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>{isConnected && connectedUser && userDisplayName?.length === 0 ? <DisplayNameForm /> : <WalletOptions />}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { useDisclosure } from '@chakra-ui/react';

/**
 * @function useSettings
 * @description A custom hook that handles the modal open/close and 
 * transition logic for the `Settings` component.
 */

export const useSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userData = useSelector(store.select.authModel.selectUser);
  const dispatch = useDispatch<Dispatch>();
  const settingsState = useSelector(store.select.settingsModel.selectState);

  useEffect(() => {
    onOpen();
    dispatch.settingsModel.setUserData(userData);
    return () => {
      dispatch.settingsModel.clearState();
    };
  }, []);

  useEffect(() => {
    if (isOpen && !settingsState.userData) {
      onClose();
      setTimeout(() => {
        dispatch.modalModel.setModal(null);
      }, 500);
    }
  }, [settingsState]);

  const handleClose = () => dispatch.settingsModel.clearState();

  return { isOpen, handleClose };
};

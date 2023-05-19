import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { useDisclosure } from '@chakra-ui/react';
import { TwitterModalState, TwitterModalSteps } from '../../models/common';

/**
 * @function useTwitter
 * @description A custom hook that handles the modal open/close and
 * transition logic for the `Twitter` component.
 */

export const useTwitter = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector(store.select.authModel.selectUser);

  useEffect(() => {
    onOpen();
    dispatch.twitterModel.setUser(user);
  }, []);

  const handleClose = () => {
    dispatch.twitterModel.clearState();
    onClose();
    setTimeout(() => dispatch.modalModel.clearState(), 500);
  };

  return { isOpen, handleClose };
};

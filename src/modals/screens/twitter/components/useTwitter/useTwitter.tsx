import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { useDisclosure } from '@chakra-ui/react';
import { TwitterModalState } from '../../models/common';

/**
 * @function useTwitter
 * @description A custom hook that handles the modal open/close and
 * transition logic for the `Twitter` component.
 */

export const useTwitter = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector(store.select.authModel.selectUser);
  const twitterState = useSelector(store.select.twitterModel.selectState);

  useEffect(() => {
    onOpen();
    dispatch.twitterModel.setUser(user);
  }, []);

  useEffect(() => {
    if (isOpen && twitterState === ({} as TwitterModalState)) {
      onClose();
      setTimeout(() => {
        dispatch.modalModel.setModal(null);
      }, 500);
    }
  }, [twitterState]);

  const handleClose = () => dispatch.twitterModel.clearState();

  return { isOpen, handleClose };
};

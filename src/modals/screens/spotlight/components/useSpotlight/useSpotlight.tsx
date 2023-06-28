import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { useDisclosure } from '@chakra-ui/react';
import { SpotlightSteps } from '@/modals/screens/spotlight/models/common';

/**
 * @function useSpotlight
 * @description A custom hook that handles the modal open/close and
 * transition logic for the `Spotlight` component.
 */

export const useSpotlight = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userData = useSelector(store.select.authModel.selectUser);
  const dispatch = useDispatch<Dispatch>();
  const spotlightState = useSelector(store.select.spotlightModel.selectState);

  useEffect(() => {
    onOpen();
    if (userData?.id) dispatch.spotlightModel.setUserId(userData?.id);
    if (userData?.spotlight?.length) {
      dispatch.spotlightModel.getSpotlightSong(userData?.spotlight);
      dispatch.spotlightModel.setSpotlightId(userData?.spotlight);
      dispatch.spotlightModel.setCurrentStep(SpotlightSteps.REPLACE);
    }
    return () => {
      dispatch.spotlightModel.clearState();
    };
  }, []);

  useEffect(() => {
    if (isOpen && !spotlightState?.userId) {
      onClose();
      setTimeout(() => {
        dispatch.modalModel.setModal(null);
      }, 500);
    }
  }, [spotlightState]);

  const handleClose = () => dispatch.spotlightModel.clearState();

  return { isOpen, handleClose };
};

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { useDisclosure } from '@chakra-ui/react';
import { SubmitModelSteps } from '@/modals/screens/submit/models/common';
import { Modals } from '@/modals/models/modalModel';

/**
 * @function useSubmit
 * @description A custom hook that handles the modal open/close and
 * transition logic for the `Submit` modal component.
 */

export const useSubmit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch<Dispatch>();
  const user = useSelector(store.select.authModel.selectUser);
  const tape = useSelector(store.select.tapeModel.selectCurrentTape);
  const submitModalState = useSelector(store.select.submitModel.selectState);
  const prevSubmission = useSelector(store.select.submitModel.selectPrevSubmission);
  const newSubmission = useSelector(store.select.submitModel.selectNewSubmission);

  useEffect(() => {
    onOpen();
    if (!user) {
      dispatch.modalModel.setModal(Modals.CONNECT);
      dispatch.submitModel.clearState();
    }
    if (user) {
      dispatch.submitModel.getUserSongs([user?.id, tape.id]);
      if (submitModalState?.currentStep === undefined) dispatch.submitModel.setCurrentStep(SubmitModelSteps.TERMS);
    }
    return () => {
      dispatch.submitModel.clearState();
    };
  }, []);

  useEffect(() => {
    if (isOpen && submitModalState?.currentStep === undefined) {
      onClose();
      setTimeout(() => {
        dispatch.modalModel.setModal(null);
      }, 500);
    }
  }, [submitModalState]);

  useEffect(() => {
    if (prevSubmission?.id && !newSubmission?.id) dispatch.submitModel.setCurrentStep(SubmitModelSteps.REPLACE);
  }, [prevSubmission]);

  const handleClose = () => dispatch.submitModel.clearState();

  return { isOpen, handleClose };
};

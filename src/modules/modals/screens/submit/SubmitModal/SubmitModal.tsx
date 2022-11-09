import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@headlessui/react';
import { Dispatch, RootState } from '@/store';
import { Divider, Text, HStack, Circle } from '@chakra-ui/react';
import { ModalContainer } from '@/modules/modals/components';
import { SubmitSteps } from '@/modules/modals/screens/submit/models/submitModel';
import {
  PreviousSubmission,
  SubmitSuccess,
  UserAuthWrapper,
  VerifyAndSubmit,
  UploadSubmission,
  RequirementsAndDisclaimer,
} from '@/modules/modals/screens/submit/components';

const SubmitModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const { currentStep } = useSelector((state: RootState) => state.submitModel);
  useEffect(() => {
    return () => {
      dispatch.submitModel.clearModalState();
    };
  }, []);

  return (
    <ModalContainer isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-gray-100 px-6 py-5 text-left align-middle shadow-xl transition-all">
        <Dialog.Title>
          <HStack>
            <Circle size="30px" bg="gray.900" color="white" mr={1}>
              <i className="fa-sharp fa-solid fa-arrow-up-from-bracket text-xs"></i>
            </Circle>
            <Text className="text-xl font-semibold text-gray-900 mb-6">Upload Submission</Text>
          </HStack>
        </Dialog.Title>
        <Divider my={5} />
        <UserAuthWrapper>
          {currentStep === SubmitSteps.REQUIREMENTS_AND_DISCLAIMER && <RequirementsAndDisclaimer />}
          {currentStep === SubmitSteps.UPLOAD_SUBMISSION && <UploadSubmission />}
          {currentStep === SubmitSteps.VERIFY_AND_SUBMIT && <VerifyAndSubmit />}
          {currentStep === SubmitSteps.SUCCESS && <SubmitSuccess />}
          {currentStep === SubmitSteps.PREVIOUS_SUBMISSION && <PreviousSubmission />}
        </UserAuthWrapper>
      </Dialog.Panel>
    </ModalContainer>
  );
};

export default SubmitModal;

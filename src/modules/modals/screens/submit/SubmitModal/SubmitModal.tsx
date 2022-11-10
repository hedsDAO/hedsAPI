import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { SubmitSteps, SubmitModalTitle } from '@/modules/modals/screens/submit/models/common';
import { PrevSubmission, SubmitSuccess, UserAuthWrapper, VerifyAndSubmit, UploadSubmission, ReqsAndDisclaimer } from '@modals/screens/submit/components';
import { IconUpload } from '@tabler/icons';

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
      <ModalHeader title={SubmitModalTitle} Icon={IconUpload} />
      <UserAuthWrapper>
        {currentStep === SubmitSteps.REQS_AND_DISCLAIMER && <ReqsAndDisclaimer />}
        {currentStep === SubmitSteps.UPLOAD_SUBMISSION && <UploadSubmission />}
        {currentStep === SubmitSteps.VERIFY_AND_SUBMIT && <VerifyAndSubmit />}
        {currentStep === SubmitSteps.SUCCESS && <SubmitSuccess />}
        {currentStep === SubmitSteps.PREVIOUS_SUBMISSION && <PrevSubmission />}
      </UserAuthWrapper>
    </ModalContainer>
  );
};

export default SubmitModal;

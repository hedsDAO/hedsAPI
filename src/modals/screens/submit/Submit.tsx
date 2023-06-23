import { store } from '@/store';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { SubmitModelSteps } from '@/modals/screens/submit/models/common';
import { TermScreen } from '@/modals/screens/submit/components/TermsScreen/TermsScreen';
import { PreviewScreen } from '@/modals/screens/submit/components/PreviewScreen/PreviewScreen';
import { SuccessScreen } from '@/modals/screens/submit/components/SuccessScreen/SuccessScreen';
import { LoadingScreen } from '@/modals/screens/submit/components/LoadingScreen/LoadingScreen';
import { UploadScreen } from '@/modals/screens/submit/components/UploadScreen/UploadScreen';
import { useSubmit } from '@/modals/screens/submit/components/useSubmit/useSubmit';
import { ReplaceScreen } from '@/modals/screens/submit/components/ReplaceScreen/ReplaceScreen';
import * as constants from '@/modals/screens/submit/models/constants';
import * as styles from './styles';

/**
 * @function Submit
 * @returns {JSX.Element} The `Submit` component JSX element.
 * @description A modal component that displays the `Submit` modal for hedsTAPE submissions.
 */

export const Submit = () => {
  const { isOpen, handleClose } = useSubmit();
  const currentStep = useSelector(store.select.submitModel.selectCurrentStep);
  const isUploading = useSelector(store.select.submitModel.selectIsUploading);
  const isLoading = useSelector(store.select.submitModel.selectIsLoading);
  return (
    <Modal closeOnOverlayClick={false} {...styles.$modalStyles} isOpen={isOpen} onClose={isUploading || isLoading ? () => {} : handleClose}>
      <ModalOverlay {...styles.$modalOverlayStyles} />
      <ModalContent {...styles.$modalContentStyles}>
        <ModalHeader {...styles.$modalHeaderStyles}>
          <Text {...styles.$textStyles}>{constants.handleModalHeader(currentStep)}</Text>
        </ModalHeader>
        <ModalCloseButton {...styles.$modalCloseButtonStyles} />
        <ModalBody {...styles.$modalBodyStyles}>
          {currentStep === SubmitModelSteps.TERMS && <TermScreen />}
          {currentStep === SubmitModelSteps.UPLOAD && <UploadScreen />}
          {currentStep === SubmitModelSteps.PREVIEW && <PreviewScreen />}
          {currentStep === SubmitModelSteps.LOADING && <LoadingScreen />}
          {currentStep === SubmitModelSteps.SUCCESS && <SuccessScreen />}
          {currentStep === SubmitModelSteps.REPLACE && <ReplaceScreen />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

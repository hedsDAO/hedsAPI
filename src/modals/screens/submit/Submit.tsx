import { store } from '@/store';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { ContinueButton } from './components/ContinueButton/ContinueButton';
import { CountdownClock } from './components/CountdownClock/CountdownClock';
import { CuratorBox } from './components/CuratorBox/CuratorBox';
import { DisclaimerRadio } from './components/DisclaimerRadio/DisclaimerRadio';
import { DisclaimerText } from './components/DisclaimerText/DisclaimerText';
import { PreviewSubmission } from './components/PreviewSubmission/PreviewSubmission';
import { SuccessScreen } from './components/SuccessScreen/SuccessScreen';
import { UploadingScreen } from './components/UploadingScreen/UploadingScreen';
import UploadSub from './components/UploadSubmission/UploadSubmission';
import * as constants from './models/constants';
import { SubmitModelSteps } from './models/submitModel';

/**
 * @function Submit
 * @returns {JSX.Element} The `Submit` component JSX element.
 * @description A modal component that displays the `Submit` modal for hedsTAPE submissions.
 */

export const Submit = () => {
  const tape = useSelector(store.select.tapeModel.selectCurrentTape);
  const currentStep = useSelector(store.select.submitModel.selectCurrentStep);
  return (
    <Modal size="md" motionPreset="slideInBottom" isCentered isOpen={true} onClose={() => {}}>
      <ModalOverlay bg="heds.bg" />
      <ModalContent rounded="2xl" bg="heds.bg4" m={1} p={2}>
        <ModalHeader fontSize={'md'}>
          <Text color="heds.100" fontFamily={'poppins'} fontWeight="bold" letterSpacing="widest">
            {constants.handleModalHeader(currentStep)}
          </Text>
        </ModalHeader>
        <ModalCloseButton m={2} color="white" />
        <ModalBody gap={8} pb={5} as={Stack}>
          {currentStep === SubmitModelSteps.TERMS && (
            <>
              <CuratorBox />
              <CountdownClock milliseconds={1687287078000} />
              <DisclaimerText />
              <Stack gap={4} alignItems={'center'}>
                <DisclaimerRadio />
                <ContinueButton />
              </Stack>
            </>
          )}
          {currentStep === SubmitModelSteps.UPLOAD && <UploadSub />}
          {currentStep === SubmitModelSteps.PREVIEW && <PreviewSubmission />}
          {currentStep === SubmitModelSteps.UPLOADING && <UploadingScreen />}
          {currentStep === SubmitModelSteps.SUCCESS && <SuccessScreen />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

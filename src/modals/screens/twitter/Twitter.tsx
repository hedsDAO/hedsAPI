import { useSelector } from 'react-redux';
import { GenerateAndCopyTweet } from '@/modals/screens/twitter/components/GenerateAndCopyTweet/GenerateAndCopyTweet';
import { useTwitter } from '@/modals/screens/twitter/components/useTwitter/useTwitter';
import { VerifyTweet } from '@/modals/screens/twitter/components/VerifyTweet/VerifyTweet';
import { Confirm } from '@/modals/screens/twitter/components/Confirm/Confirm';
import { TwitterModalSteps } from '@/modals/screens/twitter/models/common';
import { TWITTER_MODAL_HEADING } from '@/modals/screens/twitter/models/constants';
import { store } from '@/store';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';

export const Twitter = () => {
  const { isOpen, handleClose } = useTwitter();
  const currentStep = useSelector(store.select.twitterModel.selectCurrentStep);
  return (
    <Modal size="lg" motionPreset="slideInBottom" isCentered isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent rounded="xl" m={2}>
        <ModalHeader>
          <Text fontWeight={'bold'} color="heds.200" fontSize={'md'} letterSpacing="widest">
            {TWITTER_MODAL_HEADING}
          </Text>
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          {currentStep === TwitterModalSteps.GENERATE_AND_COPY_TWEET && <GenerateAndCopyTweet />}
          {currentStep === TwitterModalSteps.VERIFY_TWEET && <VerifyTweet />}
          {currentStep === TwitterModalSteps.CONFIRM && <Confirm />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

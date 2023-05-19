import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { Confirm } from '@/modals/screens/twitter/components/Confirm/Confirm';
import { GenerateAndCopyTweet } from '@/modals/screens/twitter/components/GenerateAndCopyTweet/GenerateAndCopyTweet';
import { useTwitter } from '@/modals/screens/twitter/components/useTwitter/useTwitter';
import { VerifyTweet } from '@/modals/screens/twitter/components/VerifyTweet/VerifyTweet';
import { TwitterModalSteps } from '@/modals/screens/twitter/models/common';
import * as constants from '@/modals/screens/twitter/models/constants';
import * as styles from '@/modals/screens/twitter/styles';

export const Twitter = () => {
  const { isOpen, handleClose } = useTwitter();
  const currentStep = useSelector(store.select.twitterModel.selectCurrentStep);
  return (
    <Modal {...styles.$twitterModalStyles} isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent {...styles.$twitterModalContentStyles}>
        <ModalHeader>
          <Text {...styles.$twitterModalHeaderStyles}>{constants.TWITTER_MODAL_HEADING}</Text>
        </ModalHeader>
        <ModalCloseButton {...styles.$twitterModalCloseButtonStyles} />
        <ModalBody>
          {currentStep === TwitterModalSteps.GENERATE_AND_COPY_TWEET && <GenerateAndCopyTweet />}
          {currentStep === TwitterModalSteps.VERIFY_TWEET && <VerifyTweet />}
          {currentStep === TwitterModalSteps.CONFIRM && <Confirm />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

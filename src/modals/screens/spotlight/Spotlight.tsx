import { useSelector } from 'react-redux';
import { ConfirmScreen } from '@/modals/screens/spotlight/components/ConfirmScreen/ConfirmScreen';
import { ReplaceScreen } from '@/modals/screens/spotlight/components/ReplaceScreen/ReplaceScreen';
import { SearchScreen } from '@/modals/screens/spotlight/components/SearchScreen/SearchScreen';
import { useSpotlight } from '@/modals/screens/spotlight/components/useSpotlight/useSpotlight';
import { store } from '@/store';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { SpotlightSteps } from '@/modals/screens/spotlight/models/common';

/**
 * @function Spotlight
 * @returns {JSX.Element} The `Spotlight` component JSX element.
 * @description Displays a modal for editing and updating a user's spotlight song.
 */

export const Spotlight = () => {
  const { isOpen, handleClose } = useSpotlight();
  const currentStep = useSelector(store.select.spotlightModel.selectCurrentStep);
  return (
    <Modal size="lg" motionPreset="slideInBottom" isCentered isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent minH="10vh" m={1}>
        <ModalHeader>
          <Text color="white" fontSize={'sm'} fontFamily={'inter'} letterSpacing="widest">
            SPOTLIGHT
          </Text>
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          {currentStep === SpotlightSteps.REPLACE && <ReplaceScreen />}
          {currentStep === SpotlightSteps.CONFIRM && <ConfirmScreen />}
          {currentStep === SpotlightSteps.SEARCH && <SearchScreen />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

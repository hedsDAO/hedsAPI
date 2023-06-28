import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { ConfirmScreen } from '@/modals/screens/spotlight/components/ConfirmScreen/ConfirmScreen';
import { ReplaceScreen } from '@/modals/screens/spotlight/components/ReplaceScreen/ReplaceScreen';
import { SearchScreen } from '@/modals/screens/spotlight/components/SearchScreen/SearchScreen';
import { useSpotlight } from '@/modals/screens/spotlight/components/useSpotlight/useSpotlight';
import { SpotlightSteps } from '@/modals/screens/spotlight/models/common';
import * as constants from '@/modals/screens/spotlight/models/constants';
import * as styles from '@/modals/screens/spotlight/styles';

/**
 * @function Spotlight
 * @returns {JSX.Element} The `Spotlight` component JSX element.
 * @description Displays a modal for editing and updating a user's spotlight song.
 */

export const Spotlight = () => {
  const { isOpen, handleClose } = useSpotlight();
  const currentStep = useSelector(store.select.spotlightModel.selectCurrentStep);
  return (
    <Modal {...styles.$spotlightModalStyles} onClose={handleClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent {...styles.$spotlightModalContentStyles}>
        <ModalHeader>
          <Text {...styles.$spotlightHeaderTextStyles}>{constants.SPOTLIGHT_MODAL_HEADER}</Text>
        </ModalHeader>
        <ModalCloseButton {...styles.$spotlightCloseButtonStyles} />
        <ModalBody>
          {currentStep === SpotlightSteps.REPLACE && <ReplaceScreen />}
          {currentStep === SpotlightSteps.CONFIRM && <ConfirmScreen />}
          {currentStep === SpotlightSteps.SEARCH && <SearchScreen />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

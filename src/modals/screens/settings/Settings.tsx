import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { BannerForm } from '@/modals/screens/settings/components/BannerForm/BannerForm';
import { ButtonGroup } from '@/modals/screens/settings/components/ButtonGroup/ButtonGroup';
import { DescriptionForm } from '@/modals/screens/settings/components/DescriptionForm/DescriptionForm';
import { ProfilePictureForm } from '@/modals/screens/settings/components/ProfilePictureForm/ProfilePictureForm';
import { useSettings } from '@/modals/screens/settings/components/useSettings/useSettings';
import { SETTINGS_MODAL_TITLE } from '@/modals/screens/settings/models/constants';

/**
 * @function Settings
 * @returns {JSX.Element} The `Settings` component JSX element.
 * @description Displays a modal for editing user settings, such as the user's
 * banner, profile picture, and description. Includes form components for each
 * editable setting and a button group for saving changes.
 */

export const Settings = () => {
  const { isOpen, handleClose } = useSettings();
  return (
    <Modal size="lg" motionPreset="slideInBottom" isCentered isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent m={1}>
        <ModalHeader>
          <Text color="white" fontSize={'sm'} fontFamily={'inter'} letterSpacing="widest">
            {SETTINGS_MODAL_TITLE}
          </Text>
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <BannerForm />
          <ProfilePictureForm />
          <DescriptionForm />
          <ButtonGroup />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
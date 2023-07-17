import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useBoolean } from '@chakra-ui/react';
import { BannerForm } from '@/modals/screens/settings/components/BannerForm/BannerForm';
import { ButtonGroup } from '@/modals/screens/settings/components/ButtonGroup/ButtonGroup';
import { DescriptionForm } from '@/modals/screens/settings/components/DescriptionForm/DescriptionForm';
import { ProfilePictureForm } from '@/modals/screens/settings/components/ProfilePictureForm/ProfilePictureForm';
import { TwitterForm } from '@/modals/screens/settings/components/TwitterForm/TwitterForm';
import { useSettings } from '@/modals/screens/settings/components/useSettings/useSettings';
import * as constants from '@/modals/screens/settings/models/constants';

/**
 * @function Settings
 * @returns {JSX.Element} The `Settings` component JSX element.
 * @description Displays a modal for editing user settings, such as the user's
 * banner, profile picture, twitter handle and description. Includes form components for each
 * editable setting and a button group for saving changes.
 */

export const Settings = () => {
  const [isOnTapePageWithoutTwitter, setIsOnTapePageWithoutTwitter] = useBoolean(false);
  const { isOpen, handleClose } = useSettings();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes('tape')) setIsOnTapePageWithoutTwitter.on();
    return () => {
      setIsOnTapePageWithoutTwitter.off();
    };
  }, [pathname]);

  return (
    <Modal size="lg" motionPreset="slideInBottom" isCentered isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent m={1}>
        <ModalHeader>
          <Text color="white" fontSize={'sm'} fontFamily={'inter'} letterSpacing="widest">
            {isOnTapePageWithoutTwitter ? constants.SETTINGS_MODAL_TITLE_TAPE_REDIRECT : constants.SETTINGS_MODAL_TITLE}
          </Text>
        </ModalHeader>
        <ModalCloseButton color="white" />
        {isOnTapePageWithoutTwitter ? (
          <ModalBody>
            <TwitterForm />
            <ButtonGroup />
          </ModalBody>
        ) : (
          <ModalBody>
            <BannerForm />
            <ProfilePictureForm />
            <TwitterForm />
            <DescriptionForm />
            <ButtonGroup />
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

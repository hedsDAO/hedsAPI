import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Stack, StackDivider } from '@chakra-ui/react';
import { Dispatch, RootState } from '@/store';
import { DescriptionForm, ProfilePictureForm, BannerForm } from '@/modules/modals/screens/settings/components';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { IconPencil } from '@tabler/icons';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { BACK_BUTTON_TEXT, SAVE_BUTTON_TEXT, SETTINGS_MODAL_TITLE } from '../models/constants';

const SettingsModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const { connectedUser } = useSelector((state: RootState) => state.userModel);
  const { profileChanges, isLoading } = useSelector((state: RootState) => state.settingsModel);
  const profileModalData = useSelector((state: RootState) => state.settingsModel);
  useEffect(() => {
    if (connectedUser) dispatch.settingsModel.setProfileModelData(connectedUser);
    return () => {
      dispatch.settingsModel.clearProfileModalState();
    };
  }, []);

  return (
    <ModalContainer size="md" isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <ModalHeader Icon={IconPencil} title={SETTINGS_MODAL_TITLE} />
      <Stack spacing="4" divider={<StackDivider />}>
        <ProfilePictureForm />
        <BannerForm />
        <DescriptionForm />
        <Flex gap={2}>
          <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{BACK_BUTTON_TEXT}</SecondaryButton>
          <PrimaryButton
            isLoading={isLoading}
            onClick={() => dispatch.settingsModel.handleSubmit([connectedUser, profileModalData])}
            disabled={JSON.stringify(connectedUser) === JSON.stringify(profileChanges)}
          >
            {SAVE_BUTTON_TEXT}
          </PrimaryButton>
        </Flex>
      </Stack>
    </ModalContainer>
  );
};

export default SettingsModal;

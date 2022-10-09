import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, Stack, StackDivider } from '@chakra-ui/react';
import { Dispatch, RootState } from '@/store';
import { Dialog } from '@headlessui/react';
import { DescriptionForm, ProfilePictureForm, ProfileVisibilityForm } from '@/modals/screens/settings/components';
import { ModalContainer } from '@/common/containers/ModalContainer/ModalContainer';

export const SettingsModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const userData = useSelector((state: RootState) => state.userModel);
  const { profileChanges, loading, file } = useSelector((state: RootState) => state.settingsModel);
  const profileModalData = useSelector((state: RootState) => state.settingsModel);
  useEffect(() => {
    if (userData) dispatch.settingsModel.setProfileModelData(userData);
    return () => {
      dispatch.settingsModel.clearProfileModalState();
    };
  }, []);

  return (
    <ModalContainer isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Title as="h2" className="text-2xl font-semibold text-gray-900 mb-6">
          Edit Profile
        </Dialog.Title>
        <Stack spacing="5" divider={<StackDivider />}>
          <ProfileVisibilityForm />
          <DescriptionForm />
          <ProfilePictureForm />
          <Flex gap={2} className="mt-6">
            <Button onClick={() => dispatch.modalModel.setModalOpen(false)} bg="gray.200">
              Back
            </Button>
            <Button
              isLoading={loading}
              onClick={() => dispatch.settingsModel.handleSubmit([userData, profileModalData])}
              disabled={JSON.stringify(userData) === JSON.stringify(profileChanges) && !file}
              bg="green.200"
            >
              Save
            </Button>
          </Flex>
        </Stack>
      </Dialog.Panel>
    </ModalContainer>
  );
};

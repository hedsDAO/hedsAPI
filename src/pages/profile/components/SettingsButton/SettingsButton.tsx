import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import { Button, Flex } from '@chakra-ui/react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Modals } from '@/modules/modals/store/modalModel';

const SettingsButton = () => {
  const dispatch = useDispatch<Dispatch>();
  return (
    <Flex gap={2} alignItems={'stretch'}>
    <Button
      onClick={() => {
        dispatch.modalModel.setModal(Modals.SETTINGS_MODAL);
        dispatch.modalModel.setModalOpen(true);
      }}
      bg="gray.50"
      size="xs"
      borderColor={'gray.200'}
      className="relative bottom-10 left-2 -mb-10 border opacity-75 hover:opacity-100"
      aria-label="edit profile"
      leftIcon={<Cog6ToothIcon className="text-gray-700 -mr-0.5" width={16} height={16} />}
    >
      Edit profile
    </Button>
    </Flex>
  );
};

export default SettingsButton;

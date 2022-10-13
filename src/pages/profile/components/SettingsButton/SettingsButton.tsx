import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import { Button } from '@chakra-ui/react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Modals } from '@/modules/modals/store/modalModel';

const SettingsButton = () => {
  const dispatch = useDispatch<Dispatch>();
  return (
    <Button
      onClick={() => {
        dispatch.modalModel.setModal(Modals.SETTINGS_MODAL);
        dispatch.modalModel.setModalOpen(true);
      }}
      bg="gray.200"
      size="xs"
      className="relative bottom-10 left-2 -mb-10"
      aria-label="edit profile"
      leftIcon={<Cog6ToothIcon className="text-gray-700 -mr-0.5" width={16} height={16} />}
    >
      Edit profile
    </Button>
  );
};

export default SettingsButton;

import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import { Button } from '@chakra-ui/react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { Modals } from '@/modules/modals/global/models/modalModel';

const NameButton = () => {
  const dispatch = useDispatch<Dispatch>();
  return (
    <Button
      onClick={() => {
        dispatch.modalModel.setModal(Modals.NAME_MODAL);
        dispatch.modalModel.setModalOpen(true);
      }}
      size="xs"
      className=""
      aria-label="edit profile"
      leftIcon={<PencilIcon className="text-gray-700" width={16} height={16} />}
    >
      Edit Name
    </Button>
  );
};

export default NameButton;

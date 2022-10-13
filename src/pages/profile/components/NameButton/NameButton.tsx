import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import { Button, Flex, IconButton } from '@chakra-ui/react';
import { PencilIcon } from '@heroicons/react/24/solid';
import { Modals } from '@/modules/modals/store/modalModel';

const NameButton = () => {
  const dispatch = useDispatch<Dispatch>();
  return (
    <Flex h='full' alignItems={'center'} px={1}>
    <IconButton
      onClick={() => {
        dispatch.modalModel.setModal(Modals.NAME_MODAL);
        dispatch.modalModel.setModalOpen(true);
      }}
      size="xs"
      bg={'transparent'}
      _hover={{bg: 'gray.50'}}
      className=""
      aria-label="edit profile"
      icon={<PencilIcon className="text-gray-700" width={14} height={14} />}
    />
    </Flex>
  );
};

export default NameButton;

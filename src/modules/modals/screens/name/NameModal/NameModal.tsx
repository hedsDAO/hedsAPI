import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { FormControl, FormLabel, Input, Stack, StackDivider } from '@chakra-ui/react';
import { IconPencil } from '@tabler/icons';
import { NAME_MODAL_LABEL, NAME_MODAL_TEXT } from '../models/constants';

const NameModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  return (
    // TODO: revert for locked modal state.
    <ModalContainer isOpen={isOpen} setModalOpen={false ? () => dispatch.modalModel.setModalOpen(!isOpen) : () => {}}>
      <ModalHeader title={NAME_MODAL_TEXT} Icon={IconPencil} />
      <Stack spacing="5" divider={<StackDivider />}>
        <FormControl>
          <FormLabel whiteSpace={'nowrap'}>{NAME_MODAL_LABEL}</FormLabel>
          <Input />
          {/* {descCharacters ? <FormHelperText> {130 - descCharacters} remaining.</FormHelperText> : <></>} */}
        </FormControl>
      </Stack>
    </ModalContainer>
  );
};

export default NameModal;

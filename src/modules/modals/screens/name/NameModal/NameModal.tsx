import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { ModalContainer } from '@/modules/modals/global/components';
import { Dialog } from '@headlessui/react';
import { FormControl, FormLabel, Input, Stack, StackDivider } from '@chakra-ui/react';

export const NameModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  return (
    <ModalContainer isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Title as="h2" className="text-2xl font-semibold text-gray-900 mb-6">
          Edit Display Name
        </Dialog.Title>
        <Stack spacing="5" divider={<StackDivider />}>
          <FormControl>
            <FormLabel whiteSpace={'nowrap'}>Display Name</FormLabel>
            <Input />
            {/* {descCharacters ? <FormHelperText> {130 - descCharacters} remaining.</FormHelperText> : <></>} */}
          </FormControl>
        </Stack>
      </Dialog.Panel>
    </ModalContainer>
  );
};



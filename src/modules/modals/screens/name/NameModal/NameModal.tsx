import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { Divider, Flex, FormControl, FormHelperText, FormLabel, Input, Stack, StackDivider, Text, VStack } from '@chakra-ui/react';
import { IconPencil } from '@tabler/icons';
import { NAME_MODAL_LABEL, NAME_MODAL_TEXT } from '../models/constants';
import { PrimaryButton } from '@/common/buttons';

const NameModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  return (
    <ModalContainer focus="100" size="sm" isOpen={isOpen} setModalOpen={false ? () => dispatch.modalModel.setModalOpen(!isOpen) : () => {}}>
      <ModalHeader title={NAME_MODAL_TEXT} Icon={IconPencil} />
      <VStack alignItems={'start'} spacing={3}>
        <Text fontSize={'sm'}>This will be your name that is visible to members in the heds community.</Text>
        <Text fontSize={'sm'}>You will not be able to change this.</Text>
        <Divider my={5} />
        <Stack w="full" divider={<StackDivider />}>
          <FormControl>
            <FormLabel whiteSpace={'nowrap'}>{NAME_MODAL_LABEL}</FormLabel>
            <Input />
            <FormHelperText>{15} chars remaining.</FormHelperText>
            {/* <FormHelperText fontSize={'xs'}>Your username can only contain letters, numbers and '_'</FormHelperText> */}
          </FormControl>
        </Stack>
      </VStack>
      <Divider my={5} />
      <Flex gap={2}>
        <PrimaryButton disabled>Confirm</PrimaryButton>
      </Flex>
    </ModalContainer>
  );
};

export default NameModal;

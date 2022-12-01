import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState, store } from '@/store';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { Divider, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, Stack, StackDivider, Text, VStack } from '@chakra-ui/react';
import { IconPencil } from '@tabler/icons';
import { NAME_MODAL_LABEL, NAME_MODAL_TEXT } from '../models/constants';
import { PrimaryButton } from '@/common/buttons';
import { useState } from 'react';
import { useAccount } from 'wagmi';

const NameModal = () => {
  const [displayName, setDisplayName] = useState<string>();
  const dispatch = useDispatch<Dispatch>();
  const { address } = useAccount();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const isOnOwnPage = useSelector(store.select.userModel.selectIsOwnPage);
  return (
    <ModalContainer focus="100" size="sm" isOpen={isOpen} setModalOpen={false ? () => dispatch.modalModel.setModalOpen(!isOpen) : () => {}}>
      <ModalHeader title={NAME_MODAL_TEXT} Icon={IconPencil} />
      <VStack alignItems={'start'} spacing={5}>
        <Heading fontSize="lg">Welcome to Heds.</Heading>
        <Text fontSize={'sm'}>
          This will be your name that is visible to members in the heds community.
          <span className="font-semibold text-sm ml-1">You will not be able to change this.</span>
        </Text>
        <Divider my={5} />
        <Stack w="full" divider={<StackDivider />}>
          <FormControl>
            <FormLabel whiteSpace={'nowrap'}>{NAME_MODAL_LABEL}</FormLabel>
            <Input onChange={(e) => setDisplayName(e.target.value)} max={15} min={4} />
            <FormHelperText fontSize={'xs'}>{15} characters remaining.</FormHelperText>
            {/* <FormHelperText fontSize={'xs'}>Your username can only contain letters, numbers and '_'</FormHelperText> */}
          </FormControl>
        </Stack>
      </VStack>
      <Divider my={5} />
      <Flex gap={2}>
        <PrimaryButton
          onClick={() => {
            dispatch.userModel.createNewUser([address.toLowerCase(), displayName, isOnOwnPage]);
            dispatch.modalModel.setModalOpen(false);

          }}
        >
          Confirm
        </PrimaryButton>
      </Flex>
    </ModalContainer>
  );
};

export default NameModal;

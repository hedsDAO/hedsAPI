import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState, store } from '@/store';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { Divider, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, Stack, StackDivider, Text, VStack } from '@chakra-ui/react';
import { IconPencil } from '@tabler/icons';
import { NAME_MODAL_LABEL, NAME_MODAL_TEXT } from '../models/constants';
import { PrimaryButton } from '@/common/buttons';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

const NameModal = () => {
  const displayName = useSelector(store.select.nameModel.selectDisplayName);
  const isLoading = useSelector(store.select.nameModel.selectIsLoading);
  const error = useSelector(store.select.nameModel.selectError);
  const dispatch = useDispatch<Dispatch>();
  const { address, isConnected } = useAccount();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const isOnOwnPage = useSelector(store.select.userModel.selectIsOwnPage);
  const connectedUserData = useSelector(store.select.userModel.selectConnectedUser);

  useEffect(() => {
    if (error?.length) {
      setTimeout(() => {
        dispatch.nameModel.setError('');
      }, 2500);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch.userModel.getCurrentUserData(address.toLowerCase());
    };
  }, [isConnected]);
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
            <Input
              type="text"
              value={displayName}
              onChange={(e) => {
                if (e.target.value?.length > 15) return;
                else if (e.target.value?.length > displayName?.length - 1) {
                  var reg = /^[a-zA-Z ]*$/;
                  if (reg.test(e.target.value)) {
                    dispatch.nameModel.setDisplayName(e.target.value);
                  }
                } else {
                  dispatch.nameModel.setDisplayName(e.target.value);
                }
              }}
            />
            {error ? (
              <FormHelperText px={1} textColor="red.500" fontSize={'xs'}>
                {error}
              </FormHelperText>
            ) : (
              <FormHelperText px={1} fontSize={'xs'}>
                {15 - displayName.length} characters remaining.
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
      </VStack>
      <Divider my={5} />
      <Flex gap={2}>
        <PrimaryButton
          isLoading={isLoading}
          disabled={displayName.length < 4 || displayName.length > 15 || !!error?.length}
          onClick={() => {
            dispatch.nameModel.validateDisplayName([displayName, address, isOnOwnPage, connectedUserData]);
          }}
        >
          Confirm
        </PrimaryButton>
      </Flex>
    </ModalContainer>
  );
};

export default NameModal;

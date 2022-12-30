import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { Dispatch, RootState, store } from '@/store';
import { Button, Divider, Flex, Heading, Text, useColorMode } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IconHomeCog, IconPower } from '@tabler/icons';
import { formatWallet } from '@/utils';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';
import { Switch } from '@headlessui/react';

const UserModal = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const wallet = useSelector(store.select.userModel.selectConnectedUserWallet);
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address: address });

  return (
    <ModalContainer size={'sm'} isOpen={isOpen} setModalOpen={(isOpen: boolean) => dispatch.modalModel.setModalOpen(isOpen)}>
      <ModalHeader Icon={IconHomeCog} title={'Account'} />
      <Flex direction={'column'} alignItems={'center'} justifyContent="center">
        <Heading mb={2} fontSize={'md'}>
          Connected:
        </Heading>
        <Text mb={4}>{ensName || formatWallet(address)}</Text>
        <Button
          bg="blackAlpha.800"
          color="white"
          size="sm"
          variant={'outline'}
          onClick={() => {
            disconnect();
            dispatch.userModel.clearConnectedUserState();
            dispatch.modalModel.setModalOpen(false);
          }}
          leftIcon={<IconPower height="18" width="18" />}
          aria-label="disconnect"
        >
          disconnect
        </Button>
        {/* TODO: add dark mode feature (stretch) */}
        {/* <Divider my={5} />
        <Heading mb={2} fontSize={'md'}>
          Experimental:
        </Heading>
        <Text mb={4}>{'dark mode'}</Text>
        <Switch
          checked={colorMode === 'dark'}
          onChange={toggleColorMode}
          className={`${colorMode === 'dark' ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span className={`${colorMode === 'dark' ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
        </Switch> */}
      </Flex>
    </ModalContainer>
  );
};

export default UserModal;

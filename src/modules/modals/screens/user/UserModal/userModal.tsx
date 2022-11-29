import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { Dispatch, RootState, store } from '@/store';
import { Container, Flex, IconButton, useColorMode } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IconHomeCog, IconPower } from '@tabler/icons';
import { formatWallet } from '@/utils';
import { useDisconnect } from 'wagmi';
import { Switch } from '@headlessui/react';

const UserModal = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const wallet = useSelector(store.select.userModel.selectConnectedUserWallet);
  const { disconnect } = useDisconnect();
  return (
    <ModalContainer size={'sm'} isOpen={isOpen} setModalOpen={(isOpen: boolean) => dispatch.modalModel.setModalOpen(isOpen)}>
      <ModalHeader Icon={IconHomeCog} title={formatWallet(wallet)} />
      <Flex direction={'column'} alignItems={'center'} justifyContent="center">
        <IconButton
          onClick={() => {
            disconnect();
            dispatch.userModel.clearConnectedUserState();
            dispatch.modalModel.setModalOpen(false);
          }}
          as={IconPower}
          aria-label="disconnect"
        />
        <Switch
          checked={colorMode === 'dark'}
          onChange={toggleColorMode}
          className={`bg-neutral-300 relative inline-flex h-6 w-11 lg:h-7 lg:w-12 items-center rounded-full`}
        >
          <span
            className={`${
              colorMode === 'dark' ? 'translate-x-6 bg-neutral-900' : 'translate-x-1 bg-neutral-900'
            } flex items-center text-center justify-center h-4 w-4 lg:h-5 lg:w-5 transform rounded-full transition`}
          >
            {colorMode === 'light' ? 'Dark' : 'Light'}
          </span>
        </Switch>
      </Flex>
    </ModalContainer>
  );
};

export default UserModal;

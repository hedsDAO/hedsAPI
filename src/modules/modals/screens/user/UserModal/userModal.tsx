import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { Dispatch, RootState, store } from '@/store';
import { Container, Flex, IconButton } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IconHomeCog, IconPower } from '@tabler/icons';
import { formatWallet } from '@/utils';
import { useDisconnect } from 'wagmi';
import { Switch } from '@headlessui/react';
import { useEffect, useState } from 'react';

const UserModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const wallet = useSelector(store.select.userModel.selectConnectedUserWallet);
  const [enabled, setEnabled] = useState<boolean>(false);
  const { disconnect } = useDisconnect();
  const toggleTheme = () => {
    setEnabled(!enabled);
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('color-theme')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else if (localStorage.getItem('color-theme') === 'light') {
      setEnabled(false);
    } else setEnabled(true);
  }, []);

  return (
    <ModalContainer size={'sm'} isOpen={isOpen} setModalOpen={(isOpen: boolean) => dispatch.modalModel.setModalOpen(isOpen)}>
      <ModalHeader Icon={IconHomeCog} title={formatWallet(wallet)} />
      <Flex direction={'column'} alignItems={'center'} justifyContent="center">
        <IconButton
          onClick={() => {
            disconnect();
            dispatch.modalModel.setModalOpen(false);
          }}
          as={IconPower}
          aria-label="disconnect"
        />
        <Switch checked={enabled} onChange={() => toggleTheme()} className={`relative inline-flex h-6 w-11 lg:h-7 lg:w-12 items-center rounded-full`}>
          <span
            className={`${
              enabled ? 'translate-x-6 bg-neutral-900' : 'translate-x-1 bg-neutral-900'
            } flex items-center text-center justify-center h-4 w-4 lg:h-5 lg:w-5 transform rounded-full transition`}
          ></span>
        </Switch>
      </Flex>
    </ModalContainer>
  );
};

export default UserModal;

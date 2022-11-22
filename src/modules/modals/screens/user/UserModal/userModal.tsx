import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { Dispatch, RootState, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { IconHomeCog } from '@tabler/icons';
import { formatWallet } from '@/utils';
import { Switch } from '@headlessui/react';

const UserModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const wallet = useSelector(store.select.userModel.selectConnectedUserWallet);
  return (
    <ModalContainer size={'sm'} isOpen={isOpen} setModalOpen={(isOpen: boolean) => dispatch.modalModel.setModalOpen(isOpen)}>
      <ModalHeader Icon={IconHomeCog} title={formatWallet(wallet)} />
      <Switch checked={true} onChange={() => {}} className={`${true ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}>
        <span className={`${true ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`} />
      </Switch>
    </ModalContainer>
  );
};

export default UserModal;

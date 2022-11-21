import { Modals } from '@/modules/modals/store/modalModel';
import { Dispatch } from '@/store';
import { Flex } from '@chakra-ui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAccount, useDisconnect, useEnsName } from 'wagmi';

const ConnectButton = ({ nextModal }: { nextModal?: Modals }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data, isLoading } = useEnsName({ address: address });

  return (
    <Flex gap={1}>
      <button
        onClick={() => {
          if (isConnected) navigate('/profile');
          else {
            if (nextModal) dispatch.modalModel.setNextModal(nextModal);
            dispatch.modalModel.setModal(Modals.CONNECT_MODAL);
            dispatch.modalModel.setModalOpen(true);
          }
        }}
        className={`px-6 text-white inline-flex items-center rounded-full tracking-widest text-sm py-1 ${
          isConnected ? 'bg-black' : 'gradient'
        } hover:bg-neutral-900 ease-linear`}
      >
        {isConnected && !isLoading ? data || address.slice(0, 5) + '...' : 'connect'}
      </button>
      {isConnected ? (
        <button onClick={() => disconnect()} className={`px-2.5 text-white inline-flex items-center rounded-full tracking-widest text-sm py-1 bg-black`}>
          <EllipsisHorizontalIcon className="h-5 w-5 text-gray-100" />
        </button>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default ConnectButton;

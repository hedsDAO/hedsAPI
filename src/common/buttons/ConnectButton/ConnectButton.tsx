import { Modals } from '@/modules/modals/store/modalModel';
import { Dispatch, store } from '@/store';
import { Avatar, Badge, Flex, IconButton, Spinner } from '@chakra-ui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

const ConnectButton = ({ nextModal }: { nextModal?: Modals }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch>();
  const { isConnected, address, isReconnecting, isConnecting } = useAccount();
  const profilePicture = useSelector(store.select.userModel.selectConnectedUserProfilePicture);
  return (
    <Flex gap={2}>
      {isConnected && profilePicture ? (
        <Flex mr={{ base: -2, lg: 0 }} pl={{ base: 1, lg: 0 }} alignSelf={{ lg: 'end' }} alignItems={{ lg: 'end' }}>
          <Avatar
            className="hover:scale-105 ease-in-out transition-all cursor-pointer"
            onClick={() => navigate(`/u/${address}`)}
            size={'md'}
            src={profilePicture}
          ></Avatar>
          <Badge
            onClick={() => {
              dispatch.modalModel.setModal(Modals.USER_MODAL);
              dispatch.modalModel.setModalOpen(true);
            }}
            border="2px"
            borderColor="white"
            minW="fit-content"
            borderRadius="full"
            boxSize="2.25em"
            alignSelf={'end'}
            className="-ml-[20%] aspect-square"
            as={IconButton}
            icon={<EllipsisHorizontalIcon className="text-neutral-700 " height="15" width="15" />}
          />
        </Flex>
      ) : (
        <button
          onClick={() => {
            if (isConnected) navigate(`/u/${address}`);
            else {
              if (nextModal) dispatch.modalModel.setNextModal(nextModal);
              dispatch.modalModel.setModal(Modals.CONNECT_MODAL);
              dispatch.modalModel.setModalOpen(true);
            }
          }}
          className={`mr-2 px-5 lg:px-6 text-white inline-flex items-center rounded-full tracking-widest text-xs lg:text-sm py-1 ${
            isConnected ? 'bg-black' : 'gradient'
          } hover:bg-neutral-900 ease-linear`}
        >
          {isConnecting || isReconnecting ? (
            <>
              <Spinner mx={5} size={'sm'} />
            </>
          ) : (
            'connect'
          )}
        </button>
      )}
    </Flex>
  );
};

export default ConnectButton;

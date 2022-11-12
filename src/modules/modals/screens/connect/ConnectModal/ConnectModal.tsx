import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { WalletConnectIcon, MetamaskIcon } from '@/common/icons';
import { useAccount, useConnect } from 'wagmi';
import { IconLink } from '@tabler/icons';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

const ConnectModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen, nextModal } = useSelector((state: RootState) => state.modalModel);
  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  useEffect(() => {
    if (isConnected) {
      if (nextModal) dispatch.modalModel.setModal(nextModal);
      else dispatch.modalModel.setModalOpen(false);
    }
  }, [isConnected]);
  return (
    <ModalContainer size="sm" isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <ModalHeader title={'Connect Wallet'} Icon={IconLink} />
      <Flex gap={2} direction={'column'}>
        {connectors.map((connector) => {
          return (
            <Button
              isLoading={isLoading && pendingConnector?.id === connector.id}
              key={connector.id}
              disabled={!connector.ready || isLoading}
              onClick={() => connect({ connector })}
            >
              <Flex gap={2}>
                {connector.name === 'MetaMask' && <MetamaskIcon />}
                {connector.name === 'WalletConnect' && <WalletConnectIcon />}
                <Text>{connector.name}</Text>
              </Flex>
            </Button>
          );
        })}
      </Flex>
    </ModalContainer>
  );
};

export default ConnectModal;

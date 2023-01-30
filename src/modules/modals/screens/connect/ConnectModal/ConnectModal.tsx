import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { WalletConnectIcon, MetamaskIcon } from '@/common/icons';
import { useAccount, useConnect } from 'wagmi';
import { IconLink } from '@tabler/icons';
import { Button, Flex, Text, useBoolean } from '@chakra-ui/react';
import { useEffect } from 'react';
import * as gaEvents from '@/events';

const ConnectModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen, nextModal } = useSelector((state: RootState) => state.modalModel);
  const { isConnected, address } = useAccount();
  const [ isMetaMask, setIsMetaMask] = useBoolean(true)
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  useEffect(() => {
    if (isConnected) {
      dispatch.userModel.getConnectedUserData(address.toLowerCase());
      if (nextModal) { 
        dispatch.modalModel.setModal(nextModal);
      }
      else {
        dispatch.modalModel.setModalOpen(false);
        isMetaMask ? gaEvents.connectMetamaskSuccess() : gaEvents.connectWalletConnectSuccess();
      };
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
              onClick={() => {
                connect({ connector });
                if (connector.name === 'MetaMask') {
                  gaEvents.connectMetamask();
                  setIsMetaMask.on();
                 } else {
                  gaEvents.connectWalletConnect();
                  setIsMetaMask.off();
                 } 
              }}
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

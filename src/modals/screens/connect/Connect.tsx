import { AspectRatio, Avatar, Box, Button, GridItem, Link, SimpleGrid, Spinner, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';

import MetamaskIcon from '@public/wallets/metamask.svg';
import CoinbaseIcon from '@public/wallets/coinbase.svg';
import ImtokenIcon from '@public/wallets/other/imtoken.svg';
import ZerionIcon from '@public/wallets/other/zerion.svg';
import RainbowIcon from '@public/wallets/other/rainbow.svg';
import WalletConnectIcon from '@public/wallets/other/walletconnect.svg';
import { Fragment, useEffect } from 'react';

const CoinbaseTextReplacement: { [key: string]: string } = { 'Coinbase Wallet': 'Coinbase' };
const IconMapping: { [key: string]: string | string[] } = {
  MetaMask: MetamaskIcon,
  'Coinbase Wallet': CoinbaseIcon,
  WalletConnect: [WalletConnectIcon, ImtokenIcon, RainbowIcon, ZerionIcon],
};

export const Connect = () => {
  const connectedUser = useSelector(store.select.authModel.selectUser);
  const dispatch = useDispatch<Dispatch>();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Modal
      size="xs"
      motionPreset="slideInBottom"
      isCentered
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setTimeout(() => {
          dispatch.modalModel.setModal(null);
        }, 500);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text color="white" fontSize={'sm'} fontFamily={'inter'} letterSpacing="widest">
            CONNECT
          </Text>
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody py="3" px="10" as={Stack}>
          {isConnected && connectedUser ? (
            <Fragment>
              <Button mt={1} onClick={() => disconnect()}>
                Disconnect
              </Button>
            </Fragment>
          ) : (
            <SimpleGrid gap={7} columns={2}>
              {connectors.map((connector) => {
                console.log(connector.name);
                const source: string | string[] = IconMapping[connector.name];
                return (
                  <Fragment key={connector.id}>
                    {isLoading && pendingConnector?.id === connector.id ? (
                      <Stack w="full" h="full" alignItems={'center'} justifyContent="center">
                        <Spinner color="white" key="spinner" size="md" />
                      </Stack>
                    ) : Array.isArray(source) ? (
                      <Box w="full" onClick={() => connect({ connector })}>
                        <GridItem mx="auto" colSpan={2}>
                          <Stack gap={1}>
                            <SimpleGrid placeItems={'center'} gap={1} columns={2}>
                              {source?.map((src: any) => (
                                <GridItem w="full" key={src.name} colSpan={1}>
                                  <Avatar
                                    bg="heds.bg"
                                    transitionDuration=".2s"
                                    transitionTimingFunction="ease-in-out"
                                    _hover={{ transform: 'scale(0.97)' }}
                                    size="full"
                                    borderRadius={'xl'}
                                    src={src}
                                  />
                                </GridItem>
                              ))}
                            </SimpleGrid>
                            <Text textAlign={'center'} color="white" fontSize="2xs" fontFamily={'karla'} opacity="70%">
                              Other Wallets
                            </Text>
                          </Stack>
                        </GridItem>
                      </Box>
                    ) : (
                      <GridItem colSpan={1}>
                        <Box w="full" onClick={() => connect({ connector })}>
                          <Stack h="full" gap={2} textAlign="center">
                            <AspectRatio ratio={1}>
                              <Avatar
                                bg="heds.bg"
                                transitionDuration=".2s"
                                transitionTimingFunction="ease-in-out"
                                _hover={{ transform: 'scale(0.97)' }}
                                size="full"
                                borderRadius={'xl'}
                                src={source}
                              />
                            </AspectRatio>
                            <Text justifySelf={'center'} color="white" fontSize="2xs" fontFamily={'karla'} opacity="70%">
                              {connector.name in CoinbaseTextReplacement ? CoinbaseTextReplacement[connector.name] : connector.name}
                            </Text>
                          </Stack>
                        </Box>
                      </GridItem>
                    )}
                  </Fragment>
                );
              })}
              <GridItem as={Stack} alignItems="center" justifyContent="center" colSpan={1}>
                <Stack
                  href="https://ethereum.org/en/wallets/find-wallet/"
                  target="__blank"
                  alignItems="center"
                  justifyContent="center"
                  rounded="lg"
                  fontSize={'2xs'}
                  color="white"
                  opacity="70%"
                  as={Link}
                  _hover={{ textDecoration: 'none' }}
                  textDecoration={'none'}
                  px={5}
                  py={3}
                >
                  <Text
                    transitionDuration=".2s"
                    transitionTimingFunction="ease-in-out"
                    _hover={{ transform: 'scale(1.05)' }}
                    justifySelf={'center'}
                    fontSize="2xs"
                    fontFamily={'karla'}
                  >
                    find a wallet
                  </Text>
                  <i className="fas fa-arrow-right" />
                </Stack>
              </GridItem>
            </SimpleGrid>
          )}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

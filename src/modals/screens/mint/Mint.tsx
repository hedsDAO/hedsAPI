import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount, useContractRead, erc721ABI } from 'wagmi';

// Components
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Select,
  Skeleton,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

// Utils
import { LanyardMerkleProofProvider } from '@soundxyz/sdk/merkle/lanyard';
import { SoundAPI } from '@soundxyz/sdk/api';
import { SoundClient } from '@soundxyz/sdk';
import { mainnet, goerli } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import axios from 'axios';

// Constants
import { Dispatch, store } from '@/store';
import { Modals } from '@/modals/models/modalModel';

const SOUND_KEY = '3ca9ceee-35f2-4db0-8277-fc1fc553484a';
const LANYARD_API = 'https://lanyard.org/api/v1/tree?root=';

export const Mint = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState<number>(1);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [hasMinted, setHasMinted] = useState<boolean>(false);
  const [isWhiteListed, setIsWhiteListed] = useState<boolean>(false);

  const connectedWallet = useSelector(store.select.userModel.selectWallet);
  const contract = useSelector(store.select.tapeModel.selectCurrentTapeContract);
  const cover = useSelector(store.select.tapeModel.selectTapeCover);
  const sampleArtists = useSelector(store.select.tapeModel.selectSampleArtists);
  const isTapeLoading = useSelector(store.select.tapeModel.selectIsLoading);
  const merkleRoot = '0x41F60DCB50D15915AE00B4F0C480C469F51F2A5A3D38B1B6BA54DBFD29C97334';

  const { isConnected } = useAccount();
  const connector = new MetaMaskConnector({
    chains: [mainnet, goerli],
  });

  const { data, isLoading, refetch, isRefetching } = useContractRead({
    address: contract as `0x${string}`,
    abi: erc721ABI,
    functionName: 'totalSupply',
  });

  const checkWalletInRoot = async () => {
    const response = await axios.get(`${LANYARD_API}${merkleRoot}`);

    if (response.data.unhashedLeaves.includes(connectedWallet)) {
      setIsWhiteListed(true);
    }
  };

  useEffect(() => {
    checkWalletInRoot();
  }, []);

  useEffect(() => {
    onOpen();
  }, []);

  const mintEdition = async (quantity: number) => {
    const signer = await connector?.getSigner();
    const client = SoundClient({
      merkleProvider: LanyardMerkleProofProvider,
      signer,
      soundAPI: SoundAPI({
        apiKey: SOUND_KEY,
      }),
    });

    const editionAddress = contract;
    const mintSchedule = (await client.activeMintSchedules({ editionAddress })).shift();
    if (!mintSchedule) throw Error(`No active mint schedule available!`);

    // Transaction
    const mintTransaction = await (
      await client.mint({
        mintSchedule,
        quantity,
      })
    ).wait();
    return mintTransaction;
  };

  const handleMintStatus = async () => {
    if (!isConnected) {
      console.log('not connected');
      dispatch.modalModel.setModal(Modals.CONNECT);
      return;
    }
    setIsMinting(true);
    try {
      await mintEdition(value);
      setIsMinting(false);
      setHasMinted(true);
    } catch (error) {
      console.error(error);
      setIsMinting(false);
    }

    return;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setTimeout(() => {
          dispatch.modalModel.setModal(null);
        }, 500);
      }}
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent p={3}>
        <ModalCloseButton color="white" />
        <ModalBody p={6}>
          <Text color="#DC89FF">MINT</Text>
          <Stack direction="row" spacing={4} justifyContent="space-around">
            <Stack direction="column" spacing={3} w="30%">
              <Flex justifyContent="space-around">
                {sampleArtists.map((artist) => (
                  <Box display="flex" flexDirection="column" alignItems="center" key={artist.id}>
                    <Avatar size="lg" src={artist.profile_picture} />
                    <Text color="white" size="xs" letterSpacing="widest">
                      {artist.display_name}
                    </Text>
                  </Box>
                ))}
              </Flex>
              {hasMinted ? (
                <>
                  <Text color="white" fontSize="xs" fontFamily="inter">
                    View transaction on Etherscan:
                  </Text>
                  <Text color="white" fontSize="lg" textAlign="center" letterSpacing="wider" fontFamily="inter">
                    Transaction was successful!
                  </Text>
                  <Button>Share on Twitter</Button>
                </>
              ) : (
                <>
                  <Box display="flex" flexDirection="row" justifyContent="space-around" bgColor="#26232D" p={2} borderRadius="md">
                    <Text color="white">PRICE</Text>
                    <Text color="#DC89FF">0.005</Text>
                  </Box>
                  <Box display="flex" flexDirection="row" justifyContent="space-around" bgColor="#26232D" p={2} borderRadius="md">
                    <Text color="white">MINTED</Text>
                    <Text color="#DC89FF">100</Text>
                  </Box>
                  <Select
                    disabled={isMinting}
                    bgColor="#26232D"
                    variant="filled"
                    color="white"
                    placeholder="Quantity"
                    onChange={(e) => setValue(parseInt(e.target.value))}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Select>
                  <Button bgColor="#745CBA" color="white" onClick={handleMintStatus} isLoading={isMinting}>
                    Mint
                  </Button>
                </>
              )}
            </Stack>
            <Center>
              <Skeleton isLoaded={!isTapeLoading}>
                <Image src={cover} alt="tape-cover" boxSize="xs" border="1px" borderColor="heds.400" borderRadius="md" />
              </Skeleton>
            </Center>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

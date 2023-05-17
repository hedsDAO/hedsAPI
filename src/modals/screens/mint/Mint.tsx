import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';

// Components
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Select,
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

  const contract = useSelector(store.select.tapeModel.selectCurrentTapeContract);
  const cover = useSelector(store.select.tapeModel.selectTapeCover);
  const sampleArtists = useSelector(store.select.tapeModel.selectSampleArtists);

  const { isConnected } = useAccount();
  const connector = new MetaMaskConnector({
    chains: [mainnet, goerli],
  });

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
      dispatch.modalModel.setModal(Modals.CONNECT);
      return;
    }
    setIsMinting(true);
    try {
      await mintEdition(value);
      setIsMinting(false);
      setHasMinted(true);
    } catch {
      setIsMinting(false);
    }

    return;
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={true} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent p={3}>
          <ModalCloseButton color="white" />
          <ModalBody p={6}>
            <Text color="#DC89FF">MINT</Text>
            <Stack direction="row" spacing={4} justifyContent="space-around">
              <Stack direction="column" spacing={3} w="30%">
                {sampleArtists.map((artist) => (
                  <Box display="flex" flexDirection="column" alignItems="center" key={artist.id}>
                    <Avatar size="lg" src={artist.profile_picture} />
                    <Text color="white" size="xs" letterSpacing="widest">
                      {artist.display_name}
                    </Text>
                  </Box>
                ))}
                <Box display="flex" flexDirection="row" justifyContent="space-around" bgColor="#26232D" p={2} borderRadius="md">
                  <Text color="white">PRICE</Text>
                  <Text color="#DC89FF">0.005</Text>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="space-around" bgColor="#26232D" p={2} borderRadius="md">
                  <Text color="white">MINTED</Text>
                  <Text color="#DC89FF">100</Text>
                </Box>
                <Select bgColor="#26232D" variant="filled" color="white" placeholder="Quantity">
                  <option value="option1">1</option>
                  <option value="option2">2</option>
                  <option value="option3">3</option>
                </Select>
                <Button bgColor="#745CBA" color="white">
                  Mint
                </Button>
              </Stack>
              <Center>
                <Image src={cover} alt="tape-cover" boxSize="xs" border="1px" borderColor="heds.400" borderRadius="md" />
              </Center>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

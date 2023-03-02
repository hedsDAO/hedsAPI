import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState, store } from '@/store';

// Components
import { Button, Flex, useBoolean, Select, Tooltip, useToast } from '@chakra-ui/react';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { IconDisc } from '@tabler/icons';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { MintDetails, TapeCover, TapeNameAndCurator, TransactionProgress } from '../components';

// Utils
import { LanyardMerkleProofProvider } from '@soundxyz/sdk/merkle/lanyard';
import { SoundAPI } from '@soundxyz/sdk/api';
import { SoundClient } from '@soundxyz/sdk';
import { mainnet, goerli } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import axios from 'axios';

// Constants
import { LANYARD_API, MINT_MODAL_TITLE, SOUND_KEY, COLLECTED_TWEET, COLLECT_PAGE_LINK } from '../models/constants';
import { URL, TARGET, SIZE } from '@modules/modals/screens/twitter/models/constants';

const MintModal = () => {
  const toast = useToast();
  const dispatch = useDispatch<Dispatch>();
  const [value, setValue] = useState<number>(1);
  const [isMinting, setIsMinting] = useBoolean(false);
  const [hasMinted, setHasMinted] = useBoolean(false);
  const [isWhiteListed, setIsWhiteListed] = useBoolean(false);
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const contract = useSelector(store.select.tapesModel.selectCurrentTapeContract);
  const merkleRoot = useSelector(store.select.tapesModel.selectCurrentTapeMerkleRoot);
  const connectedWallet = useSelector(store.select.userModel.selectConnectedUserWallet);
  const [space, tape, id] = useSelector(store.select.tapesModel.selectSpaceTapeId);

  const connector = new MetaMaskConnector({
    chains: [mainnet, goerli],
  });

  const checkWalletInRoot = async () => {
    const response = await axios.get(`${LANYARD_API}${merkleRoot}`);

    if (response.data.unhashedLeaves.includes(connectedWallet)) {
      setIsWhiteListed.on();
    }
  };

  useEffect(() => {
    checkWalletInRoot();
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
    setIsMinting.on();
    await mintEdition(value);
    setIsMinting.off();
    setHasMinted.on();
    toast({
      title: 'hedsTAPE 11 Minted',
      description: 'You have successfully minted hedsTAPE 11',
      status: 'success',
      duration: 7000,
      position: 'top-right',
      isClosable: true,
    });
    return;
  };

  const handleShareTweet = () => {
    const windowParams = [`${URL}${COLLECTED_TWEET}${id} ${COLLECT_PAGE_LINK}${space}/${tape}/${id}`, TARGET, SIZE];
    window.open(windowParams[0], windowParams[1], windowParams[2]);
    return;
  };

  return (
    <ModalContainer size="md" isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <ModalHeader title={MINT_MODAL_TITLE} Icon={IconDisc} />
      <TapeNameAndCurator />
      <TapeCover />
      <MintDetails />
      <Flex justifyContent="space-between">
        <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>Back</SecondaryButton>

        <Flex gap={3} alignItems="center">
          {isMinting && <TransactionProgress />}
          {!hasMinted && (
            <Select onChange={(e) => setValue(parseInt(e.target.value))} size="sm" disabled={!isWhiteListed}>
              <option value="1">1</option>
              <option value="2"> 2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Select>
          )}
          {!hasMinted ? (
            <PrimaryButton onClick={handleMintStatus} disabled={!isWhiteListed}>
              Mint
            </PrimaryButton>
          ) : (
            <Button size="sm" colorScheme="twitter" onClick={handleShareTweet}>
              Tweet
            </Button>
          )}
          {!isWhiteListed && (
            <Tooltip label="You are not eligible for pre-mint" alignItems="center">
              <InfoOutlineIcon color="red.200" />
            </Tooltip>
          )}
        </Flex>
      </Flex>
    </ModalContainer>
  );
};

export default MintModal;

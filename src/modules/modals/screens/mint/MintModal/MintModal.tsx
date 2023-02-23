import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState, store } from '@/store';

// Components
import { Flex, useBoolean, Select, Tooltip } from '@chakra-ui/react';
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
import { MINT_MODAL_TITLE } from '../models/constants';

const MintModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const [value, setValue] = useState<number>(1);
  const [isMinting, setIsMinting] = useBoolean(false);
  const [isWhiteListed, setIsWhiteListed] = useBoolean(false);
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const contract = useSelector(store.select.tapesModel.selectCurrentTapeContract);
  const connectedWallet = useSelector(store.select.userModel.selectConnectedUserWallet);

  const connector = new MetaMaskConnector({
    chains: [mainnet, goerli],
  });

  const checkWalletInRoot = async () => {
    const response = await axios.get('https://lanyard.org/api/v1/tree?root=0x41F60DCB50D15915AE00B4F0C480C469F51F2A5A3D38B1B6BA54DBFD29C97334');

    if (response.data.unhashedLeaves.includes(connectedWallet)) {
      setIsWhiteListed.on();
    }
  };

  useEffect(() => {
    checkWalletInRoot();
  }, []);

  const mintEdition = async (quantity: number) => {
    const signer = await connector?.getSigner();
    console.log(signer);
    const client = SoundClient({
      merkleProvider: LanyardMerkleProofProvider,
      signer,
      soundAPI: SoundAPI({
        apiKey: '3ca9ceee-35f2-4db0-8277-fc1fc553484a',
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
  };

  return (
    <ModalContainer size="md" isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <ModalHeader title={MINT_MODAL_TITLE} Icon={IconDisc} />
      <TapeNameAndCurator />
      <TapeCover />
      <MintDetails />
      {/* TODO: add progress states for mint status */}
      <Flex justifyContent="space-between">
        <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>Back</SecondaryButton>

        <Flex gap={3} alignItems="center">
          {isMinting && <TransactionProgress />}
          <Select onChange={(e) => setValue(parseInt(e.target.value))} size="sm" disabled={!isWhiteListed}>
            <option value="option1">1</option>
            <option value="option2"> 2</option>
            <option value="option3">3</option>
            <option value="option2">4</option>
            <option value="option3">5</option>
          </Select>
          <PrimaryButton onClick={handleMintStatus} disabled={!isWhiteListed}>
            Mint
          </PrimaryButton>
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

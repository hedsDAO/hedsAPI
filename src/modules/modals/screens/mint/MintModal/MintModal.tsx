import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState, store } from '@/store';

// Components
import { Flex, useBoolean, Select } from '@chakra-ui/react';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { IconDisc } from '@tabler/icons';
import { MintDetails, TapeCover, TapeNameAndCurator, TransactionProgress } from '../components';

// Utils
import { LanyardMerkleProofProvider } from '@soundxyz/sdk/merkle/lanyard';
import { SoundAPI } from '@soundxyz/sdk/api';
import { EditionConfig, MintConfig, SoundClient } from '@soundxyz/sdk';
import { contractAddresses } from '@soundxyz/sound-protocol';
import { ContractTransaction } from 'ethers';
import { useAccount, useConnect } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

// Constants
import { MINT_MODAL_TITLE } from '../models/constants';

const MintModal = () => {
  const [value, setValue] = useState<number>(1);
  const [isMinting, setIsMinting] = useBoolean(false);
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const contract = useSelector(store.select.tapesModel.selectCurrentTapeContract);
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const connector = new MetaMaskConnector({
    chains: [mainnet, goerli],
  });

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
    const editionAddress = '0x10c9b5B84c6F490972464946033835F098591Cfe';
    const mintSchedule = (await client.activeMintSchedules({ editionAddress })).shift();
    console.log(mintSchedule);
    if (!mintSchedule) throw Error(`No active mint schedule available!`);

    // Transaction
    const mintTransaction = await (
      await client.mint({
        mintSchedule,
        quantity,
      })
    ).wait();
    console.log(await mintTransaction);
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
          <Select onChange={(e) => setValue(parseInt(e.target.value))} size="sm">
            <option value="option1">1</option>
            <option value="option2"> 2</option>
            <option value="option3">3</option>
            <option value="option2">4</option>
            <option value="option3">5</option>
          </Select>
          <PrimaryButton onClick={handleMintStatus}>Mint</PrimaryButton>
        </Flex>
      </Flex>
    </ModalContainer>
  );
};

export default MintModal;

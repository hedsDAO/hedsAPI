import { useDispatch, useSelector } from 'react-redux';
import { Flex, useBoolean } from '@chakra-ui/react';
import { Dispatch, RootState } from '@/store';

// Components
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { IconDisc } from '@tabler/icons';
import { MintDetails, TapeCover, TapeNameAndCurator, TransactionProgress } from '../components';

// Utils
import { MINT_MODAL_TITLE } from '../models/constants';
import { LanyardMerkleProofProvider } from '@soundxyz/sdk/merkle/lanyard';
import { SoundAPI } from '@soundxyz/sdk/api';
import { EditionConfig, MintConfig, SoundClient } from '@soundxyz/sdk';
import { contractAddresses } from '@soundxyz/sound-protocol';
import { ContractTransaction } from 'ethers';
import { useAccount, useConnect } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const MintModal = () => {
  const [isMinting, setIsMinting] = useBoolean(false);
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
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

  const handleMintStatus = async (quantity: number) => {
    setIsMinting.on();
    await mintEdition(quantity);
    setIsMinting.off();
  };

  return (
    <ModalContainer size="md" isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <ModalHeader title={MINT_MODAL_TITLE} Icon={IconDisc} />
      <TapeNameAndCurator />
      <TapeCover />
      <MintDetails />
      {/* TODO: add progress states for mint status */}
      <Flex gap={2} w="full">
        <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>Back</SecondaryButton>
        <PrimaryButton onClick={handleMintStatus}>Mint</PrimaryButton>
        {isMinting && <TransactionProgress />}
      </Flex>
    </ModalContainer>
  );
};

export default MintModal;

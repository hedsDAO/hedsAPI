import { useDispatch, useSelector } from 'react-redux';
import { EditionConfig, MintConfig, SoundClient } from '@soundxyz/sdk';
import { contractAddresses } from '@soundxyz/sound-protocol';
import { ContractTransaction } from 'ethers';
import { useAccount, useConnect } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { Dispatch, RootState } from '@/store';
import { Flex, useBoolean } from '@chakra-ui/react';
import { IconDisc } from '@tabler/icons';
import { MINT_MODAL_TITLE } from '../models/constants';
import { MintDetails, TapeCover, TapeNameAndCurator, TransactionProgress } from '../components';

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
    const client = SoundClient({ signer });
    const editionAddress = '0x10c9b5B84c6F490972464946033835F098591Cfe';
    const mintSchedule = (await client.activeMintSchedules({ editionAddress })).shift();
    console.log(mintSchedule);
    if (!mintSchedule) throw Error(`No active mint schedule available!`);

    // Transaction
    const mintTransaction = await client.mint({
      mintSchedule,
      quantity: 1,
    });
    console.log(await mintTransaction.wait());
    return mintTransaction.hash;
  };

  const handleMintStatus = () => {
    setIsMinting.on();
    mintEdition(3);
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

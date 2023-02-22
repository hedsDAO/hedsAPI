import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { Dispatch, RootState, store } from '@/store';
import { Flex, useBoolean, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import { IconDisc } from '@tabler/icons';
import { MintDetails, TapeCover, TapeNameAndCurator, TransactionProgress } from '../components';

// Utils
import { useAccount, useConnect } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { EditionConfig, MintConfig, SoundClient } from '@soundxyz/sdk';
import { contractAddresses } from '@soundxyz/sound-protocol';
import { ContractTransaction } from 'ethers';

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
    const client = SoundClient({ signer });
    const editionAddress = contract;
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
          <NumberInput min={1} max={5} value={value.toString()} onChange={(val) => setValue(parseInt(val))} maxW={20} size="sm">
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <PrimaryButton onClick={handleMintStatus}>Mint</PrimaryButton>
        </Flex>
      </Flex>
    </ModalContainer>
  );
};

export default MintModal;

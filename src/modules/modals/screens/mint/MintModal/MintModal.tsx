import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { Dispatch, RootState } from '@/store';
import { Flex } from '@chakra-ui/react';
import { IconDisc } from '@tabler/icons';
import { MINT_MODAL_TITLE } from '../models/constants';
import { 
  MintDetails, 
  TapeCover, 
  TapeNameAndCurator, 
  TransactionProgress 
} from '../components';

const MintModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  return (
    <ModalContainer size="md" isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <ModalHeader title={MINT_MODAL_TITLE} Icon={IconDisc} />
      <TapeNameAndCurator />
      <TapeCover />
      <MintDetails />
      {/* TODO: add progress states for mint status */}
      <TransactionProgress />
      <Flex gap={2}>
        <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>Back</SecondaryButton>
        <PrimaryButton>Mint</PrimaryButton>
      </Flex>
    </ModalContainer>
  );
};

export default MintModal;

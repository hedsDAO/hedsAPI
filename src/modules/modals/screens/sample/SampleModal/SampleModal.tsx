import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { DateTime } from 'luxon';
import { Flex } from '@chakra-ui/react';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { Disclaimer, TapeAndCurator } from '@/modules/modals/screens/sample/components';
import { selectCurrentTape, selectCurrentTapeId } from '@/pages/tapes/store/selectors';
import { BACK_BUTTON_TEXT, DOWNLOAD_BUTTON_TEXT, SAMPLE_MODAL_TITLE } from '@modals/screens/sample/models/constants';
import { IconWaveSawTool } from '@tabler/icons';

const SampleModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const { isLoading, isChecked } = useSelector((state: RootState) => state.sampleModel);
  const { end } = useSelector(selectCurrentTape).timeline.submit;
  const id = useSelector(selectCurrentTapeId);
  const now = DateTime.now().setZone(process.env.GLOBAL_TIMEZONE).toMillis();

  useEffect(() => {
    return () => {
      dispatch.sampleModel.clearModalState();
    };
  }, []);

  return (
    <ModalContainer size={'lg'} isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <ModalHeader title={SAMPLE_MODAL_TITLE} Icon={IconWaveSawTool} />
      <TapeAndCurator />
      <Disclaimer />
      <Flex gap={2}>
        <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{BACK_BUTTON_TEXT}</SecondaryButton>
        <PrimaryButton isLoading={isLoading} onClick={() => dispatch.sampleModel.getSampleDownload(id)} disabled={now > end ? false : !isChecked}>
          {DOWNLOAD_BUTTON_TEXT}
        </PrimaryButton>
      </Flex>
    </ModalContainer>
  );
};

export default SampleModal;

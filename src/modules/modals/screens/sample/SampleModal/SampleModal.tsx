import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { Dialog } from '@headlessui/react';
import { DateTime } from 'luxon';
import { ModalContainer } from '@/modules/modals/components';
import { Button, Divider, Flex } from '@chakra-ui/react';
import { selectCurrentTape, selectCurrentTapeId } from '@/pages/tapes/store/selectors';
import { Disclaimer, SampleDescription, SampleInfo, TapeAndCuratorInfo } from '@/modules/modals/screens/sample/components';

const SampleModal = () => {
  const { isLoading, isChecked } = useSelector((state: RootState) => state.sampleModel);
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const { timeline } = useSelector(selectCurrentTape);
  const id = useSelector(selectCurrentTapeId);
  const now = DateTime.now().setZone('utc').toMillis();
  const dispatch = useDispatch<Dispatch>();

  return (
    <ModalContainer isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 px-6 py-5 text-left align-middle shadow-xl transition-all">
        <Dialog.Title as="h2" className="text-2xl font-semibold text-gray-900 mb-6">
          <i className="fa-light fa-waveform-lines mr-1 text-xl"></i> Sample
        </Dialog.Title>
        <TapeAndCuratorInfo />
        <SampleInfo />
        <SampleDescription />
        <Disclaimer />
        <Divider my={5} />
        <Flex gap={1}>
          <Button onClick={() => dispatch.modalModel.setModalOpen(false)} bg="gray.200">
            Back
          </Button>
          <Button
            isLoading={isLoading}
            onClick={() => dispatch.sampleModel.getSampleDownload(id)}
            disabled={now > timeline?.submit?.end ? false : !isChecked}
            bg="green.100"
          >
            Download
          </Button>
        </Flex>
      </Dialog.Panel>
    </ModalContainer>
  );
};

export default SampleModal;

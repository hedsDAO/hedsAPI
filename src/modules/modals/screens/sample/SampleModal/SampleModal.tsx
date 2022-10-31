import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { ModalContainer } from '@/modules/modals/components';
import { Dialog } from '@headlessui/react';
import { Avatar, Button, Divider, Flex, Icon, Image } from '@chakra-ui/react';

const SampleModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const { currentTape } = useSelector((state: RootState) => state.tapesModel);
  return (
    <ModalContainer isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-gray-100 px-6 py-4 text-left align-middle shadow-xl transition-all">
        <Dialog.Title as="h2" className="text-2xl font-semibold text-gray-900 mb-6">
          <i className="fa-light fa-waveform-lines mr-1 text-xl"></i> Sample Modal
        </Dialog.Title>
        <Divider my={5} />
        <Flex>
          <Avatar size="xl" src={currentTape?.curator?.profilePicture} />
        </Flex>
        <Divider my={5} />
        <Dialog.Description>
          {currentTape?.name} features a sample provided by {currentTape?.curator?.displayName}. To prevent disqualification through the curation process, your
          submission must be 120bpm and use at least 1 second of the sample.
        </Dialog.Description>
        <Divider my={5} />
        <Flex>
          <Button>Back</Button>
          <Button>Download</Button>
        </Flex>
      </Dialog.Panel>
    </ModalContainer>
  );
};

export default SampleModal;

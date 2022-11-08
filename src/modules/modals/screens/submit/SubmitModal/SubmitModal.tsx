import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { ModalContainer } from '@/modules/modals/components';
import { Dialog } from '@headlessui/react';
import { DateTime } from 'luxon';
import { Divider, Flex, Text, Badge, Checkbox } from '@chakra-ui/react';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { selectCurrentTapeBpm } from '@/pages/tapes/store/selectors';
import { CheckIcon } from '@heroicons/react/24/solid';
import { IconNumber1 } from '@tabler/icons';

const SubmitModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const now = DateTime.now().setZone('utc').toMillis();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const { numberOfSteps, currentStep, isRequirementsChecked } = useSelector((state: RootState) => state.submitModel);
  const bpm = useSelector(selectCurrentTapeBpm);

  return (
    <ModalContainer isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 px-6 py-5 text-left align-middle shadow-xl transition-all">
        <Dialog.Title as="h2" className="text-2xl font-semibold text-gray-900 mb-6">
          <i className="fa-sharp fa-solid fa-arrow-up-from-bracket text-xl mr-1"></i> Upload Submission
        </Dialog.Title>
        <Divider my={5} />
        <Flex mt={5} px={2} direction={'column'}>
          <Text fontSize="xl" textColor={'blackAlpha.800'} fontWeight={'bold'}>
            Requirements
          </Text>
          <Flex mt={4} gap={2} alignItems={'center'}>
            <Badge bg="gray.200" fontSize={'xs'} py={1} px={2}>
              BPM
              <span className="text-green-600 font-semibold ml-1">{bpm}</span>
            </Badge>
            <Badge bg="gray.200" fontSize={'xs'} py={1} px={2}>
              DURATION
              <span className="text-orange-600 font-semibold ml-1">{'60-90 sec.'}</span>
            </Badge>
          </Flex>
          <Checkbox mt={5} onChange={() => dispatch.submitModel.setIsRequirementsChecked(!isRequirementsChecked)}>
            <Text fontSize={'xs'}>{'I agree to the submissions requirements.'}</Text>
          </Checkbox>
        </Flex>
        <Divider my={5} />
        <div className="flex gap-2">
          <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{'Back'}</SecondaryButton>
          <PrimaryButton disabled={!isRequirementsChecked} onClick={() => {}}>
            {'Upload Submission'}
          </PrimaryButton>
        </div>
      </Dialog.Panel>
    </ModalContainer>
  );
};

export default SubmitModal;

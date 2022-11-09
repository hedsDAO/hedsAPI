import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import { Divider, Flex, Text } from '@chakra-ui/react';
import { SecondaryButton, WarningButton } from '@/common/buttons';
import { SubmitSteps } from '@modals/screens/submit/models/common';

const PreviousSubmission = () => {
  const dispatch = useDispatch<Dispatch>();

  return (
    <Flex direction="column" px={2}>
      <Flex direction={'column'} mt={2} px={2} gap={2} alignItems={'center'} justifyContent={'center'}>
        <Text mb={1} fontSize={'md'} px={10} textAlign="center" fontWeight={'semibold'}>
          You have previously submitted for this tape.
        </Text>
        <Text fontSize={'sm'} px={10} textAlign="center" fontWeight={'light'}>
          Replacing your submission will remove the previously uploaded track.
        </Text>
        <Divider my={3} />
      </Flex>
      <div className="flex gap-2">
        <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{'Back'}</SecondaryButton>
        <WarningButton onClick={() => dispatch.submitModel.setCurrentStep(SubmitSteps.REQUIREMENTS_AND_DISCLAIMER)}>{'Replace'}</WarningButton>
      </div>
    </Flex>
  );
};

export default PreviousSubmission;
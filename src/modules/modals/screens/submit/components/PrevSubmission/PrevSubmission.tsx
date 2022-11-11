import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import { Divider, Flex, Text } from '@chakra-ui/react';
import { SecondaryButton, WarningButton } from '@/common/buttons';
import { SubmitSteps } from '@modals/screens/submit/models/common';
import {
  CONTINUE_TO_REQ_BUTTON_TEXT,
  EXIT_MODAL_BUTTON_TEXT,
  PREVIOUS_SUBMISSION_TITLE,
  PREVIOUS_SUBMISSION_DISCLAIMER,
} from '@modals/screens/submit/models/constants';

const PrevSubmission = () => {
  const dispatch = useDispatch<Dispatch>();
  return (
    <Flex data-testid="submit-prev" direction="column" px={2}>
      <Flex direction={'column'} mt={2} px={2} gap={2} alignItems={'center'} justifyContent={'center'}>
        <Text data-testid="submit-prev-title" mb={1} fontSize={'md'} px={10} textAlign="center" fontWeight={'semibold'}>
          {PREVIOUS_SUBMISSION_TITLE}
        </Text>
        <Text data-testid="submit-prev-text" fontSize={'sm'} px={10} textAlign="center" fontWeight={'light'}>
          {PREVIOUS_SUBMISSION_DISCLAIMER}
        </Text>
        <Divider my={3} />
      </Flex>
      <div className="flex gap-2">
        <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{EXIT_MODAL_BUTTON_TEXT}</SecondaryButton>
        <WarningButton onClick={() => dispatch.submitModel.setCurrentStep(SubmitSteps.REQS_AND_DISCLAIMER)}>{CONTINUE_TO_REQ_BUTTON_TEXT}</WarningButton>
      </div>
    </Flex>
  );
};

export default PrevSubmission;

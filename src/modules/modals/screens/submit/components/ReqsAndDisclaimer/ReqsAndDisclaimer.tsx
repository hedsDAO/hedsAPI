import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { selectCurrentTapeBpm } from '@/pages/tapes/store/selectors';
import { LabelBadge } from '@/common/badges';
import { CheckBoxDisclaimer } from '@/common/forms';
import { Divider, Flex, Heading, VStack } from '@chakra-ui/react';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { SubmitSteps } from '@modals/screens/submit/models/common';
import {
  DISCLAIMER,
  REQUIREMENTS,
  DISCLAIMER_HEADING,
  REQUIREMENTS_HEADING,
  CONTINUE_AGREE_BUTTON_TEXT,
  EXIT_MODAL_BUTTON_TEXT,
  BPM_LABEL,
  LENGTH_LABEL,
  LENGTH_VALUE,
  SAMPLE_LABEL,
  SAMPLE_VALUE,
} from '@modals/screens/submit/models/constants';

const ReqsAndDisclaimer = () => {
  const dispatch = useDispatch<Dispatch>();
  const bpm = useSelector(selectCurrentTapeBpm);
  const { isDisclaimerChecked, isRequirementsChecked } = useSelector((state: RootState) => state.submitModel);
  const nextStep = () => dispatch.submitModel.setCurrentStep(SubmitSteps.UPLOAD_SUBMISSION);

  return (
    <VStack data-testid="submit-reqs" gap={3} align={'start'}>
      <Heading fontSize={'xl'}>{REQUIREMENTS_HEADING}</Heading>
      <Flex mt={5} gap={2} direction={{ base: 'column', lg: 'row' }} alignItems={{ base: 'start', lg: 'center' }}>
        <LabelBadge label={BPM_LABEL} text={bpm.toString()} textColor={'green.600'} />
        <LabelBadge label={LENGTH_LABEL} text={LENGTH_VALUE} textColor={'orange.600'} />
        <LabelBadge label={SAMPLE_LABEL} text={SAMPLE_VALUE} textColor={'blue.600'} />
      </Flex>
      <CheckBoxDisclaimer text={REQUIREMENTS} onChange={() => dispatch.submitModel.setIsRequirementsChecked(!isRequirementsChecked)} />
      <Divider my={5} />
      <Heading fontSize={'lg'} color={'red.600'}>
        {DISCLAIMER_HEADING}
      </Heading>
      <CheckBoxDisclaimer text={DISCLAIMER} onChange={() => dispatch.submitModel.setIsDisclaimerChecked(!isDisclaimerChecked)} />
      <Divider my={5} />
      <Flex mb={2} gap={2}>
        <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{EXIT_MODAL_BUTTON_TEXT}</SecondaryButton>
        <PrimaryButton onClick={nextStep} disabled={!isRequirementsChecked || !isDisclaimerChecked}>
          {CONTINUE_AGREE_BUTTON_TEXT}
        </PrimaryButton>
      </Flex>
    </VStack>
  );
};

export default ReqsAndDisclaimer;

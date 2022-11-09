import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { selectCurrentTapeBpm } from '@/pages/tapes/store/selectors';
import { SubmitSteps, ReqsAndDisclaimerText } from '@modals/screens/submit/models/common';
import { Divider, Flex, Heading, VStack } from '@chakra-ui/react';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { LabelBadge } from '@/common/badges';
import { CheckBoxDisclaimer } from '@/common/forms';

const ReqsAndDisclaimer = () => {
  const dispatch = useDispatch<Dispatch>();
  const bpm = useSelector(selectCurrentTapeBpm);
  const { isDisclaimerChecked, isRequirementsChecked } = useSelector((state: RootState) => state.submitModel);
  const nextStep = () => dispatch.submitModel.setCurrentStep(SubmitSteps.UPLOAD_SUBMISSION);
  const { requirements, disclaimer } = new ReqsAndDisclaimerText();

  return (
    <VStack gap={3} align={'start'}>
      <Heading fontSize={'xl'}>Submission Requirements</Heading>
      <Flex mt={5} gap={2} direction={{ base: 'column', lg: 'row' }} alignItems={{ base: 'start', lg: 'center' }}>
        <LabelBadge label={'BPM'} text={bpm.toString()} textColor={'green.600'} />
        <LabelBadge label={'LENGTH'} text={'60-90 sec'} textColor={'orange.600'} />
        <LabelBadge label={'SAMPLE USED'} text={'> 1 sec'} textColor={'blue.600'} />
      </Flex>
      <CheckBoxDisclaimer disclaimer={requirements} onChange={() => dispatch.submitModel.setIsRequirementsChecked(!isRequirementsChecked)} />
      <Divider my={5} />
      <Heading fontSize={'lg'} color={'red.600'}>
        Disclaimer
      </Heading>
      <CheckBoxDisclaimer disclaimer={disclaimer} onChange={() => dispatch.submitModel.setIsDisclaimerChecked(!isDisclaimerChecked)} />
      <Divider my={5} />
      <Flex mb={2} gap={2}>
        <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{'Back'}</SecondaryButton>
        <PrimaryButton onClick={nextStep} disabled={!isRequirementsChecked || !isDisclaimerChecked}>
          {'Continue'}
        </PrimaryButton>
      </Flex>
    </VStack>
  );
};

export default ReqsAndDisclaimer;

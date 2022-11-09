import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { Badge, Checkbox, Divider, Flex, Text } from '@chakra-ui/react';
import { selectCurrentTapeBpm } from '@/pages/tapes/store/selectors';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { SubmitSteps } from '../../models/submitModel';

const RequirementsAndDisclaimer = () => {
  const dispatch = useDispatch<Dispatch>();
  const bpm = useSelector(selectCurrentTapeBpm);
  const { isDisclaimerChecked, isRequirementsChecked } = useSelector((state: RootState) => state.submitModel);
  return (
    <Flex direction={'column'}>
      <Flex direction={'column'}>
        <Text fontSize="xl" textColor={'blackAlpha.800'} fontWeight={'bold'}>
          Submission Requirements
        </Text>
        <Flex mt={5} gap={2} direction={{ base: 'column', lg: 'row' }} alignItems={{ base: 'start', lg: 'center' }}>
          <Badge bg="gray.200" fontSize={'xs'} py={1} px={2}>
            BPM
            <span className="text-green-600 font-semibold ml-1">{bpm}</span>
          </Badge>
          <Badge bg="gray.200" fontSize={'xs'} py={1} px={2}>
            LENGTH
            <span className="text-orange-600 font-semibold ml-1">{'60-90 sec'}</span>
          </Badge>
          <Badge bg="gray.200" fontSize={'xs'} py={1} px={2}>
            SAMPLE USED
            <span className="text-blue-600 font-semibold ml-1">{'> 1 sec'}</span>
          </Badge>
        </Flex>
        <Checkbox as={Flex} alignItems="start" mt={8} onChange={() => dispatch.submitModel.setIsRequirementsChecked(!isRequirementsChecked)}>
          <Text fontSize={'xs'}>{`I understand that my submission may be subject to disqualification if it does not follow the requirements above.`}</Text>
        </Checkbox>
        <Divider my={5} />
        <Text fontSize="lg" textColor={'red.500'} fontWeight={'bold'}>
          Copyright Disclaimer
        </Text>
        <Checkbox as={Flex} alignItems="start" mt={5} onChange={() => dispatch.submitModel.setIsDisclaimerChecked(!isDisclaimerChecked)}>
          <Text textColor={'black'} fontSize={'xs'}>
            {'I acknowledge that my submission contains no copyrighted content.'}
          </Text>
        </Checkbox>
      </Flex>
      <Divider my={5} />
      <div className="flex gap-2 mb-2">
        <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{'Back'}</SecondaryButton>
        <PrimaryButton
          disabled={!isRequirementsChecked || !isDisclaimerChecked}
          onClick={() => dispatch.submitModel.setCurrentStep(SubmitSteps.UPLOAD_SUBMISSION)}
        >
          {'Continue'}
        </PrimaryButton>
      </div>
    </Flex>
  );
};

export default RequirementsAndDisclaimer;

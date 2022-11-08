import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';
import { Dialog } from '@headlessui/react';
import { Divider, Flex, Text, HStack, Circle, Badge } from '@chakra-ui/react';
import { Dispatch, RootState } from '@/store';
import { ConnectWallet, VerifyTwitter } from '@/modules/modals/screens/submit/components';
import { ModalContainer } from '@/modules/modals/components';
import { SubmitSteps } from '../models/submitModel';
import { WaveformPlayer } from '@/modules/audio/components';
import UploadSubmission from '../components/UploadSubmission/UploadSubmission';
import RequirementsAndDisclaimer from '../components/RequirementsAndDisclaimer/RequirementsAndDisclaimer';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { formatTime } from '@/utils';

const SubmitModal = () => {
  const { isConnected, address } = useAccount();
  const dispatch = useDispatch<Dispatch>();
  const profileData = useSelector((state: RootState) => state.profileModel);
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const { currentStep, pendingSubmission } = useSelector((state: RootState) => state.submitModel);

  useEffect(() => {
    if (address) dispatch.profileModel.getProfileData(address.toLowerCase());
  }, [address]);

  useEffect(() => {
    return () => {
      dispatch.submitModel.setCurrentStep(SubmitSteps.REQUIREMENTS_AND_DISCLAIMER);
    };
  }, []);

  return (
    <ModalContainer isOpen={isOpen} setModalOpen={() => dispatch.modalModel.setModalOpen(!isOpen)}>
      <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-gray-100 px-6 py-5 text-left align-middle shadow-xl transition-all">
        <Dialog.Title>
          <HStack>
            <Circle size="30px" bg="gray.900" color="white" mr={1}>
              <i className="fa-sharp fa-solid fa-arrow-up-from-bracket text-xs"></i>
            </Circle>
            <Text className="text-xl font-semibold text-gray-900 mb-6">Upload Submission</Text>
          </HStack>
        </Dialog.Title>
        <Divider my={5} />
        {currentStep === SubmitSteps.REQUIREMENTS_AND_DISCLAIMER && (
          <Flex alignItems={'center'} px={2} direction={'column'}>
            {!isConnected ? <ConnectWallet /> : !profileData?.twitterHandle ? <VerifyTwitter /> : <RequirementsAndDisclaimer />}
          </Flex>
        )}
        {currentStep === SubmitSteps.UPLOAD_SUBMISSION && <UploadSubmission />}
        {currentStep === SubmitSteps.VERIFY_AND_SUBMIT && (
          <Flex px={2} direction={'column'}>
            <Flex gap={3} alignItems={'start'} direction={{base:'column', lg: 'row'}}>
              <Badge bg="gray.200" fontSize={'xs'} py={1} px={2}>
                id
                <span className="text-green-600 font-semibold ml-1">{pendingSubmission.track}</span>
              </Badge>
              <Badge bg="gray.200" fontSize={'xs'} py={1} px={2}>
                duration
                <span className="text-blue-600 font-semibold ml-1">{formatTime(pendingSubmission.duration)}</span>
              </Badge>
            </Flex>
            <Divider my={5} />
            <Text mb={5} fontWeight={'light'} fontSize={'xs'}>
              always preview your track before submitting...
            </Text>
            <WaveformPlayer track={pendingSubmission} />
            <Divider my={5} />
            <div className="flex gap-2">
              <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{'Back'}</SecondaryButton>
              <PrimaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{'Upload Submission'}</PrimaryButton>
            </div>
          </Flex>
        )}
      </Dialog.Panel>
    </ModalContainer>
  );
};

export default SubmitModal;

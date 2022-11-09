import { useEffect } from 'react';
import { ModalContainer } from '@/modules/modals/components';
import { CopyTweetForm, GenerateHashForm, PasteTweetForm, TweetHashForm, VerifyAndLinkAccountForm } from '../components';
import { Dispatch, RootState } from '@/store';
import { Dialog } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Flex, Stack, StackDivider } from '@chakra-ui/react';
import { TwitterStep } from '@/modules/modals/screens/twitter/models/twitterModel';

const TwitterModal = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isOpen, nextModal } = useSelector((state: RootState) => state.modalModel);
  const { currentStep, loading, twitterHandle } = useSelector((state: RootState) => state.twitterModel);
  const profileData = useSelector((state: RootState) => state.profileModel);
  useEffect(() => {
    return () => {
      dispatch.twitterModel.clearTwitterModalState();
    };
  }, []);

  return (
    <ModalContainer isOpen={isOpen} setModalOpen={(isOpen: boolean) => dispatch.modalModel.setModalOpen(isOpen)}>
      <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Title as="h2" className="text-2xl font-semibold text-gray-900 mb-6">
          Twitter Verification
        </Dialog.Title>
        <Stack spacing="5">
          {currentStep !== TwitterStep.LINK_ACCOUNT && (
            <Stack spacing="5" divider={<StackDivider />}>
              <GenerateHashForm />
              <CopyTweetForm />
              <TweetHashForm />
              <PasteTweetForm />
            </Stack>
          )}
          {currentStep === TwitterStep.LINK_ACCOUNT && <VerifyAndLinkAccountForm />}
          <Flex gap={2} className="mt-6">
            <Button onClick={() => dispatch.modalModel.setModalOpen(false)} bg="gray.200">
              Back
            </Button>
            {currentStep === TwitterStep.LINK_ACCOUNT && (
              <Button
                isLoading={loading}
                onClick={async () => {
                  await dispatch.twitterModel.linkTwitterHandleToUser([profileData.wallet, profileData, twitterHandle]);
                  if (nextModal) dispatch.modalModel.setModal(nextModal);
                  else dispatch.modalModel.setModalOpen(false);
                }}
                bg="green.200"
              >
                Confirm
              </Button>
            )}
          </Flex>
        </Stack>
      </Dialog.Panel>
    </ModalContainer>
  );
};

export default TwitterModal;

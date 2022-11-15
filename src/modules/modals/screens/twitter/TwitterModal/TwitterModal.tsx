import { useEffect } from 'react';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { CopyTweetForm, GenerateHashForm, PasteTweetForm, TweetHashForm, VerifyAndLinkAccountForm } from '../components';
import { Dispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Stack, StackDivider } from '@chakra-ui/react';
import { TwitterStep } from '@/modules/modals/screens/twitter/models/common';
import { IconBrandTwitter } from '@tabler/icons';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { BACK_BUTTON_TEXT, CONFIRM_BUTTON_TEXT, TWITTER_MODAL_TITLE } from '../models/constants';

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
    <ModalContainer size={'md'} isOpen={isOpen} setModalOpen={(isOpen: boolean) => dispatch.modalModel.setModalOpen(isOpen)}>
      <ModalHeader Icon={IconBrandTwitter} title={TWITTER_MODAL_TITLE} />
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
        <Flex mb={2} gap={2}>
          <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{BACK_BUTTON_TEXT}</SecondaryButton>
          <PrimaryButton
            disabled={loading}
            isLoading={loading}
            onClick={async () => {
              await dispatch.twitterModel.linkTwitterHandleToUser([profileData.wallet, profileData, twitterHandle]);
              if (nextModal) dispatch.modalModel.setModal(nextModal);
              else dispatch.modalModel.setModalOpen(false);
            }}
          >
            {CONFIRM_BUTTON_TEXT}
          </PrimaryButton>
        </Flex>
      </Stack>
    </ModalContainer>
  );
};

export default TwitterModal;

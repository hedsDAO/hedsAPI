import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton, SecondaryButton, WarningButton } from '@/common/buttons';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { AuthWrapper, PreviewAndSubmit, PreviouslySubmitted, SubmissionReqs, UploadSub, WarningPrompt } from '@/modules/modals/screens/submit/components';
import { SUBMIT_MODAL_TITLE } from '@/modules/modals/screens/submit/models/constants';
import { Dispatch, RootState, store } from '@/store';
import { Accordion, Divider, Flex, useBoolean } from '@chakra-ui/react';
import { IconWaveSine } from '@tabler/icons';

const SubmitModal = () => {
  const [space, tape, id] = useSelector(store.select.tapesModel.selectSpaceTapeId);
  const dispatch = useDispatch<Dispatch>();
  const [isConfirmingReplacement, setIsConfirmingReplacement] = useBoolean();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const file = useSelector(store.select.submitModel.selectFile);
  const hasAcceptedTerms = useSelector(store.select.submitModel.selectHasAcceptedTerms);
  const hasAcceptedPreview = useSelector(store.select.submitModel.selectHasAcceptedPreview);
  const isUploading = useSelector(store.select.submitModel.selectIsUploading);
  const hasSubmitted = useSelector(store.select.submitModel.selectHasSubmitted);
  const hasPreviouslySubmitted = useSelector(store.select.userModel.selectConnectedUserSubmissionsBySpaceTapeId([space, tape, id]));
  const wallet = useSelector(store.select.userModel.selectConnectedUserWallet);
  const displayName = useSelector(store.select.userModel.selectConnectedUserDisplayName);
  const tapeCover = useSelector(store.select.tapesModel.selectCurrentTapeCover);
  const tapeName = useSelector(store.select.tapesModel.selectCurrentTapeName);
  const index = useSelector(store.select.submitModel.selectIndex);
  const isLoading = useSelector(store.select.submitModel.selectIsLoading);
  const generatedSubmissions = useSelector(store.select.submitModel.selectGeneratedSubmission);

  useEffect(() => {
    return () => {
      dispatch.submitModel.clearModalState();
    };
  }, []);

  return (
    <ModalContainer size="lg" isOpen={isOpen} setModalOpen={isUploading ? () => {} : () => dispatch.modalModel.setModalOpen(!isOpen)}>
      <ModalHeader Icon={IconWaveSine} title={SUBMIT_MODAL_TITLE} />
      <AuthWrapper>
        {(isUploading || hasPreviouslySubmitted) && <PreviouslySubmitted />}
        {!isUploading && !generatedSubmissions && !hasPreviouslySubmitted && (
          <Accordion allowToggle defaultIndex={[index]} index={[index]}>
            {[SubmissionReqs, UploadSub, PreviewAndSubmit].map((FormItem, i) => (
              <FormItem key={i} />
            ))}
          </Accordion>
        )}
        <Divider borderColor={'gray.300'} my={5} />
        {isConfirmingReplacement && <WarningPrompt />}
        <Flex gap={2}>
          <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{hasSubmitted ? 'Exit' : 'Back'}</SecondaryButton>
          {!isConfirmingReplacement && hasAcceptedPreview && hasAcceptedTerms && file && !hasSubmitted && !hasPreviouslySubmitted && (
            <PrimaryButton
              isLoading={isLoading}
              disabled={isUploading || !(space + tape + id)?.length || isLoading}
              onClick={() => {
                dispatch.submitModel.uploadSubmissions([space, tape, id, wallet, displayName, tapeName, tapeCover, file]);
                dispatch.submitModel.setIsUploading(true);
              }}
            >
              Submit
            </PrimaryButton>
          )}
          {(generatedSubmissions || hasPreviouslySubmitted) && (
            <WarningButton
              disabled={isLoading}
              onClick={
                !isConfirmingReplacement
                  ? () => setIsConfirmingReplacement.on()
                  : () => {
                      dispatch.submitModel.deletePreviousSubmission([hasPreviouslySubmitted, wallet]);
                      setIsConfirmingReplacement.off();
                    }
              }
            >
              {isConfirmingReplacement ? 'Continue' : 'Replace'}
            </WarningButton>
          )}
        </Flex>
      </AuthWrapper>
    </ModalContainer>
  );
};

export default SubmitModal;

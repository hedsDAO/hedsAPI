import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Divider, Flex } from '@chakra-ui/react';
import { Dispatch, RootState, store } from '@/store';
import { ModalContainer, ModalHeader } from '@/modules/modals/components';
import { IconWaveSine } from '@tabler/icons';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import {
  GenerateSubmission,
  PreviewAndSubmit,
  SubmissionRequirements,
  UploadSubmission,
  PreviouslySubmitted,
} from '@/modules/modals/screens/submit/components';
import { SUBMIT_MODAL_TITLE } from '@/modules/modals/screens/submit/models/constants';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SubmitModal = () => {
  const { space, tape, id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modalModel);
  const file = useSelector(store.select.submitModel.selectFile);
  const hasAcceptedTerms = useSelector(store.select.submitModel.selectHasAcceptedTerms);
  const hasAcceptedPreview = useSelector(store.select.submitModel.selectHasAcceptedPreview);
  const isUploading = useSelector(store.select.submitModel.selectIsUploading);
  const hasSubmitted = useSelector(store.select.submitModel.selectHasSubmitted);
  const hasPreviouslySubmitted = useSelector(store.select.userModel.selectConnectedUserSubmissionsBySpaceTapeId([space, tape, id]));
  const index = useSelector(store.select.submitModel.selectIndex);
  useEffect(() => {
    return () => {
      dispatch.submitModel.clearModalState();
    };
  }, []);
  return (
    <ModalContainer size="lg" isOpen={isOpen} setModalOpen={isUploading ? () => {} : () => dispatch.modalModel.setModalOpen(!isOpen)}>
      <ModalHeader Icon={IconWaveSine} title={SUBMIT_MODAL_TITLE} />
      {!hasPreviouslySubmitted ? (
        <PreviouslySubmitted />
      ) : !isUploading ? (
        <Accordion allowToggle defaultIndex={[index]} index={[index]}>
          {[SubmissionRequirements, UploadSubmission, PreviewAndSubmit].map((FormItem, i) => (
            <FormItem key={i} />
          ))}
        </Accordion>
      ) : (
        <GenerateSubmission />
      )}
      <Divider borderColor={'gray.300'} my={5} />
      <Flex gap={2}>
        <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{hasSubmitted ? 'Exit' : 'Back'}</SecondaryButton>
        {!hasPreviouslySubmitted ? (
          <PrimaryButton disabled={isUploading} onClick={() => dispatch.submitModel.setIsUploading(true)}>
            Replace
          </PrimaryButton>
        ) : (
          hasAcceptedPreview &&
          hasAcceptedTerms &&
          file &&
          !hasSubmitted && (
            <PrimaryButton disabled={isUploading} onClick={() => dispatch.submitModel.setIsUploading(true)}>
              Submit
            </PrimaryButton>
          )
        )}
      </Flex>
    </ModalContainer>
  );
};

export default SubmitModal;

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { selectHedstapeByNameById, selectHedstapeCoverById, selectSpaceTapeId } from '@/pages/tapes/store/selectors';
import { Divider, Flex, Text } from '@chakra-ui/react';
import { SubmitSteps } from '@modals/screens/submit/models/common';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { WaveformPlayer } from '@/modules/audio/components';
import { CONFIRM_AND_UPLOAD_BUTTON_TEXT, IPFS_LOADING_TEXT, BACK_TO_UPLOAD_BUTTON_TEXT, PREVIEW_SUBMISSION_TEXT } from '../../models/constants';

const VerifyAndSubmit = () => {
  const dispatch = useDispatch<Dispatch>();
  const { pendingSubmission, isLoading, isUploading } = useSelector((state: RootState) => state.submitModel);
  const [space, tape, id] = useSelector(selectSpaceTapeId);
  const name = useSelector((state: RootState) => selectHedstapeByNameById(state, id));
  const cover = useSelector((state: RootState) => selectHedstapeCoverById(state, id));

  return (
    <Flex px={2} direction={'column'}>
      {isLoading ? (
        <Text className="animate__animated animate__fadeIn" mb={5} fontWeight={'light'} fontSize={'xs'}>
          {IPFS_LOADING_TEXT}
        </Text>
      ) : (
        <Text className="animate__animated animate__fadeIn delay-500" mb={5} fontWeight={'light'} fontSize={'xs'}>
          {PREVIEW_SUBMISSION_TEXT}
        </Text>
      )}
      <WaveformPlayer track={pendingSubmission} />
      <Divider my={5} />
      <div className="flex gap-2">
        <SecondaryButton onClick={() => dispatch.submitModel.setCurrentStep(SubmitSteps.UPLOAD_SUBMISSION)}>{BACK_TO_UPLOAD_BUTTON_TEXT}</SecondaryButton>
        <PrimaryButton
          isLoading={isUploading}
          onClick={() => dispatch.submitModel.handleUploadSubmission([pendingSubmission, [space, tape, id], [name, cover]])}
        >
          {CONFIRM_AND_UPLOAD_BUTTON_TEXT}
        </PrimaryButton>
      </div>
    </Flex>
  );
};

export default VerifyAndSubmit;

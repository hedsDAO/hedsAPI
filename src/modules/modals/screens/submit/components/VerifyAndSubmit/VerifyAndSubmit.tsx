import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { selectHedstapeByNameById, selectHedstapeCoverById, selectSpaceTapeId } from '@/pages/tapes/store/selectors';
import { Divider, Flex, Text } from '@chakra-ui/react';
import { SubmitSteps } from '@modals/screens/submit/models/common';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { WaveformPlayer } from '@/modules/audio/components';

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
          uploading to ipfs...
        </Text>
      ) : (
        <Text className="animate__animated animate__fadeIn delay-500" mb={5} fontWeight={'light'} fontSize={'xs'}>
          always preview your track before submitting...
        </Text>
      )}
      <WaveformPlayer track={pendingSubmission} />
      <Divider my={5} />
      <div className="flex gap-2">
        <SecondaryButton onClick={() => dispatch.submitModel.setCurrentStep(SubmitSteps.UPLOAD_SUBMISSION)}>{'Back'}</SecondaryButton>
        <PrimaryButton
          isLoading={isUploading}
          onClick={() => dispatch.submitModel.handleUploadSubmission([pendingSubmission, [space, tape, id], [name, cover]])}
        >
          {'Upload Submission'}
        </PrimaryButton>
      </div>
    </Flex>
  );
};

export default VerifyAndSubmit;

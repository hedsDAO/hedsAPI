import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { WaveformPlayer } from '@/modules/audio/components';
import { selectHedstapeByNameById, selectHedstapeCoverById, selectSpaceTapeId } from '@/pages/tapes/store/selectors';
import { Dispatch, RootState, store } from '@/store';
import { isEmpty } from '@/utils';
import { Divider, Flex, Text } from '@chakra-ui/react';
import { SubmitSteps } from '@modals/screens/submit/models/common';
import { BACK_TO_UPLOAD_BUTTON_TEXT, CONFIRM_AND_UPLOAD_BUTTON_TEXT, IPFS_LOADING_TEXT, PREVIEW_SUBMISSION_TEXT } from '../../models/constants';

const VerifyAndSubmit = () => {
  const dispatch = useDispatch<Dispatch>();
  const { isLoading, isUploading, file, hasPrevSubmitted } = useSelector((state: RootState) => state.submitModel);
  const [space, tape, id] = useSelector(selectSpaceTapeId);
  const name = useSelector((state: RootState) => selectHedstapeByNameById(state, id));
  const cover = useSelector((state: RootState) => selectHedstapeCoverById(state, id));
  const wallet = useSelector(store.select.userModel.selectConnectedUserWallet);
  const artist = useSelector(store.select.userModel.selectCurrentUserDisplayName);
  const prevSub = useSelector(store.select.userModel.selectConnectedUserSubmissionsBySpaceTapeId([space, tape, id]));
  return (
    <Flex data-testid="submit-verify" px={2} direction={'column'}>
      {isLoading ? (
        <Text className="animate__animated animate__fadeIn" mb={5} fontWeight={'light'} fontSize={'xs'}>
          {IPFS_LOADING_TEXT}
        </Text>
      ) : (
        <Text className="animate__animated animate__fadeIn delay-500" mb={5} fontWeight={'light'} fontSize={'xs'}>
          {PREVIEW_SUBMISSION_TEXT}
        </Text>
      )}
      <WaveformPlayer audio={file} />
      <Divider my={5} />
      <div className="flex gap-2">
        <SecondaryButton onClick={() => dispatch.submitModel.setCurrentStep(SubmitSteps.UPLOAD_SUBMISSION)}>{BACK_TO_UPLOAD_BUTTON_TEXT}</SecondaryButton>
        <PrimaryButton
          isLoading={isUploading}
          disabled={isUploading}
          onClick={() => {
            if (hasPrevSubmitted && !isEmpty(prevSub)) dispatch.submitModel.removePreviousSubmission(prevSub);
            dispatch.submitModel.handleUploadSubmission([file, wallet, artist, [space, tape, id], [name, cover]]);
          }}
        >
          {CONFIRM_AND_UPLOAD_BUTTON_TEXT}
        </PrimaryButton>
      </div>
    </Flex>
  );
};

export default VerifyAndSubmit;

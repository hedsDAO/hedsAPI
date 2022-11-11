import { Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { FileDropzone } from '@/common/forms';
import { selectCurrentTapeId, selectHedsTapeById } from '@/pages/tapes/store/selectors';
import { Dispatch, RootState } from '@/store';
import { Divider } from '@chakra-ui/react';
import { SubmitSteps } from '@modals/screens/submit/models/common';
import { MAX_FILES, VALID_FILE_EXT, BACK_TO_REQ_BUTTON_TEXT, CONTINUE_TO_PREVIEW_BUTTON_TEXT } from '@modals/screens/submit/models/constants';

const UploadSubmission = () => {
  const dispatch = useDispatch<Dispatch>();
  const inputRef = useRef<HTMLInputElement>(null);
  const profileData = useSelector((state: RootState) => state.profileModel);
  const tapeId = useSelector(selectCurrentTapeId);
  const { isLoading, pendingSubmission, file, error } = useSelector((state: RootState) => state.submitModel);
  const currentTape = useSelector((state: RootState) => selectHedsTapeById(state, tapeId));
  const handleSuccess = () => {
    const file = inputRef.current.files[0];
    dispatch.submitModel.handleIpfsUpload([file, profileData, currentTape]);
  };
  return (
    <Fragment>
      <FileDropzone
        file={file}
        error={error}
        maxFiles={MAX_FILES}
        accept={VALID_FILE_EXT}
        onRetry={() => dispatch.submitModel.removeCurrentSubmission()}
        onSuccess={handleSuccess}
        isLoading={isLoading}
        validation={dispatch.submitModel.validateSubmission}
        inputRef={inputRef}
      />

      <Divider my={5} />
      <div className="flex gap-2">
        <SecondaryButton
          onClick={() => {
            dispatch.submitModel.clearModalState();
            dispatch.submitModel.setCurrentStep(SubmitSteps.REQS_AND_DISCLAIMER);
          }}
        >
          {BACK_TO_REQ_BUTTON_TEXT}
        </SecondaryButton>
        <PrimaryButton
          isLoading={isLoading}
          disabled={!pendingSubmission?.audio}
          onClick={() => dispatch.submitModel.setCurrentStep(SubmitSteps.VERIFY_AND_SUBMIT)}
        >
          {CONTINUE_TO_PREVIEW_BUTTON_TEXT}
        </PrimaryButton>
      </div>
    </Fragment>
  );
};

export default UploadSubmission;

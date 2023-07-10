import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Button, Stack } from '@chakra-ui/react';
import { FileDropzone } from '@common/forms/FileDropzone';
import { VALID_FILE_EXT } from '@/modals/screens/submit/models/constants';
import { SubmitModelSteps } from '@/modals/screens/submit/models/common';
import * as styles from '@/modals/screens/submit/components/UploadScreen/styles';
import * as constants from '@/modals/screens/submit/models/constants';

/**
 * @function UploadScreen
 * @returns {JSX.Element} The `UploadScreen` component JSX element.
 * @description A modal component that displays the `UploadScreen` page for uploading files in the submit flow.
 */

export const UploadScreen = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();
  const isLoading = useSelector(store.select.submitModel.selectIsLoading);
  const error = useSelector(store.select.submitModel.selectError);
  const file = useSelector(store.select.submitModel.selectFile);
  return (
    <Stack gap={1}>
      <FileDropzone
        file={file}
        error={error}
        maxFiles={1}
        accept={VALID_FILE_EXT}
        onRetry={() => dispatch.submitModel.setError('')}
        isLoading={isLoading}
        validation={dispatch.submitModel.validateSubmission}
        inputRef={inputRef}
      />
      <Button onClick={() => dispatch.submitModel.setCurrentStep(SubmitModelSteps.PREVIEW)} isDisabled={error?.length > 0 || !file} {...styles.$buttonStyles}>
        {constants.CONTINUE_BUTTON_TEXT}
      </Button>
    </Stack>
  );
};

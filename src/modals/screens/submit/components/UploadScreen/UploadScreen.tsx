import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Button, Stack } from '@chakra-ui/react';
import { VALID_FILE_EXT } from '../../models/constants';
import { FileDropzone } from '@common/forms/FileDropzone';
import { SubmitModelSteps } from '../../models/common';

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
      <Button
        onClick={() => dispatch.submitModel.setCurrentStep(SubmitModelSteps.PREVIEW)}
        isDisabled={error?.length > 0 || !file}
        colorScheme="whiteAlpha"
        size="sm"
        color="white"
      >
        CONTINUE
      </Button>
    </Stack>
  );
};

import { FileDropzone } from '@/common/forms';
import { Dispatch, store } from '@/store';
import { AccordionButton, AccordionItem, AccordionPanel } from '@chakra-ui/react';
import { Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MAX_FILES, VALID_FILE_EXT } from '../../models/constants';

const UploadSubmission = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();
  const isLoading = useSelector(store.select.submitModel.selectIsLoading);
  const error = useSelector(store.select.submitModel.selectError);
  const file = useSelector(store.select.submitModel.selectFile);
  const hasAcceptedTerms = useSelector(store.select.submitModel.selectHasAcceptedTerms);

  return (
    <AccordionItem pt={1} borderColor="transparent">
      <AccordionButton
        rounded="lg"
        _hover={hasAcceptedTerms && file ? { bg: 'green.100' } : {}}
        border="1px"
        borderColor={hasAcceptedTerms && file ? 'green.200' : 'gray.300'}
        bg={file && hasAcceptedTerms ? 'green.100' : 'gray.100'}
        disabled={!hasAcceptedTerms}
        onClick={() => (hasAcceptedTerms ? dispatch.submitModel.setIndex(1) : {})}
        fontSize="sm"
        fontWeight="semibold"
        shadow="sm"
      >
        2. Upload Submission
      </AccordionButton>
      <AccordionPanel mt={4}>
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
      </AccordionPanel>
    </AccordionItem>
  );
};
export default UploadSubmission;

import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import WaveformPlayer from '@/modules/audio/screens/local/WaveformPlayer/WaveformPlayer';
import { Dispatch, RootState, store } from '@/store';
import { AccordionButton, AccordionItem, AccordionPanel, Checkbox, Divider, Flex, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BACK_TO_UPLOAD_BUTTON_TEXT, CONFIRM_AND_UPLOAD_BUTTON_TEXT, IPFS_LOADING_TEXT, PREVIEW_SUBMISSION_TEXT } from '../../models/constants';

const PreviewAndSubmit = () => {
  const dispatch = useDispatch<Dispatch>();
  const { space, tape, id } = useParams();
  const isLoading = useSelector(store.select.submitModel.selectIsLoading);
  const file = useSelector(store.select.submitModel.selectFile);
  const setHasAcceptedPreview = useSelector(store.select.submitModel.selectHasAcceptedPreview);
  const hasAcceptedTerms = useSelector(store.select.submitModel.selectHasAcceptedTerms);
  const hasAcceptedPreview = useSelector(store.select.submitModel.selectHasAcceptedPreview);
  return (
    <AccordionItem pt={1} borderColor="transparent">
      <AccordionButton
        rounded="lg"
        _hover={hasAcceptedTerms && file && hasAcceptedPreview ? { bg: 'green.100' } : {}}
        border="1px"
        borderColor={hasAcceptedTerms && file && hasAcceptedPreview ? 'green.200' : 'gray.300'}
        bg={file && hasAcceptedPreview && hasAcceptedTerms ? 'green.100' : 'gray.100'}
        disabled={!file && !hasAcceptedTerms}
        onClick={() => (file && hasAcceptedTerms ? dispatch.submitModel.setIndex(2) : dispatch.submitModel.setIndex(3))}
        fontSize="sm"
        fontWeight="semibold"
        shadow="sm"
      >
        3. Preview and Submit
      </AccordionButton>
      <AccordionPanel>
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
          {file && <WaveformPlayer audio={file} />}
          <Divider my={5} />
          <Checkbox mt={3} onChange={() => dispatch.submitModel.toggleHasAcceptedPreview(!setHasAcceptedPreview)} isChecked={setHasAcceptedPreview}>
            <Text fontSize="xs">I have previewed my submission.</Text>
          </Checkbox>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default PreviewAndSubmit;

import { Fragment, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Center, Container, Divider, Flex, FormControl, FormLabel, HStack, Icon, Square, Text, VStack } from '@chakra-ui/react';
import { Dispatch, RootState } from '@/store';
import { IconUpload } from '@tabler/icons';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { selectCurrentTapeId, selectHedsTapeById } from '@/pages/tapes/store/selectors';
import { SubmitSteps } from '../../models/submitModel';

const UploadSubmission = () => {
  const dispatch = useDispatch<Dispatch>();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => inputRef.current.click();
  const profileData = useSelector((state: RootState) => state.profileModel);
  const tapeId = useSelector(selectCurrentTapeId);
  const currentTape = useSelector((state: RootState) => selectHedsTapeById(state, tapeId));
  const onDrop = useCallback((acceptedFiles: File[]) => {}, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Fragment>
      <Flex px={2} direction={'column'}>
        <input
          {...getInputProps()}
          ref={inputRef}
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target as HTMLInputElement;
            await dispatch.submitModel.handleIpfsUpload([input.files[0], profileData, currentTape]);
          }}
          type="file"
          className="hidden"
        />
        <Box as="section" bg="bg-surface" py={{ base: '2', md: '4' }}>
          <Container maxW="lg">
            <FormControl id="file">
              <FormLabel>Upload Audio File</FormLabel>
              <Center {...getRootProps()} borderWidth="1px" borderRadius="lg" px={1} py={5} bg={'white'}>
                <VStack spacing="3">
                  <Square size="10" bg="bg-subtle" borderRadius="lg">
                    <Icon as={IconUpload} boxSize="5" color="muted" />
                  </Square>
                  <VStack spacing="1" pb={2}>
                    <HStack spacing="1" whiteSpace="nowrap">
                      {isDragActive ? (
                        <Text className="animate-bounce italic" fontSize="sm" color="muted">
                          drop files here...
                        </Text>
                      ) : (
                        <Fragment>
                          <Button onClick={() => handleClick()} variant="link" colorScheme="blue" size="sm">
                            Click to upload
                          </Button>
                          <Text fontSize="sm" color="muted">
                            or drag and drop
                          </Text>
                        </Fragment>
                      )}
                    </HStack>
                    <Text fontSize="xs" color="muted">
                      MP3, WAV up to 20MB
                    </Text>
                  </VStack>
                </VStack>
              </Center>
            </FormControl>
          </Container>
        </Box>
      </Flex>
      <Divider my={5} />
      <div className="flex gap-2">
        <SecondaryButton onClick={() => dispatch.modalModel.setModalOpen(false)}>{'Back'}</SecondaryButton>
        <PrimaryButton onClick={() => dispatch.submitModel.setCurrentStep(SubmitSteps.VERIFY_AND_SUBMIT)}>{'Upload Submission'}</PrimaryButton>
      </div>
    </Fragment>
  );
};

export default UploadSubmission;

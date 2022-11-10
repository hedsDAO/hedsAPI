import { Fragment, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import { useDropzone } from 'react-dropzone';
import { selectCurrentTapeId, selectHedsTapeById } from '@/pages/tapes/store/selectors';
import { SubmitSteps } from '@modals/screens/submit/models/common';
import { Box, Button, Center, Container, Divider, Flex, FormControl, HStack, Icon, Square, Text, VStack } from '@chakra-ui/react';
import { PrimaryButton, SecondaryButton } from '@/common/buttons';
import { IconUpload } from '@tabler/icons';
import { computeLength } from '@/utils';

const UploadSubmission = () => {
  const dispatch = useDispatch<Dispatch>();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => inputRef.current.click();
  const profileData = useSelector((state: RootState) => state.profileModel);
  const tapeId = useSelector(selectCurrentTapeId);
  const { isLoading, pendingSubmission, file, error } = useSelector((state: RootState) => state.submitModel);
  const currentTape = useSelector((state: RootState) => selectHedsTapeById(state, tapeId));
  const onDrop = useCallback((acceptedFiles: File[]) => {}, []);
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({ onDrop });

  return (
    <Fragment>
      <Flex px={2} direction={'column'}>
        <input
          {...getInputProps()}
          ref={inputRef}
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target as HTMLInputElement;
            const accept = ['audio/mpeg', 'audio/wav'];
            const maxSize = 20000000;
            const { duration } = await computeLength(input.files[0]);
            if (input.files[0].type !== accept[0] && input.files[0].type !== accept[1]) dispatch.submitModel.setError('invalid file type');
            else if (input.files[0].size > maxSize) dispatch.submitModel.setError(`your file is too big`);
            else if (duration < 60 || duration > 90) dispatch.submitModel.setError(`Track must be 60-90 sec.\n Your file is ${Math.round(duration)} sec.`);
            else await dispatch.submitModel.handleIpfsUpload([input.files[0], profileData, currentTape]);
          }}
          type="file"
          className="hidden"
        />
        <Box as="section" bg="bg-surface" py={{ base: '2', md: '4' }}>
          <Container px={{ base: '1', lg: '4' }} maxW="lg">
            <FormControl id="file">
              <Center borderWidth="1px" borderRadius="lg" px={1} py={4} bg={'white'}>
                <VStack spacing="3">
                  <Square size="10" bg="bg-subtle" borderRadius="lg">
                    {file?.name ? (
                      <i className="fa-light fa-waveform-lines" />
                    ) : error?.length ? (
                      <i className="fa-sharp fa-solid fa-circle-exclamation text-red-500"></i>
                    ) : (
                      <Icon as={IconUpload} boxSize="5" color="muted" />
                    )}
                  </Square>
                  <VStack spacing="1" pb={2}>
                    <HStack spacing="1" whiteSpace="nowrap">
                      {isDragActive ? (
                        <Text className="animate-bounce italic" fontSize="sm" color="muted">
                          drop files here...
                        </Text>
                      ) : (
                        <Fragment>
                          <Flex>
                            {error?.length ? (
                              <Flex className="animate__animated animate__headShake" direction={'column'} alignItems="center">
                                <Text px={10} className="whitespace-pre-wrap text-center" textColor={'red.300'} fontSize={'xs'}>
                                  {error}
                                </Text>
                              </Flex>
                            ) : (
                              <Fragment>
                                {file?.name ? (
                                  <Flex alignItems={'baseline'} mb={4} gap={1}>
                                    <Text fontWeight={'semibold'} fontSize="sm" color="muted">
                                      {file.name}
                                    </Text>
                                    <Button
                                      bg={'transparent'}
                                      borderColor={'transparent'}
                                      textColor="red.200"
                                      _hover={{ bg: 'transparent', textColor: 'red.400' }}
                                      onClick={() => {
                                        inputRef.current.value = null;
                                        dispatch.submitModel.removeCurrentSubmission();
                                      }}
                                      size="xs"
                                    >
                                      <i className="fa-sharp fa-solid fa-trash-xmark text-sm" />
                                    </Button>
                                  </Flex>
                                ) : (
                                  <Flex direction={'column'}>
                                    <Button {...getRootProps()} onClick={() => handleClick()} variant="link" colorScheme="blue" size="sm">
                                      Click to upload
                                    </Button>
                                    <Text fontSize="sm" color="muted">
                                      or drag and drop
                                    </Text>
                                  </Flex>
                                )}
                              </Fragment>
                            )}
                          </Flex>
                        </Fragment>
                      )}
                    </HStack>
                    {error ? (
                      <Flex pt={4}>
                        <Button
                          bg={'transparent'}
                          borderColor={'transparent'}
                          textColor="gray.500"
                          _hover={{ bg: 'transparent', textColor: 'gray.700' }}
                          size="xs"
                          onClick={() => {
                            inputRef.current.value = null;
                            dispatch.submitModel.setError(null);
                          }}
                        >
                          <i className="fa-sharp fa-solid fa-arrow-turn-down-left text-sm"></i>
                        </Button>
                      </Flex>
                    ) : (
                      <Text mt={2} fontSize="2xs" color="muted">
                        MP3, WAV up to 20MB
                      </Text>
                    )}
                  </VStack>
                </VStack>
              </Center>
            </FormControl>
          </Container>
        </Box>
      </Flex>
      <Divider my={5} />
      <div className="flex gap-2">
        <SecondaryButton
          onClick={() => {
            dispatch.submitModel.clearModalState();
            dispatch.submitModel.setCurrentStep(SubmitSteps.REQS_AND_DISCLAIMER);
          }}
        >
          {'Back'}
        </SecondaryButton>
        <PrimaryButton
          isLoading={isLoading}
          disabled={!pendingSubmission?.audio}
          onClick={() => dispatch.submitModel.setCurrentStep(SubmitSteps.VERIFY_AND_SUBMIT)}
        >
          {'Continue'}
        </PrimaryButton>
      </div>
    </Fragment>
  );
};

export default UploadSubmission;

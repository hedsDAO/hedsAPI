import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { Fragment, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileDropzone = ({ error, file }: { error: string; file: File }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {}, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Fragment>
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
                          //   onClick={() => {
                          //     inputRef.current.value = null;
                          //     dispatch.submitModel.removeCurrentSubmission();
                          //   }}
                          size="xs"
                        >
                          <i className="fa-sharp fa-solid fa-trash-xmark text-sm" />
                        </Button>
                      </Flex>
                    ) : (
                      <Flex direction={'column'}>
                        <Button
                          {...getRootProps()}
                          // onClick={() => handleClick()}
                          variant="link"
                          colorScheme="blue"
                          size="sm"
                        >
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
              //   onClick={() => {
              //     inputRef.current.value = null;
              //     dispatch.submitModel.setError(null);
              //   }}
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
    </Fragment>
  );
};

export default FileDropzone;

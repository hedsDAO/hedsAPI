import { Fragment, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Center, Container, Flex, FormControl, HStack, Icon, Spinner, Square, Text, VStack } from '@chakra-ui/react';
import { IconAlertTriangle, IconUpload, IconWaveSawTool } from '@tabler/icons';

interface FileDropzone {
  inputRef?: React.MutableRefObject<HTMLInputElement>;
  file?: File;
  maxFiles: number;
  error?: string;
  accept?: string[];
  validation?: Function;
  onRetry?: Function;
  isLoading?: boolean;
}

const FileDropzone = ({ inputRef, validation, accept, file, error, onRetry, isLoading, maxFiles }: FileDropzone) => {
  const [fileData, setFileData] = useState<{ size: number; name: string }>();
  const handleClick = () => inputRef?.current?.click();
  const onDrop = useCallback((acceptedFiles: File[]) => {}, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'audio/*': accept }, maxFiles: maxFiles });
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await validation(e.target.files[0]);
    if (!error) {
      const { size, name } = e.target.files[0];
      setFileData({ size, name });
    }
  };
  return (
    <Fragment>
      <Flex px={2} direction={'column'}>
        <input disabled={isLoading} {...getInputProps()} ref={inputRef} onChange={(e) => onChange(e)} type="file" className="hidden" />
        <Box as="section" bg="bg-surface" py={{ base: '2', md: '4' }}>
          <Container px={{ base: '1', lg: '4' }} maxW="lg">
            <FormControl id="file">
              <Center borderWidth="1px" borderRadius="lg" px={1} py={8} bg={'white'}>
                <VStack spacing="3">
                  <Square size="10" bg="bg-subtle" borderRadius="lg">
                    <Icon as={error ? IconAlertTriangle : file ? IconWaveSawTool : IconUpload} boxSize="6" color={error ? 'red' : 'muted'} />
                  </Square>
                  <VStack spacing="2" pb={2}>
                    <HStack spacing="1" whiteSpace="nowrap">
                      <Button
                        disabled={isLoading}
                        {...getRootProps()}
                        onClick={async () => {
                          if (error) {
                            await onRetry();
                            inputRef.current.value = null;
                          }
                          handleClick();
                        }}
                        variant={error ? 'solid' : file ? 'link' : 'solid'}
                        colorScheme={error ? 'red' : 'blue'}
                        size="sm"
                      >
                        {error ? 'Try again' : fileData ? 'Change file' : 'Click to upload'}
                      </Button>
                    </HStack>
                    <Text className={error ? 'whitespace-pre-wrap text-center px-10 text-red-500 text-sm' : 'text-sm'}>
                      {error ? error : fileData ? `${fileData?.name} - ${fileData?.size?.toString().slice(0, 2)}mb` : ''}
                    </Text>
                    <Text className={isDragActive ? 'animate-bounce italic' : ''} mt={2} fontSize="2xs" color="muted">
                      {isDragActive ? 'drop files here...' : 'MP3, WAV up to 20MB'}
                    </Text>
                  </VStack>
                </VStack>
              </Center>
            </FormControl>
          </Container>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default FileDropzone;

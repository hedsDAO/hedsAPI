import { Fragment, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Center, Container, Flex, FormControl, Icon, Square, Text, VStack } from '@chakra-ui/react';
import { IconAlertTriangle, IconWaveSawTool, IconCloudUpload } from '@tabler/icons';

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

export const FileDropzone = ({ inputRef, validation, accept, file, error, onRetry, isLoading, maxFiles }: FileDropzone) => {
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
      <Flex w="full" direction={'column'}>
        <input disabled={isLoading} {...getInputProps()} ref={inputRef} onChange={(e) => onChange(e)} type="file" className="hidden" />
        <Box as="section" bg="transparent">
          <Container px={0}>
            <FormControl
              onClick={async () => {
                if (error) {
                  await onRetry();
                  inputRef.current.value = null;
                }
                handleClick();
              }}
              id="file"
            >
              <Center borderColor={error ? 'red.500' : 'whiteAlpha.700'} borderWidth="1px" borderRadius="md" px={1} py={8} bg={'transparent'}>
                <VStack>
                  <Square size="10" bg="transparent" borderRadius="lg">
                    <Icon as={error ? IconAlertTriangle : file ? IconWaveSawTool : IconCloudUpload} boxSize="5" color={error ? 'red.500' : 'whiteAlpha.700'} />
                  </Square>
                  <VStack pb={2}>
                    <Text textOverflow={'elipsis'} maxW='10ch' isTruncated fontSize="2xs" color={error?.length ? 'red.500' : 'white'}>
                      {error ? error : fileData ? `${fileData?.name} - ${fileData?.size?.toString().slice(0, 2)}mb` : ''}
                    </Text>
                    <Text mt={'1 !important'} fontSize="2xs" color="whiteAlpha.700">
                      {isDragActive ? 'drop files here...' : 'mp3, wav up to 20mb'}
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


import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import { Box, Button, FormControl, FormLabel, Flex, Input, Stack, Text } from '@chakra-ui/react';

export const SampleDetails = ({ goToPrevious, handleSubmit }: { goToPrevious: () => void; handleSubmit: () => void }) => {
  const [wallet, setWallet] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [trackName, setTrackName] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();

  const handleClick = () => {
    dispatch.adminModel.setCuratorWallet(wallet);
    dispatch.adminModel.setSampleDetails({ trackName, duration });
    handleSubmit();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch.adminModel.uploadSampleAudio(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const formValidation = () => {
    if (!wallet || !fileName || !trackName || !duration) {
      return true;
    }
    return false;
  };

  return (
    <Box maxW="md" mx="auto" mt={12}>
      <Stack spacing={5} maxW="md" mx="auto" mt={12}>
        <FormControl isRequired>
          <FormLabel color="white">Upload sample</FormLabel>
          <Flex alignItems="center" gap="1rem">
            <Button onClick={() => inputRef.current?.click()}>Choose file</Button>
            <Text color="white">{fileName ? fileName : 'No file chosen'}</Text>
          </Flex>
          <Input ref={inputRef} type="file" accept=".mp3,audio/*" hidden color="white" onChange={(e) => handleFileChange(e)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="white">Curator wallet address</FormLabel>
          <Input borderColor="gray.400" color="white" value={wallet} onChange={(e) => setWallet(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200">Track name</FormLabel>
          <Input borderColor="gray.400" color="white" value={trackName} onChange={(e) => setTrackName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200">Duration</FormLabel>
          <Input borderColor="gray.400" color="white" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </FormControl>
      </Stack>
      <Flex justifyContent="space-between" maxW="lg" mt={12} mx="auto">
        <Button onClick={goToPrevious}>Back</Button>
        <Button colorScheme="blue" onClick={handleClick} isDisabled={formValidation()}>
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

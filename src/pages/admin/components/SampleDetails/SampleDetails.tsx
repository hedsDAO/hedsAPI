import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

import { Box, Button, FormControl, FormLabel, Flex, Input, Stack } from '@chakra-ui/react';
import { storage } from '@/App';
import { ref, uploadBytes } from 'firebase/storage';

export const SampleDetails = ({ goToPrevious, handleSubmit }: { goToPrevious: () => void; handleSubmit: () => void }) => {
  const [trackName, setTrackName] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();

  const handleClick = () => {
    dispatch.adminModel.setSampleDetails({ trackName, duration });
    handleSubmit();
  };

  return (
    <Box maxW="md" mx="auto" mt={12}>
      <Stack spacing={5} maxW="md" mx="auto" mt={12}>
        <FormControl>
          <FormLabel color="white">Upload sample</FormLabel>
          <Button onClick={() => inputRef.current?.click()}>Choose file</Button>
          <Input
            ref={inputRef}
            type="file"
            accept=".mp3,audio/*"
            hidden
            color="white"
            onChange={(e) => uploadBytes(ref(storage, 'sample-audio.mp3'), e.target.files[0])}
          />
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
        <Button onClick={goToPrevious}>back</Button>
        <Button colorScheme="teal" onClick={handleClick}>
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

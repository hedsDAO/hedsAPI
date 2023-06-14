import { useRef } from 'react';
import { Box, Button, FormControl, FormLabel, Flex, Input } from '@chakra-ui/react';
import { storage } from '@/App';
import { ref, uploadBytes } from 'firebase/storage';
export const SampleUpload = ({ goToPrevious, handleSubmit }: { goToPrevious: () => void; handleSubmit: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box maxW="md" mx="auto" mt={12}>
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
      <Flex justifyContent="space-between" maxW="lg" mt={12} mx="auto">
        <Button onClick={goToPrevious}>back</Button>
        <Button onClick={handleSubmit}>submit</Button>
      </Flex>
    </Box>
  );
};

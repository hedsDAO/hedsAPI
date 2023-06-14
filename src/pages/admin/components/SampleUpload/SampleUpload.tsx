import { useRef, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Flex, Input } from '@chakra-ui/react';

export const SampleUpload = ({ goToPrevious, handleSubmit }: { goToPrevious: () => void; handleSubmit: (sample: File) => void }) => {
  const [sample, setSample] = useState<File>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box maxW="md" mx="auto" mt={12}>
      <FormControl>
        <FormLabel color="white">Upload sample</FormLabel>
        <Button onClick={() => inputRef.current?.click()}>Choose file</Button>
        <Input ref={inputRef} type="file" accept=".mp3,audio/*" hidden color="white" onChange={(e) => setSample(e.target.files[0])} />
      </FormControl>
      <Flex justifyContent="space-between" maxW="lg" mt={12} mx="auto">
        <Button onClick={goToPrevious}>back</Button>
        <Button onClick={() => handleSubmit(sample)}>submit</Button>
      </Flex>
    </Box>
  );
};

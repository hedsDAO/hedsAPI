import { useRef } from 'react';
import { Box, Button, FormControl, FormLabel, Flex, Input } from '@chakra-ui/react';

export const SampleUpload = ({ goToPrevious }: { goToPrevious: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Box maxW="md" mx="auto" mt={12}>
      <FormControl>
        <FormLabel color="white">Upload sample</FormLabel>
        <Button onClick={() => inputRef.current?.click()}>Choose file</Button>
        <Input ref={inputRef} type="file" accept=".mp3,audio/*" hidden color="white" />
      </FormControl>
      <Flex justifyContent="space-between" maxW="lg" mt={12} mx="auto">
        <Button onClick={goToPrevious}>back</Button>
        <Button>submit</Button>
      </Flex>
    </Box>
  );
};

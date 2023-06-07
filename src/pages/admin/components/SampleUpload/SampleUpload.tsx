import { useRef } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
export const SampleUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box maxW="sm">
      <Button onClick={() => inputRef.current?.click()}>Upload sample</Button>
      <Input ref={inputRef} type="file" accept=".mp3,audio/*" hidden color="white" />
    </Box>
  );
};

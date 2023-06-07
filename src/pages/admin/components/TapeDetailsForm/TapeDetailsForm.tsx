import { useRef } from 'react';
import { Box, Button, Stack, FormControl, FormLabel, Input } from '@chakra-ui/react';

export const TapeDetailsForm = ({ goToNext }: { goToNext: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box maxW="sm">
      <Stack spacing={3}>
        <Button onClick={() => inputRef.current?.click()}>Upload cover image</Button>
        <Input ref={inputRef} type="file" accept="image/*" hidden color="white" />
        <FormControl>
          <FormLabel color="white">Name</FormLabel>
          <Input placeholder="hedsTAPE" />
        </FormControl>
        <FormControl>
          <FormLabel color="white">Description</FormLabel>
          <Input color="white" placeholder="hedsTAPE" />
        </FormControl>
        <FormControl>
          <FormLabel color="white">BPM</FormLabel>
          <Input color="white" placeholder="hedsTAPE" />
        </FormControl>
      </Stack>
      <Button onClick={goToNext}>next</Button>
    </Box>
  );
};

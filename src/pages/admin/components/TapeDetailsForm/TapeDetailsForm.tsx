import { useRef, useState } from 'react';
import { Box, Button, Stack, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';

export const TapeDetailsForm = ({ goToNext }: { goToNext: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [bpm, setBpm] = useState<string>('');
  const [date, setDate] = useState(new Date());

  console.log('date', date);

  return (
    <Box>
      <Stack spacing={5} maxW="md" mx="auto" mt={12}>
        <FormControl isRequired>
          <FormLabel color="gray.200">Upload tape cover image</FormLabel>
          <Button onClick={() => inputRef.current?.click()}>Choose file</Button>
          <Input ref={inputRef} type="file" accept="image/*" hidden color="white" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200">Name</FormLabel>
          <Input borderColor="gray.400" color="white" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200">Description</FormLabel>
          <Input borderColor="gray.400" color="white" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200">BPM</FormLabel>
          <Input borderColor="gray.400" color="white" value={bpm} onChange={(e) => setBpm(e.target.value)} />
        </FormControl>
        <Box>
          <FormLabel color="gray.200">Select date for vote</FormLabel>
          <DateTimePicker value={date} onChange={setDate} />
        </Box>
        <Box>
          <FormLabel color="gray.200">Select date for submit</FormLabel>
          <DateTimePicker value={date} onChange={setDate} />
        </Box>
        <Box>
          <FormLabel color="gray.200">Select date for mint</FormLabel>
          <DateTimePicker value={date} onChange={setDate} />
        </Box>
      </Stack>
      <Flex justifyContent="flex-end" maxW="lg" mt={12} mx="auto">
        <Button onClick={goToNext}>next</Button>
      </Flex>
    </Box>
  );
};

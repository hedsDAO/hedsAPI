import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

import { Box, Button, Stack, Select, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

export const TapeDetailsForm = ({ goToNext }: { goToNext: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();

  const [fileName, setFileName] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [bpm, setBpm] = useState<string>('');
  const [tapeType, setTapeType] = useState<string>('hedstape');

  const handleClick = () => {
    dispatch.adminModel.setTapeDetails({ name, description, bpm: Number(bpm), type_type: tapeType });
    goToNext();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch.adminModel.uploadCoverImage(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const formValidation = () => {
    // if (!fileName || !name || !description || !bpm || !tapeType) {
    //   return true;
    // }
    return false;
  };

  return (
    <Box w="full" mt={6}>
      <Stack spacing={5} pl={12}>
        <FormControl>
          <FormLabel color="gray.200">Upload Cover</FormLabel>
          <Flex alignItems="center" gap="1rem">
            <Button onClick={() => inputRef.current?.click()}>Choose file</Button>
            <Text color="white">{fileName ? fileName : 'No file chosen'}</Text>
          </Flex>
          <Input ref={inputRef} type="file" accept="image/*" hidden color="white" onChange={(e) => handleFileChange(e)} />
        </FormControl>
        <FormControl>
          <FormLabel color="gray.200">Title</FormLabel>
          <Input
            placeholder="what's the title?"
            variant="flushed"
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderColor="gray.400"
            color="white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="gray.200">Description</FormLabel>
          <Input
            placeholder="write a description..."
            variant="flushed"
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderColor="gray.400"
            color="white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="gray.200">BPM</FormLabel>
          <Input
            placeholder="tempo?"
            variant="flushed"
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            borderColor="gray.400"
            color="white"
            type="number"
            value={bpm}
            onChange={(e) => setBpm(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="gray.200">Type of Tape</FormLabel>
          <Select
            bg="white"
            color="gray.800"
            borderRadius="xl"
            w="fit-content"
            placeholder="Select tape type"
            value={tapeType}
            onChange={(e) => setTapeType(e.target.value)}
          >
            <option value="hedstape">hedsTAPE</option>
            <option value="collabtape">collabTAPE</option>
          </Select>
        </FormControl>
        <Flex justifyContent="flex-end" mt={12}>
          <Button colorScheme="purple" onClick={handleClick} isDisabled={formValidation()}>
            NEXT
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

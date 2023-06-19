import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

import { Box, Button, Stack, Select, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import './calendarStyles.css';
import 'react-datepicker/dist/react-datepicker.css';
import { storage } from '@/App';
import { ref, uploadBytes } from 'firebase/storage';

export const TapeDetailsForm = ({ goToNext }: { goToNext: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [bpm, setBpm] = useState<string>('');
  const [tapeType, setTapeType] = useState<string>('');
  const [submitStart, setSubmitStart] = useState(new Date());
  const [submitEnd, setSubmitEnd] = useState(new Date());
  const [voteStart, setVoteStart] = useState(new Date());
  const [voteEnd, setVoteEnd] = useState(new Date());
  const [mintStart, setMintStart] = useState(new Date());
  const [mintEnd, setMintEnd] = useState(new Date());

  const handleClick = () => {
    console.log(voteStart.getTime(), mintStart, submitStart);
    const numberBpm = Number(bpm);

    const timeline = {
      submit: {
        start: submitStart.getTime(),
        end: submitEnd.getTime(),
      },
      vote: {
        start: voteStart.getTime(),
        end: voteEnd.getTime(),
      },
      mint: {
        start: mintStart.getTime(),
        end: mintEnd.getTime(),
      },
    };
    dispatch.adminModel.setTapeDetails({ name, description, bpm: numberBpm, timeline });
    goToNext();
  };

  return (
    <Box>
      <Stack spacing={5} maxW="md" mx="auto" mt={12}>
        <FormControl isRequired>
          <FormLabel color="gray.200">Upload tape cover image</FormLabel>
          <Button onClick={() => inputRef.current?.click()}>Choose file</Button>
          <Input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            color="white"
            onChange={(e) => uploadBytes(ref(storage, 'cover-img.png'), e.target.files[0])}
          />
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
          <Input borderColor="gray.400" color="white" type="number" value={bpm} onChange={(e) => setBpm(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200">Tape type</FormLabel>
          <Select borderColor="gray.400" placeholder="Select tape type" value={tapeType} onChange={(e) => setTapeType(e.target.value)} color="white">
            <option value="hedstape">Heds tape</option>
            <option value="collabtape">Collab tape</option>
          </Select>
        </FormControl>
        <Flex justifyContent="space-between">
          <Box>
            <FormLabel color="gray.200">Select start date for submit</FormLabel>
            <DatePicker showTimeSelect selected={submitStart} onChange={(date) => setSubmitStart(date)} />
          </Box>
          <Box>
            <FormLabel color="gray.200">Select end date for submit</FormLabel>
            <DatePicker showTimeSelect selected={submitEnd} onChange={(date) => setSubmitEnd(date)} />
          </Box>
        </Flex>
        <Flex justifyContent="space-between">
          <Box>
            <FormLabel color="gray.200">Select start date for vote</FormLabel>
            <DatePicker showTimeSelect selected={voteStart} onChange={(date) => setVoteStart(date)} />
          </Box>
          <Box>
            <FormLabel color="gray.200">Select end date for vote</FormLabel>
            <DatePicker showTimeSelect selected={voteEnd} onChange={(date) => setVoteEnd(date)} />
          </Box>
        </Flex>
        <Flex justifyContent="space-between">
          <Box>
            <FormLabel color="gray.200">Select start date for mint</FormLabel>
            <DatePicker showTimeSelect selected={mintStart} onChange={(date) => setMintStart(date)} />
          </Box>
          <Box>
            <FormLabel color="gray.200">Select end date for mint</FormLabel>
            <DatePicker showTimeSelect selected={mintEnd} onChange={(date) => setMintEnd(date)} />
          </Box>
        </Flex>
      </Stack>
      <Flex justifyContent="flex-end" maxW="lg" mt={12} mx="auto">
        <Button colorScheme="teal" onClick={handleClick}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};

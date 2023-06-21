import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

import { Box, Button, Stack, Select, Textarea, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { DateTimeRangePicker } from '@/pages/admin/components/DateTimeRangePicker/DateTimeRangePicker';

export const TapeDetailsForm = ({ goToNext }: { goToNext: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<Dispatch>();

  const [fileName, setFileName] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [bpm, setBpm] = useState<string>('');
  const [tapeType, setTapeType] = useState<string>('hedstape');
  const [submitStart, setSubmitStart] = useState(null);
  const [submitEnd, setSubmitEnd] = useState(null);
  const [voteStart, setVoteStart] = useState(null);
  const [voteEnd, setVoteEnd] = useState(null);
  const [mintStart, setMintStart] = useState(null);
  const [mintEnd, setMintEnd] = useState(null);

  const handleClick = () => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch.adminModel.uploadCoverImage(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const formValidation = () => {
    if (!fileName || !name || !description || !bpm || !tapeType || !submitStart || !submitEnd || !voteStart || !voteEnd || !mintStart || !mintEnd) {
      return true;
    }
    return false;
  };

  return (
    <Box>
      <Stack spacing={5} maxW="md" mx="auto" mt={12}>
        <FormControl isRequired>
          <FormLabel color="gray.200">Upload tape cover image</FormLabel>
          <Flex alignItems="center" gap="1rem">
            <Button onClick={() => inputRef.current?.click()}>Choose file</Button>
            <Text color="white">{fileName ? fileName : 'No file chosen'}</Text>
          </Flex>
          <Input ref={inputRef} type="file" accept="image/*" hidden color="white" onChange={(e) => handleFileChange(e)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200">Name</FormLabel>
          <Input borderColor="gray.400" color="white" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200">Description</FormLabel>
          <Textarea borderColor="gray.400" color="white" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200">BPM</FormLabel>
          <Input borderColor="gray.400" color="white" type="number" value={bpm} onChange={(e) => setBpm(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200">Tape type</FormLabel>
          <Select borderColor="gray.400" placeholder="Select tape type" value={tapeType} onChange={(e) => setTapeType(e.target.value)} color="white">
            <option value="hedstape">hedsTAPE</option>
            <option value="collabtape">collabTAPE</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200">Submission</FormLabel>
          <DateTimeRangePicker startDate={submitStart} endDate={submitEnd} changeStart={setSubmitStart} changeEnd={setSubmitEnd} minDate={new Date()} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200">Vote</FormLabel>
          <DateTimeRangePicker startDate={voteStart} endDate={voteEnd} changeStart={setVoteStart} changeEnd={setVoteEnd} minDate={submitEnd} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel color="gray.200">Mint</FormLabel>
          <DateTimeRangePicker startDate={mintStart} endDate={mintEnd} changeStart={setMintStart} changeEnd={setMintEnd} minDate={voteEnd} />
        </FormControl>
      </Stack>
      <Flex justifyContent="flex-end" maxW="lg" mt={12} mx="auto">
        <Button colorScheme="blue" onClick={handleClick} isDisabled={formValidation()}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};

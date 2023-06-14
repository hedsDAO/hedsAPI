import { useRef, useState } from 'react';
import { Box, Button, Stack, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import DateTimePicker from 'react-datetime-picker';
import styled from 'styled-components';
import { storage } from '@/App';
import { ref, uploadBytes } from 'firebase/storage';

export const TapeDetailsForm = ({
  handleTapeDetails,
}: {
  handleTapeDetails: (name: string, description: string, bpm: number, submitDate: Date, voteDate: Date, mintDate: Date) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [bpm, setBpm] = useState<number>(0);
  const [submitDate, setSubmitDate] = useState(new Date());
  const [voteDate, setVoteDate] = useState(new Date());
  const [mintDate, setMintDate] = useState(new Date());

  const handleClick = () => {
    handleTapeDetails(name, description, bpm, submitDate, voteDate, mintDate);
  };

  return (
    <Box>
      <Stack spacing={5} maxW="md" mx="auto" mt={12}>
        {/* <Button onClick={() => inputRef.current?.click()}>Choose file</Button> */}

        <form encType="multipart/form-data">
          <input type="file" onChange={(e) => uploadBytes(ref(storage, 'cover-img.png'), e.target.files[0])} />
        </form>
        {/* <FormControl isRequired>
          <FormLabel color="gray.200">Upload tape cover image</FormLabel>
          <Button onClick={() => inputRef.current?.click()}>Choose file</Button>
          <Input ref={inputRef} type="file" accept="image/*" hidden color="white" onChange={(e) => handleCoverChange(e)} />
        </FormControl> */}
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
          <Input borderColor="gray.400" color="white" type="number" value={bpm} onChange={(e) => setBpm(Number(e.target.value))} />
        </FormControl>
        <Box>
          <FormLabel color="gray.200">Select date for submit</FormLabel>
          <StyledDateTimePicker value={submitDate} onChange={setSubmitDate} />
        </Box>
        <Box>
          <FormLabel color="gray.200">Select date for vote</FormLabel>
          <StyledDateTimePicker value={voteDate} onChange={setVoteDate} />
        </Box>
        <Box>
          <FormLabel color="gray.200">Select date for mint</FormLabel>
          <StyledDateTimePicker value={mintDate} onChange={setMintDate} />
        </Box>
      </Stack>
      <Flex justifyContent="flex-end" maxW="lg" mt={12} mx="auto">
        <Button onClick={handleClick}>next</Button>
      </Flex>
    </Box>
  );
};

const StyledDateTimePicker = styled(DateTimePicker)`
  & .react-datetime-picker__wrapper {
    background-color: white;
  }

  & .react-datetime-picker__inputGroup__input {
    color: black;
  }

  & .react-calendar {
    background: white;
    border-color: #aaa;
  }

  & .react-calendar__tile {
    color: black;
  }
`;

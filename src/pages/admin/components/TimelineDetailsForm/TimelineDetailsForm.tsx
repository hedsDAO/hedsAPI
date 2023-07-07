import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

import { Button, Box, Stack, Select, Flex, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { DateTimePicker } from '@/pages/admin/components/DateTimeRangePicker/DateTimePicker';
import { format } from 'date-fns';

export const TimelineDetailsForm = ({ goToPrevious, handleSubmit }: { goToPrevious: () => void; handleSubmit: () => void }) => {
  const dispatch = useDispatch<Dispatch>();

  const [submitStart, setSubmitStart] = useState(new Date());
  const [submitDuration, setSubmitDuration] = useState<string>('86400000');
  const [voteDuration, setVoteDuration] = useState<string>('86400000');
  const [mintDuration, setMintDuration] = useState<string>('86400000');

  const handleClick = () => {
    const submitStartEpoch = submitStart.getTime();
    const submitEndEpoch = submitStartEpoch + Number(submitDuration);

    const timeline = {
      submit: {
        start: submitStartEpoch,
        end: submitEndEpoch,
      },
      vote: {
        start: submitEndEpoch,
        end: submitEndEpoch + Number(voteDuration),
      },
      mint: {
        start: submitEndEpoch + Number(voteDuration),
        end: submitEndEpoch + Number(voteDuration) + Number(mintDuration),
      },
    };
    dispatch.adminModel.setTapeDetails({ timeline });
    handleSubmit();
  };

  const handleTimeChange = (startDate: Date, duration: number) => {
    const endDate = new Date(startDate.getTime() + duration);
    return endDate;
  };

  const formValidation = () => {
    if (!submitStart || !submitDuration || !voteDuration || !mintDuration) {
      return true;
    }
    return false;
  };

  return (
    <Box w="full" mt={6}>
      <Stack spacing={5} pl={12}>
        <FormControl>
          <FormLabel color="gray.200">Submission Start</FormLabel>
          <DateTimePicker startDate={submitStart} setStartDate={setSubmitStart} minDate={new Date()} />
        </FormControl>
        <FormControl>
          <FormLabel color="gray.200">Submission Duration</FormLabel>
          <Select bg="white" color="gray.800" borderRadius="xl" w="fit-content" value={submitDuration} onChange={(e) => setSubmitDuration(e.target.value)}>
            <option value="86400000">1 DAY</option>
            <option value="172800000">2 DAYS</option>
            <option value="259200000">3 DAYS</option>
            <option value="604800000">1 WEEK</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel color="gray.200">Vote</FormLabel>
          <Text bg="white" borderRadius="0.7rem" color="gray.800" p="6px 30px 6px 12px" w="fit-content">
            {format(handleTimeChange(submitStart, Number(submitDuration)), 'MMMM d, yyyy h:mm aa')}
          </Text>
        </FormControl>
        <FormControl>
          <FormLabel color="gray.200">Vote Duration</FormLabel>
          <Select
            bg="white"
            color="gray.800"
            borderRadius="xl"
            w="fit-content"
            placeholder="Select tape type"
            value={voteDuration}
            onChange={(e) => setVoteDuration(e.target.value)}
          >
            <option value="86400000">1 DAY</option>
            <option value="172800000">2 DAYS</option>
            <option value="259200000">3 DAYS</option>
            <option value="345600000">4 DAYS</option>
            <option value="432000000">5 DAYS</option>
            <option value="518400000">6 DAYS</option>
            <option value="604800000">1 WEEK</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel color="gray.200">Mint</FormLabel>
          <Text bg="white" borderRadius="0.7rem" color="gray.800" p="6px 30px 6px 12px" w="fit-content">
            {format(handleTimeChange(submitStart, Number(submitDuration) + Number(voteDuration)), 'MMMM d, yyyy h:mm aa')}
          </Text>
        </FormControl>
        <FormControl>
          <FormLabel color="gray.200">Mint Duration</FormLabel>
          <Select
            bg="white"
            color="gray.800"
            borderRadius="xl"
            w="fit-content"
            placeholder="Select tape type"
            value={mintDuration}
            onChange={(e) => setMintDuration(e.target.value)}
          >
            <option value="86400000">1 DAY</option>
            <option value="172800000">2 DAYS</option>
            <option value="259200000">3 DAYS</option>
          </Select>
        </FormControl>
        <Flex justifyContent="space-between" mt={12}>
          <Button onClick={goToPrevious}>Back</Button>
          <Button colorScheme="purple" onClick={handleClick} isDisabled={formValidation()}>
            Submit
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

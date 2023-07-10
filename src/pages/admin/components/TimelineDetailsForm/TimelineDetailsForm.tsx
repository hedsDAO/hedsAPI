import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

import { Box, Stack, Flex, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { CustomFormInput } from '@pages/admin/components/CustomFormInput/CustomFormInput';
import { NextStepButton } from '@pages/admin/components/NextStepButton/NextStepButton';
import { PreviousStepButton } from '@pages/admin/components/PreviousStepButton/PreviousStepButton';
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
          <FormLabel color="gray.200" fontFamily="mono" fontWeight="semibold" fontSize="sm" letterSpacing="tight">
            Submission Start
          </FormLabel>
          <DateTimePicker startDate={submitStart} setStartDate={setSubmitStart} minDate={new Date()} />
        </FormControl>
        <CustomFormInput
          label="Submission Duration"
          value={submitDuration}
          onChange={(e) => setSubmitDuration(e.target.value)}
          formType="select"
          options={[
            { label: '1 DAY', value: '86400000' },
            { label: '2 DAYS', value: '172800000' },
            { label: '3 DAYS', value: '259200000' },
            { label: '1 WEEK', value: '604800000' },
          ]}
        />

        <FormControl>
          <FormLabel color="gray.200" fontFamily="mono" fontWeight="semibold" fontSize="sm" letterSpacing="tight">
            Vote
          </FormLabel>
          <Text bg="white" borderRadius="0.7rem" color="gray.800" p="6px 30px 6px 12px" w="fit-content">
            {format(handleTimeChange(submitStart, Number(submitDuration)), 'MMMM d, yyyy h:mm aa')}
          </Text>
        </FormControl>
        <CustomFormInput
          label="Vote Duration"
          value={voteDuration}
          onChange={(e) => setVoteDuration(e.target.value)}
          formType="select"
          options={[
            { label: '1 DAY', value: '86400000' },
            { label: '2 DAYS', value: '172800000' },
            { label: '3 DAYS', value: '259200000' },
            { label: '4 DAYS', value: '345600000' },
            { label: '5 DAYS', value: '432000000' },
            { label: '6 DAYS', value: '518400000' },
            { label: '1 WEEK', value: '604800000' },
          ]}
        />
        <FormControl>
          <FormLabel color="gray.200" fontFamily="mono" fontWeight="semibold" fontSize="sm" letterSpacing="tight">
            Mint
          </FormLabel>
          <Text bg="white" borderRadius="0.7rem" color="gray.800" p="6px 30px 6px 12px" w="fit-content">
            {format(handleTimeChange(submitStart, Number(submitDuration) + Number(voteDuration)), 'MMMM d, yyyy h:mm aa')}
          </Text>
        </FormControl>
        <CustomFormInput
          label="Mint Duration"
          value={mintDuration}
          onChange={(e) => setMintDuration(e.target.value)}
          formType="select"
          options={[
            { label: '1 DAY', value: '86400000' },
            { label: '2 DAYS', value: '172800000' },
            { label: '3 DAYS', value: '259200000' },
          ]}
        />
        <Flex justifyContent="space-between" mt={12}>
          <PreviousStepButton onClick={goToPrevious} />
          <NextStepButton onClick={handleClick} disabled={formValidation()} text="SUBMIT" />
        </Flex>
      </Stack>
    </Box>
  );
};

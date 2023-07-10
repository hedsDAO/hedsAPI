import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { CustomUpload } from '@pages/admin/components/CustomUpload/CustomUpload';
import { CustomFormInput } from '@pages/admin/components/CustomFormInput/CustomFormInput';
import { NextStepButton } from '@pages/admin/components/NextStepButton/NextStepButton';
import { PreviousStepButton } from '@pages/admin/components/PreviousStepButton/PreviousStepButton';

export const SampleDetailsForm = ({ goToPrevious, goToNext }: { goToPrevious: () => void; goToNext: () => void }) => {
  const [wallet, setWallet] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [trackName, setTrackName] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const dispatch = useDispatch<Dispatch>();

  const handleClick = () => {
    dispatch.adminModel.setCuratorWallet(wallet);
    dispatch.adminModel.setSampleDetails({ trackName, duration });
    goToNext();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch.adminModel.uploadSampleAudio(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const formValidation = () => {
    // if (!wallet || !fileName || !trackName || !duration) {
    //   return true;
    // }
    return false;
  };

  return (
    <Box w="full" mt={6}>
      <Stack spacing={5} pl={12}>
        <CustomUpload label="Upload sample" onChange={handleFileChange} fileName={fileName} acceptFileType=".mp3,audio/*" />
        <CustomFormInput label="Sample Title" placeholder="what's the sample title?" value={trackName} onChange={(e) => setTrackName(e.target.value)} />
        <CustomFormInput label="Curator Wallet Address" placeholder="0x420..." value={wallet} onChange={(e) => setWallet(e.target.value)} />
        <CustomFormInput
          label="Submission Duration (seconds)"
          placeholder="60"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          inputType="number"
        />
        <Flex justifyContent="space-between" mt={12}>
          <PreviousStepButton onClick={goToPrevious} />
          <NextStepButton onClick={handleClick} disabled={formValidation()} text="NEXT" includeIcon />
        </Flex>
      </Stack>
    </Box>
  );
};

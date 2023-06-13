import { useState } from 'react';
import { Box, Step, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps, Text } from '@chakra-ui/react';
import { TapeDetailsForm } from '@/pages/admin/components/TapeDetailsForm/TapeDetailsForm';
import { CuratorWallet } from '@/pages/admin/components/CuratorWallet/CuratorWallet';
import { SampleUpload } from '@/pages/admin/components/SampleUpload/SampleUpload';
import { createTape } from '@/api/tape';
import FormData from 'form-data';

const steps = [
  {
    title: 'Step 1',
    description: 'Tape Details',
  },
  {
    title: 'Step 2',
    description: 'Curator wallet',
  },
  {
    title: 'Step 3',
    description: 'Sample upload',
  },
];

export const CreateTape = () => {
  const [tapeDetails, setTapeDetails] = useState({
    coverImage: new File([], ''),
    name: '',
    description: '',
    bpm: 0,
    timeline: {
      mint: { end: 1680634800000, start: 1680202800000 },
      vote: { end: 1679684400000, start: 1679338800000 },
      submit: { end: 1679252400000, start: 1678564800000 },
    },
    curatorWallet: '',
    type: 'hedstape',
  });
  const [curatorWallet, setCuratorWallet] = useState('');

  const { goToNext, goToPrevious, activeStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handleTapeDetails = (cover: File, name: string, description: string, bpm: string, submitDate: Date, voteDate: Date, mintDate: Date) => {
    const timeline = {
      mint: { end: 1680634800000, start: 1680202800000 },
      vote: { end: 1679684400000, start: 1679338800000 },
      submit: { end: 1679252400000, start: 1678564800000 },
      premint: { end: 1679684400000, start: 1679338800000 },
    };
    const curatorWallet = '0x55c59ae5b124261d021421f07c6cad699c993b3d';
    const tape = { coverImage: cover, name, description, bpm: Number(bpm), timeline, curatorWallet, type: 'hedstape' };

    setTapeDetails(tape);
    goToNext();
  };

  const handleCuratorWallet = (walletAddress: string) => {
    // console.log(walletAddress);
    setCuratorWallet(walletAddress);
    goToNext();
  };

  const handleSubmit = (sample: File) => {
    const { coverImage, name, description, bpm, timeline, type } = tapeDetails;
    const tape = { name, description, bpm, timeline, type };
    console.log('tape', tape);

    const songData = {
      duration: 10,
      track_name: 'smomething',
      song_type: 'submission',
      submission_data: {},
      cyanite_id: '',
      track_data: {
        tape_name: 'something name',
      },
    };

    const formData = new FormData();
    formData.append('coverImage', coverImage);
    formData.append('sampleAudio', sample);
    formData.append('tapeData', JSON.stringify(tape));
    formData.append('curatorWallet', curatorWallet);
    formData.append('songData', JSON.stringify(songData));

    createTape(formData);
  };

  return (
    <Box pt={2} px={5} maxW="7xl" mx="auto">
      <Stepper index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator color="white">
              <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>
            <Box flexShrink="0" color="white">
              <StepTitle>{step.title}</StepTitle>
              <Text fontSize="xs">{step.description}</Text>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && <TapeDetailsForm handleTapeDetails={handleTapeDetails} />}
      {activeStep === 1 && <CuratorWallet handleCuratorWallet={handleCuratorWallet} goToPrevious={goToPrevious} />}
      {activeStep === 2 && <SampleUpload goToPrevious={goToPrevious} handleSubmit={handleSubmit} />}
    </Box>
  );
};

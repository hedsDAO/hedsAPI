import { useState } from 'react';
import { Box, Step, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps, Text } from '@chakra-ui/react';
import { TapeDetailsForm } from '@/pages/admin/components/TapeDetailsForm/TapeDetailsForm';
import { CuratorWallet } from '@/pages/admin/components/CuratorWallet/CuratorWallet';
import { SampleUpload } from '@/pages/admin/components/SampleUpload/SampleUpload';
import { createTape } from '@/api/tape';

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
    name: '',
    description: '',
    bpm: 0,
    timeline: {
      mint: { end: 1680634800000, start: 1680202800000 },
      vote: { end: 1679684400000, start: 1679338800000 },
      submit: { end: 1679252400000, start: 1678564800000 },
    },
    type: 'hedstape',
  });
  const [curatorWallet, setCuratorWallet] = useState('');

  const { goToNext, goToPrevious, activeStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  // Need to add other date pickers
  const handleTapeDetails = (name: string, description: string, bpm: number, submitDate: Date, voteDate: Date, mintDate: Date) => {
    const timeline = {
      mint: { end: 1680634800000, start: 1680202800000 },
      vote: { end: 1679684400000, start: 1679338800000 },
      submit: { end: 1679252400000, start: 1678564800000 },
      premint: { end: 1679684400000, start: 1679338800000 },
    };
    const tape = { name, description, bpm, timeline, type: 'hedstape' };
    setTapeDetails(tape);
    goToNext();
  };

  const handleCuratorWallet = (walletAddress: string) => {
    setCuratorWallet(walletAddress);
    goToNext();
  };

  // Need to add form for curator details
  const handleSubmit = () => {
    const { name, description, bpm, timeline, type } = tapeDetails;
    const tapeData = { name, description, bpm, timeline, type };
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
    const curatorWallet = '0x55c59ae5b124261d021421f07c6cad699c993b3d';

    createTape({
      songData,
      tapeData,
      curatorWallet,
      coverImage: 'https://storage.googleapis.com/hedsdev.appspot.com/cover-img.png',
      sampleAudio: 'https://storage.googleapis.com/hedsdev.appspot.com/sample-audio.mp3',
    });
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
      {/* {activeStep === 0 && <Test />} */}
      {activeStep === 1 && <CuratorWallet handleCuratorWallet={handleCuratorWallet} goToPrevious={goToPrevious} />}
      {activeStep === 2 && <SampleUpload goToPrevious={goToPrevious} handleSubmit={handleSubmit} />}
    </Box>
  );
};

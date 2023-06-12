import { Box, Step, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps, Text } from '@chakra-ui/react';
import { TapeDetailsForm } from '@/pages/admin/components/TapeDetailsForm/TapeDetailsForm';
import { CuratorWallet } from '@/pages/admin/components/CuratorWallet/CuratorWallet';
import { SampleUpload } from '@/pages/admin/components/SampleUpload/SampleUpload';

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
  const { goToNext, goToPrevious, activeStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handleTapeDetails = (cover: File, name: string, description: string, bpm: string, submitDate: Date, voteDate: Date, mintDate: Date) => {
    console.log(cover, name, description, bpm, submitDate, voteDate, mintDate);
    goToNext();
  };

  const handleCuratorWallet = (walletAddress: string) => {
    console.log(walletAddress);
    goToNext();
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
      {activeStep === 2 && <SampleUpload goToPrevious={goToPrevious} />}
    </Box>
  );
};

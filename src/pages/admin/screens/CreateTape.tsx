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
      {activeStep === 0 && <TapeDetailsForm goToNext={goToNext} />}
      {activeStep === 1 && <CuratorWallet goToNext={goToNext} goToPrevious={goToPrevious} />}
      {activeStep === 2 && <SampleUpload goToPrevious={goToPrevious} />}
    </Box>
  );
};

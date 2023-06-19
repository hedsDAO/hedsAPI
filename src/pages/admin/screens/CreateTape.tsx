import { useSelector } from 'react-redux';
import { store } from '@/store';

// Components
import { Box, Step, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps, Text } from '@chakra-ui/react';
import { TapeDetailsForm } from '@/pages/admin/components/TapeDetailsForm/TapeDetailsForm';
import { CuratorWallet } from '@/pages/admin/components/CuratorWallet/CuratorWallet';
import { SampleDetails } from '@/pages/admin/components/SampleDetails/SampleDetails';

// Utils
import { createTape } from '@/api/tape';
import { useSignMessage } from 'wagmi';

// Contants
import { createTapeSteps, signMessageForTapeCreation } from '@/pages/admin/model/constants';

export const CreateTape = () => {
  const { data, isError, isLoading, isSuccess, signMessageAsync } = useSignMessage({
    message: signMessageForTapeCreation,
  });
  const connectedWallet = useSelector(store.select.authModel.selectWallet);
  const tapePayload = useSelector(store.select.adminModel.selectTapePayload);
  const { goToNext, goToPrevious, activeStep } = useSteps({
    index: 0,
    count: createTapeSteps.length,
  });

  const handleSubmit = () => {
    console.log('submit', tapePayload);
    signMessageAsync().then((signature) => {
      handleCreateTape(signature);
    });
  };

  const handleCreateTape = (signature: string) => {
    const { tapeData, songData, curatorWallet } = tapePayload;
    createTape({
      songData,
      tapeData,
      curatorWallet,
      signature,
      adminWallet: connectedWallet,
      message: 'gm wagmi frens',
      coverImage: 'https://storage.googleapis.com/hedsdev.appspot.com/cover-img.png',
      sampleAudio: 'https://storage.googleapis.com/hedsdev.appspot.com/sample-audio.mp3',
    });
  };

  return (
    <Box pt={2} px={5} maxW="7xl" mx="auto">
      <Stepper index={activeStep}>
        {createTapeSteps.map((step, index) => (
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
      {activeStep === 2 && <SampleDetails goToPrevious={goToPrevious} handleSubmit={handleSubmit} />}
    </Box>
  );
};

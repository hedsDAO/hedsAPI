import { useSelector } from 'react-redux';
import { store } from '@/store';

// Components
import { Box, Step, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps, Text } from '@chakra-ui/react';
import { TapeDetailsForm } from '@/pages/admin/components/TapeDetailsForm/TapeDetailsForm';
import { SampleDetails } from '@/pages/admin/components/SampleDetails/SampleDetails';

// Utils
import { createTape } from '@/api/tape';
import { useSignMessage } from 'wagmi';

// Contants
import { createTapeSteps, signMessageForTapeCreation } from '@/pages/admin/model/constants';

export const CreateTape = () => {
  const adminWallet = useSelector(store.select.authModel.selectWallet);
  const tapePayload = useSelector(store.select.adminModel.selectTapePayload);
  const coverImage = useSelector(store.select.adminModel.selectCoverImage);
  const sampleAudio = useSelector(store.select.adminModel.selectSampleAudio);
  const { goToNext, goToPrevious, activeStep } = useSteps({
    index: 0,
    count: createTapeSteps.length,
  });
  const { signMessageAsync } = useSignMessage({
    message: signMessageForTapeCreation,
  });

  const handleSubmit = () => {
    signMessageAsync().then((signature) => {
      handleCreateTape(signature);
    });
  };

  const handleCreateTape = (signature: string) => {
    console.log('tapePayload', tapePayload);
    console.log('signature', signature);
    console.log('adminWallet', adminWallet);
    console.log('coverImage', coverImage);
    console.log('sampleAudio', sampleAudio);
    // const { tapeData, songData, curatorWallet } = tapePayload;
    // const formattedSongData = {
    //   ...songData,
    //   track_data: {
    //     tape_name: tapeData.name,
    //   },
    // };
    // createTape({
    //   tapeData,
    //   songData: formattedSongData,
    //   curatorWallet,
    //   signature,
    //   adminWallet,
    //   message: signMessageForTapeCreation,
    //   coverImage,
    //   sampleAudio,
    // });
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
      {activeStep === 1 && <SampleDetails goToPrevious={goToPrevious} handleSubmit={handleSubmit} />}
    </Box>
  );
};

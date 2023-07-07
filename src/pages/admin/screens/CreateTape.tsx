import { useSelector } from 'react-redux';
import { store } from '@/store';

// Components
import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Text,
  Stack,
  Divider,
} from '@chakra-ui/react';
import { TapeDetailsForm } from '@/pages/admin/components/TapeDetailsForm/TapeDetailsForm';
import { SampleDetails } from '@/pages/admin/components/SampleDetails/SampleDetails';
import { TimelineDetailsForm } from '@/pages/admin/components/TimelineDetailsForm/TimelineDetailsForm';

// Utils
import { createTape } from '@/api/tape';
import { useSignMessage } from 'wagmi';

// Contants
import { createTapeSteps, signMessageForTapeCreation, adminWallets } from '@/pages/admin/model/constants';

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
    <Box pt={12} px={5} maxW="3xl" mx="auto" height="fit-content">
      {adminWallets.includes(adminWallet) ? (
        <>
          <Text fontFamily="mono" color="white" fontSize="3xl" fontWeight="bold">
            Create Tape
          </Text>
          <Divider />
          <Stack direction="row" spacing={12}>
            <Box mt={4}>
              <Stepper index={activeStep} orientation="vertical">
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
            </Box>
            {activeStep === 0 && <TapeDetailsForm goToNext={goToNext} />}
            {activeStep === 1 && <SampleDetails goToPrevious={goToPrevious} goToNext={goToNext} />}
            {activeStep === 2 && <TimelineDetailsForm goToPrevious={goToPrevious} handleSubmit={handleSubmit} />}
          </Stack>
        </>
      ) : (
        <Text fontFamily="mono" color="white" fontSize="3xl" fontWeight="bold">
          You are not authorized to create a tape
        </Text>
      )}
    </Box>
  );
};

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { store } from '@/store';

// Components
import { Box, Flex, useSteps, Text, Stack, Divider, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { TapeDetailsForm } from '@/pages/admin/components/TapeDetailsForm/TapeDetailsForm';
import { SampleDetailsForm } from '@/pages/admin/components/SampleDetailsForm/SampleDetailsForm';
import { TimelineDetailsForm } from '@/pages/admin/components/TimelineDetailsForm/TimelineDetailsForm';
import { CustomStepper } from '@/pages/admin/components/CustomStepper/CustomStepper';

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
    <Box pt={12} maxW="3xl" mx="auto" height="fit-content">
      {adminWallets.includes(adminWallet) ? (
        <>
          <Flex>
            <IconButton aria-label="Go back" variant="ghost" size="md" color="gray.200" icon={<ArrowBackIcon />} as={Link} to={`/admin`} />
            <Text fontFamily="mono" color="white" fontSize="3xl" fontWeight="bold">
              Create Tape
            </Text>
          </Flex>
          <Divider />
          <Stack direction="row" spacing={12}>
            <Box mt={4} w="25%">
              <CustomStepper currentStep={activeStep} steps={createTapeSteps} />
            </Box>
            {activeStep === 0 && <TapeDetailsForm goToNext={goToNext} />}
            {activeStep === 1 && <SampleDetailsForm goToPrevious={goToPrevious} goToNext={goToNext} />}
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

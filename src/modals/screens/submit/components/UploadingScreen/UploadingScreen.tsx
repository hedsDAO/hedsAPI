import { Fade, Spinner, Stack } from '@chakra-ui/react';

export const UploadingScreen = () => {
  return (
    <Stack alignItems={'center'} justifyContent="center" w="full" height="full">
      <Spinner size="sm" />
      <Fade in={true}>this will take a few moments</Fade>
    </Stack>
  );
};

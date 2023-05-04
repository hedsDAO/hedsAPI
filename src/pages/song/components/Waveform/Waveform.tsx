import { Box } from '@chakra-ui/react';

export const Waveform = ({ waveformRef }: { waveformRef: React.RefObject<HTMLDivElement> }) => {
  return (
    <Box position={'relative'} zIndex={3} mt={'-80px'} h="80px" overflowY={'hidden'} w="full">
      <Box w="full" ref={waveformRef} />
    </Box>
  );
};

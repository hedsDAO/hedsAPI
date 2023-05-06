import { store } from '@/store';
import { Box, keyframes, Fade, useBreakpointValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const loading = keyframes`
  from {
    height: 00%;
  }
  to {
    height: 100%;
  }
`;

export const Waveform = ({ waveformRef }: { waveformRef: React.RefObject<HTMLDivElement> }) => {
  const isLoading = useSelector(store.select.songModel.selectIsLoading);
  const numberOfBars = useBreakpointValue({ base: 60, lg: 250 });
  return (
    <>
      <Fade in={waveformRef?.current === null || isLoading}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          height="160px"
          mt={'-160px'}
          overflowY={'hidden'}
          bgColor="transparent"
          overflow="hidden"
          position="relative"
        >
          {Array.from({ length: numberOfBars }, (_, index) => (
            <Box
              key={index}
              width="4px"
              h="0%"
              mb={'-160px'}
              bgColor="#4D4D4D"
              marginRight="2px"
              animation={`${loading} 1s ease-in-out infinite alternate`}
              style={{ animationDelay: `${index * 0.02}s` }} // Use the style prop for animationDelay
            />
          ))}
        </Box>
      </Fade>
      <Box position={'relative'} zIndex={3} mt={'-80px'} h="80px" overflowY={'hidden'} w="full">
        <Box w={'full'} ref={waveformRef} />
      </Box>
    </>
  );
};

import { store } from '@/store';
import { Box, keyframes, Fade } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const loading = keyframes`
  from {
    height: 10%;
  }
  to {
    height: 100%;
  }
`;

export const Waveform = ({ waveformRef }: { waveformRef: React.RefObject<HTMLDivElement> }) => {
  const isLoading = useSelector(store.select.songModel.selectIsLoading);
  const numberOfBars = 250;
  return (
    <>
      <Fade in={isLoading}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          height="60px"
          mt={'-60px'}
          overflowY={'hidden'} 
          bgColor="transparent"
          overflow="hidden"
          position="relative"
        >
          {Array.from({ length: numberOfBars }, (_, index) => (
            <Box
              key={index}
              width="4px"
              h="10%"
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

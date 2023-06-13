import { store } from '@/store';
import { Stack, Text, Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const DisclaimerText = () => {
  const tape = useSelector(store.select.tapeModel.selectCurrentTape);
  return (
    <Stack alignItems={'center'}>
      <Text fontWeight="extrabold" color="white" letterSpacing={'widest'}>
        BEFORE YOU SUBMIT
      </Text>
      <Text opacity={'80%'} px={14} textAlign={'center'} width="100%" letterSpacing={'wide'} fontFamily={'inter'} fontSize="sm" color="white">
        All submissions must be{' '}
        <Box as="span" fontWeight={'bold'} color="red.500">
          original
        </Box>{' '}
        and{' '}
        <Box as="span" fontWeight={'bold'} color="red.500">
          not contain any copyrighted content
        </Box>
        . The track must be{' '}
        <Box as="span" fontWeight={'bold'} color="red.500">
          {tape?.bpm} BPM
        </Box>{' '}
        and have a length between{' '}
        <Box as="span" fontWeight={'bold'} color="red.500">
          60 to 90 seconds
        </Box>
        .
      </Text>
    </Stack>
  );
};

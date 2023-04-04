import { Tape as TapeMetadata } from '@/models/common';
import { Box, Image, Stack, Text } from '@chakra-ui/react';

const Tape = ({ tape }: { tape: TapeMetadata }) => {
  return (
    <Stack>
      <Image rounded="lg" src={tape.image} />
      <Text pt={2} fontSize="sm" fontWeight={'medium'} letterSpacing='widest'>
        {tape.name}
      </Text>
    </Stack>
  );
};

export default Tape;

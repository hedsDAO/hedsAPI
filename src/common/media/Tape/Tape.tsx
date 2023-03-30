import { Tape as TapeMetadata } from '@/models/common';
import { Box, Image, Stack, Text } from '@chakra-ui/react';

const Tape = ({ tape }: { tape: TapeMetadata }) => {
  return (
    <Stack>
      <Image rounded="lg" src={tape.image} />
      <Text fontFamily={'"Space Mono", monospace'}>{tape.name}</Text>
    </Stack>
  );
};

export default Tape;

import { Tape as TapeMetadata } from '@/models/common';
import { Box, Image, Stack, Text } from '@chakra-ui/react';

const Tape = ({ tape }: { tape: TapeMetadata }) => {
  return (
    <Stack>
      <Image border="solid 1px" borderColor="heds.100" rounded="md" src={tape.image} />
      <Text pt={1} fontFamily="poppins" fontSize="sm" opacity={'70%'} letterSpacing="wide" color="white">
        {tape.name}
      </Text>
    </Stack>
  );
};

export default Tape;

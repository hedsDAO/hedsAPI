import { Box, Image, Stack, Text } from '@chakra-ui/react';
import { Choice } from 'hedsvote';

interface OwnProps {
  choice: Choice;
}

export const SubmissionCard = ({ choice }: OwnProps) => {
  return (
    <Box border="1px" borderRadius="md">
      <Stack flexDirection="row">
        <Image boxSize="4rem" borderRadius="md" src={choice.image} alt="Submission Image" />
        <Stack spacing="-0.5rem" pl="2px">
          <Text fontSize="sm">{choice.name}</Text>
          <Text fontSize="xs">{choice.artist}</Text>
        </Stack>
      </Stack>
    </Box>
  );
};

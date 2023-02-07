import { Box, Image, Stack, Text } from '@chakra-ui/react';
import { Choice } from 'hedsvote';

interface OwnProps {
  choice: Choice;
}

export const SubmissionCard = ({ choice }: OwnProps) => {
  return (
    <Box border="1px" borderRadius="md" borderColor="gray.800">
      <Stack flexDirection="row">
        <Box p={2}>
          <Image boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
        </Box>
        <Stack spacing="-0.5rem" pl="2px">
          <Text fontSize="sm">{choice.name}</Text>
          <Text fontSize="xs">{choice.artist}</Text>
        </Stack>
      </Stack>
    </Box>
  );
};

const Track = ({ choice }: OwnProps) => (
  <Box border="1px" borderRadius="md" borderColor="gray.500" bg="purple.100">
    <Stack flexDirection="row">
      <Box p={2}>
        <Image boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
      </Box>
      <Stack spacing="-0.5rem" pl="2px">
        <Text fontSize="sm">{choice.name}</Text>
        <Text fontSize="xs">{choice.artist}</Text>
      </Stack>
    </Stack>
  </Box>
);

const SelectedSubmission = ({ choice }: OwnProps) => (
  <Box border="1px" borderRadius="md" borderColor="gray.800">
    <Stack flexDirection="row">
      <Box p={2}>
        <Image boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
      </Box>
      <Stack spacing="-0.5rem" pl="2px">
        <Text fontSize="sm">{choice.name}</Text>
        <Text fontSize="xs">{choice.artist}</Text>
      </Stack>
    </Stack>
  </Box>
);

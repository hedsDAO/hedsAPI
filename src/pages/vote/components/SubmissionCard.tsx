import { Box, Flex, Image, Progress, Stack, Text } from '@chakra-ui/react';
import { SubmissionChoice } from '../store/voteModel';
interface SubmissionProps {
  choices: [SubmissionChoice][];
}
interface CardProps {
  choice: SubmissionChoice;
}

export const SubmissionCards = ({ choices }: SubmissionProps) => {
  const [tracks, selected, submissions] = choices;
  console.log('tracks', tracks);
  return (
    <>
      {tracks.map((choice) => (
        <Track key={choice.name + choice.image} choice={choice} />
      ))}
      {selected.map((choice) => (
        <SelectedSubmission key={choice.name + choice.image} choice={choice} />
      ))}
      {submissions.map((choice) => (
        <Submission key={choice.name + choice.image} choice={choice} />
      ))}
    </>
  );
};

const Track = ({ choice }: CardProps) => (
  <Box border="1px" borderRadius="md" borderColor="gray.500" bg="purple.100">
    <Stack flexDirection="row">
      <Box p={2}>
        <Image boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
      </Box>
      <Flex direction="column" pl="2px">
        <Text fontSize="sm">{choice.name}</Text>
        <Text fontSize="xs">{choice.artist}</Text>
        <Progress size="sm" value={choice.score} colorScheme="gray" borderRadius="md" />
      </Flex>
    </Stack>
  </Box>
);

const Submission = ({ choice }: CardProps) => {
  return (
    <Box border="1px" borderRadius="md" borderColor="gray.800">
      <Stack flexDirection="row">
        <Box p={2}>
          <Image boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
        </Box>
        <Flex direction="column" pl="2px">
          <Text fontSize="sm">{choice.name}</Text>
          <Text fontSize="xs">{choice.artist}</Text>
          <Progress size="sm" value={choice.score} colorScheme="gray" borderRadius="md" />
        </Flex>
      </Stack>
    </Box>
  );
};

const SelectedSubmission = ({ choice }: CardProps) => (
  <Box border="1px" borderRadius="md" borderColor="gray.800" bg="gray.200">
    <Stack flexDirection="row">
      <Box p={2}>
        <Image boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
      </Box>
      <Flex direction="column" pl="2px">
        <Text fontSize="sm">{choice.name}</Text>
        <Text fontSize="xs">{choice.artist}</Text>
        <Progress size="sm" value={choice.score} colorScheme="gray" borderRadius="md" />
      </Flex>
    </Stack>
  </Box>
);

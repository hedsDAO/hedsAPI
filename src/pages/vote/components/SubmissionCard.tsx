import { Box, Flex, Grid, Image, Progress, Stack, Text } from '@chakra-ui/react';
import { SubmissionChoice } from '../store/voteModel';
import { OLD_TAPES } from '@pages/vote/store/constants';
interface SubmissionProps {
  choices: [SubmissionChoice][];
  handleSelectedSubmission: (choice: SubmissionChoice) => void;
  tapeId: string;
}
interface CardProps {
  choice: SubmissionChoice;
  handleSelectedSubmission: (choice: SubmissionChoice) => void;
}

export const SubmissionCards = ({ choices, handleSelectedSubmission, tapeId }: SubmissionProps) => {
  const isOldTape = OLD_TAPES.includes(tapeId);
  const [tracks, selected, submissions] = choices;

  return (
    <Grid pt={6} templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={1} border="1px" borderRadius="md" p={2}>
      {isOldTape ? (
        <>
          {choices.flat().map((choice) => (
            <Track key={choice.name + choice.image} choice={choice} handleSelectedSubmission={handleSelectedSubmission} />
          ))}
        </>
      ) : (
        <>
          {tracks.map((choice) => (
            <Track key={choice.name + choice.image} choice={choice} handleSelectedSubmission={handleSelectedSubmission} />
          ))}
          {selected.map((choice) => (
            <SelectedSubmission key={choice.name + choice.image} choice={choice} handleSelectedSubmission={handleSelectedSubmission} />
          ))}
          {submissions.map((choice) => (
            <Submission key={choice.name + choice.image} choice={choice} handleSelectedSubmission={handleSelectedSubmission} />
          ))}
        </>
      )}
    </Grid>
  );
};

const Track = ({ choice, handleSelectedSubmission }: CardProps) => (
  <Box border="1px" borderRadius="md" borderColor="gray.500" bg="purple.100" _hover={{ cursor: 'pointer' }} onClick={() => handleSelectedSubmission(choice)}>
    <Stack flexDirection="row">
      <Box p={2}>
        <Image boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
      </Box>
      <Flex direction="column" pl="2px">
        <Text fontSize="sm">{choice.name}</Text>
        <Text fontSize="xs">{choice.artist}</Text>
        <Progress size="sm" value={choice.score} colorScheme="gray" borderRadius="md" />
        <Text fontSize="xs">{choice.score}%</Text>
      </Flex>
    </Stack>
  </Box>
);

const Submission = ({ choice, handleSelectedSubmission }: CardProps) => {
  return (
    <Box border="1px" borderRadius="md" borderColor="gray.800" _hover={{ cursor: 'pointer' }} onClick={() => handleSelectedSubmission(choice)}>
      <Stack flexDirection="row">
        <Box p={2}>
          <Image boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
        </Box>
        <Flex direction="column" pl="2px">
          <Text fontSize="sm">{choice.name}</Text>
          <Progress size="sm" value={choice.score} colorScheme="gray" borderRadius="md" />
          <Text fontSize="xs">{choice.score}%</Text>
        </Flex>
      </Stack>
    </Box>
  );
};

const SelectedSubmission = ({ choice, handleSelectedSubmission }: CardProps) => (
  <Box border="1px" borderRadius="md" borderColor="gray.800" bg="gray.200" _hover={{ cursor: 'pointer' }} onClick={() => handleSelectedSubmission(choice)}>
    <Stack flexDirection="row">
      <Box p={2}>
        <Image boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
      </Box>
      <Flex direction="column" pl="2px">
        <Text fontSize="sm">{choice.name}</Text>
        <Progress size="sm" value={choice.score} colorScheme="gray" borderRadius="md" />
        <Text fontSize="xs">{choice.score}%</Text>
      </Flex>
    </Stack>
  </Box>
);

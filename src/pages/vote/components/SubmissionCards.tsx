import { Box, Flex, Grid, Image, Progress, Stack, Text } from '@chakra-ui/react';
import { SubmissionChoice } from '../store/voteModel';
import { Choice } from 'hedsvote';

interface SubmissionProps {
  choices: [SubmissionChoice][];
  handleSelectedSubmission: (choice: SubmissionChoice) => void;
}
interface CardProps {
  choice: SubmissionChoice;
  handleSelectedSubmission: (choice: SubmissionChoice) => void;
}

interface OldTapeProps {
  choices: Choice[];
  handleSelectedSubmission: (choice: Choice) => void;
}

export const SubmissionCards = ({ choices, handleSelectedSubmission }: SubmissionProps) => {
  const [tracks, selected, submissions] = choices;

  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={1}>
      {tracks.map((choice) => (
        <Track key={choice.name + choice.image} choice={choice} handleSelectedSubmission={handleSelectedSubmission} />
      ))}
      {selected.map((choice) => (
        <SelectedSubmission key={choice.name + choice.image} choice={choice} handleSelectedSubmission={handleSelectedSubmission} />
      ))}
      {submissions.map((choice) => (
        <Submission key={choice.name + choice.image} choice={choice} handleSelectedSubmission={handleSelectedSubmission} />
      ))}
    </Grid>
  );
};

export const OldTapeTrack = ({ choices, handleSelectedSubmission }: OldTapeProps) => (
  <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={1} borderRadius="md">
    {choices.map((choice) => (
      <Box
        border="1px"
        borderRadius="md"
        borderColor="gray.500"
        bg="purple.100"
        _hover={{ cursor: 'pointer' }}
        onClick={() => handleSelectedSubmission(choice)}
        key={choice.name + choice.image}
      >
        <Stack flexDirection="row">
          <Box p={2}>
            <Image boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
          </Box>
          <Flex direction="column" pl="2px">
            <Text fontSize="xs">{choice.name}</Text>
            <Text fontSize="2xs" textColor={'gray.700'}>
              {choice.artist}
            </Text>
          </Flex>
        </Stack>
      </Box>
    ))}
  </Grid>
);

const Track = ({ choice, handleSelectedSubmission }: CardProps) => (
  <Box border="1px" borderRadius="md" borderColor="gray.500" bg="purple.100" _hover={{ cursor: 'pointer' }} onClick={() => handleSelectedSubmission(choice)}>
    <Stack flexDirection="row">
      <Box p={2}>
        <Image minW="3rem" minH="3rem" boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
      </Box>
      <Flex w="full" direction="column" pl={1} pr={2}>
        <Text mt={'-1px !important'} fontSize="xs">
          {choice.name}
        </Text>
        <Flex mt={-0.5} minW="full" justifyContent={'space-between'}>
          <Text fontSize="2xs" textColor={'gray.700'}>
            {choice.artist}
          </Text>
          <Text mt={1} fontSize="2xs" textColor={'gray.800'}>
            {choice.score}%
          </Text>
        </Flex>
        <Progress mt={1} size="sm" value={choice.score} colorScheme="gray" borderRadius="md" />
      </Flex>
    </Stack>
  </Box>
);

const Submission = ({ choice, handleSelectedSubmission }: CardProps) => (
  <Box border="1px" borderRadius="md" borderColor="gray.800" _hover={{ cursor: 'pointer' }} onClick={() => handleSelectedSubmission(choice)}>
    <Stack flexDirection="row">
      <Box p={2}>
        <Image minW="3rem" minH="3rem" boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
      </Box>
      <Flex w="full" direction="column" pl={1} pr={2}>
        <Text mt={'-0.5px !important'} fontSize="xs">
          {choice.name}
        </Text>
        <Flex mt={-0.5} minW="full" justifyContent={'end'}>
          <Text mt={1} fontSize="2xs" textColor={'gray.800'}>
            {choice.score}%
          </Text>
        </Flex>
        <Progress mt={1} size="sm" value={choice.score} colorScheme="gray" borderRadius="md" />
      </Flex>
    </Stack>
  </Box>
);

const SelectedSubmission = ({ choice, handleSelectedSubmission }: CardProps) => (
  <Box border="1px" borderRadius="md" borderColor="gray.800" bg="gray.200" _hover={{ cursor: 'pointer' }} onClick={() => handleSelectedSubmission(choice)}>
    <Stack flexDirection="row">
      <Box p={2}>
        <Image minW="3rem" minH="3rem" boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
      </Box>
      <Flex w="full" direction="column" pl={1} pr={2}>
        <Text mt={'-1px !important'} fontSize="xs">
          {choice.name}
        </Text>
        <Flex mt={-0.5} minW="full" justifyContent={'end'}>
          <Text fontSize="2xs" textColor={'gray.800'}>
            {choice.score}%
          </Text>
        </Flex>
        <Progress mt={1} size="sm" value={choice.score} colorScheme="gray" borderRadius="md" />
      </Flex>
    </Stack>
  </Box>
);

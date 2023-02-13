import { Box, Flex, Grid, Image, Progress, Stack, Text, IconButton, Center } from '@chakra-ui/react';
import { SubmissionChoice } from '../store/voteModel';
import { Choice } from 'hedsvote';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';

interface SubmissionProps {
  choices: SubmissionChoice[][];
  handleSelectedSubmission: (choice: SubmissionChoice) => void;
}

interface CardProps {
  choice: SubmissionChoice;
  handleSelectedSubmission: (choice: SubmissionChoice) => void;
  showArtist?: boolean;
}

interface OldTapeSubmissionsProps {
  tracks: Choice[];
  choices: Choice[];
  handleSelectedSubmission: (choice: Choice) => void;
}

interface OldTapeCardProps {
  choice: Choice;
  handleSelectedSubmission: (choice: Choice) => void;
}

interface OpenVoteSubmissionProps {
  choices: Choice[];
  handleSelectedSubmission: (choice: SubmissionChoice) => void;
}

interface Tape06CardProps {
  tracks: SubmissionChoice[];
  choices: SubmissionChoice[];
  handleSelectedSubmission: (choice: SubmissionChoice) => void;
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

export const OpenVoteCards = ({ choices, handleSelectedSubmission }: OpenVoteSubmissionProps) => {
  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={1}>
      {choices
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((choice) => (
          <OpenSubmission key={choice.name + choice.image} choice={choice} handleSelectedSubmission={handleSelectedSubmission} />
        ))}
    </Grid>
  );
};

export const OldTapeSubmissions = ({ tracks, choices, handleSelectedSubmission }: OldTapeSubmissionsProps) => (
  <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={1} borderRadius="md">
    {tracks.map((choice) => (
      <OldTapeTrack key={choice.name + choice.image} choice={choice} handleSelectedSubmission={handleSelectedSubmission} />
    ))}
    {choices.map((choice) => (
      <OldTapeSubmission key={choice.name + choice.image} choice={choice} handleSelectedSubmission={handleSelectedSubmission} />
    ))}
  </Grid>
);

const OldTapeTrack = ({ choice, handleSelectedSubmission }: CardProps) => (
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
);

const OldTapeSubmission = ({ choice, handleSelectedSubmission }: OldTapeCardProps) => (
  <Box border="1px" borderRadius="md" borderColor="gray.800" _hover={{ cursor: 'pointer' }} onClick={() => handleSelectedSubmission(choice)}>
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
);

const Track = ({ choice, handleSelectedSubmission, showArtist = true }: CardProps) => (
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
            {showArtist ? choice.artist : ''}
          </Text>
          <Text mt={1} fontSize="2xs" textColor={'gray.800'}>
            {+choice.score.toFixed(2)}%
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
            {+choice.score.toFixed(2)}%
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
            {+choice.score.toFixed(2)}%
          </Text>
        </Flex>
        <Progress mt={1} size="sm" value={choice.score} colorScheme="gray" borderRadius="md" />
      </Flex>
    </Stack>
  </Box>
);

const OpenSubmission = ({ choice, handleSelectedSubmission }: CardProps) => {
  const dispatch = useDispatch<Dispatch>();
  const userLikes = useSelector(store.select.voteModel.selectUserLikes);
  const vp = useSelector(store.select.voteModel.selectUserVotingPower);
  return (
    <Box border="1px" borderRadius="md" borderColor="gray.800" _hover={{ cursor: 'pointer' }} onClick={() => handleSelectedSubmission(choice)}>
      <Stack flexDirection="row">
        <Box p={2}>
          <Image minW="3rem" minH="3rem" boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
        </Box>
        <Flex w="full" direction="column" pl={1} pr={2}>
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Text mt={'-0.5px !important'} fontSize="xs">
              {choice.name}
            </Text>
            {vp > 0 && (
              <IconButton
                onClick={() => {
                  if (userLikes?.[choice.id] >= 0) dispatch.voteModel.deleteChoiceFromLikes(choice);
                  else dispatch.voteModel.addChoiceToLikes(choice);
                }}
                bg="transparent !important"
                size="xs"
                aria-label="like"
                _hover={{ bg: 'gray.200' }}
                ml={1}
              >
                <Center _hover={{ transform: 'scale(1.1)' }} h="100%" w="100%">
                  {userLikes?.[choice.id] >= 0 ? <FilledHeartIcon height="16" width="16" /> : <HeartIcon height="16" width="16" />}
                </Center>
              </IconButton>
            )}
          </Flex>
          <Progress mt={2} size="sm" value={choice.score} colorScheme="gray" borderRadius="md" />
        </Flex>
      </Stack>
    </Box>
  );
};

export const Tape06Submissions = ({ tracks, choices, handleSelectedSubmission }: Tape06CardProps) => {
  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={1}>
      {tracks.map((choice) => (
        <Track key={choice.name + choice.image} choice={choice} handleSelectedSubmission={handleSelectedSubmission} showArtist={false} />
      ))}
      {choices.map((choice) => (
        <Submission key={choice.name + choice.image} choice={choice} handleSelectedSubmission={handleSelectedSubmission} />
      ))}
    </Grid>
  );
};

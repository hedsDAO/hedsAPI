import { Box, Flex, Grid, Image, Progress, Stack, Text } from '@chakra-ui/react';
import { ChoiceWithScore } from '@/pages/vote/models/voteModel';

export const Submissions = ({ choices }: { choices: ChoiceWithScore[][] }) => {
  const [tracks, selected, submissions] = choices;
  return (
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={1} pt={4}>
      {/* <Flex flexWrap="wrap" mx={{ base: 2, lg: 8 }} px={['20px', '60px', '100px', '120px']}> */}
      {tracks.map((choice) => (
        <Track key={choice.name + choice.image} choice={choice} />
      ))}
      {selected.map((choice) => (
        <SelectedSubmission key={choice.name + choice.image} choice={choice} />
      ))}
      {submissions.map((choice) => (
        <SubmissionCard key={choice.name + choice.image} choice={choice} />
      ))}
      {/* </Flex> */}
    </Grid>
  );
};

const Track = ({ choice }: { choice: ChoiceWithScore }) => (
  <Box border="1px" borderRadius="md" borderColor="#9293FF" bg="#745CBA" _hover={{ cursor: 'pointer' }}>
    <Stack flexDirection="row">
      <Box p={2}>
        <Image minW="3rem" minH="3rem" boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
      </Box>
      <Flex w="full" direction="column" pl={1} pr={2}>
        <Text mt={'-1px !important'} fontSize="xs" color="#DFDFDF" fontFamily="monospace">
          {choice.name}
        </Text>
        <Flex mt={-0.5} minW="full" justifyContent={'space-between'}>
          <Text fontSize="2xs" textColor="#FFFFFF" fontFamily="inter" letterSpacing="widest">
            {choice.artist}
          </Text>
          <Text mt={1} fontSize="2xs" textColor="white">
            {+choice.score.toFixed(2)}%
          </Text>
        </Flex>
        <Progress mt={1} size="sm" value={choice.score} colorScheme="gray" borderRadius="md" />
      </Flex>
    </Stack>
  </Box>
);

const SelectedSubmission = ({ choice }: { choice: ChoiceWithScore }) => (
  <Box border="1px" borderRadius="md" borderColor="#9293FF" bg="#4F4F4F" _hover={{ cursor: 'pointer' }}>
    <Stack flexDirection="row">
      <Box p={2}>
        <Image minW="3rem" minH="3rem" boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
      </Box>
      <Flex w="full" direction="column" pl={1} pr={2}>
        <Text mt={'-1px !important'} fontSize="xs" color="#DFDFDF" fontFamily="monospace">
          {choice.name}
        </Text>
        <Flex mt={-0.5} minW="full" justifyContent={'space-between'}>
          <Text fontSize="2xs" textColor="#FFFFFF" fontFamily="inter" letterSpacing="widest">
            {choice.artist}
          </Text>
          <Text mt={1} fontSize="2xs" textColor="white">
            {+choice.score.toFixed(2)}%
          </Text>
        </Flex>
        <Progress mt={1} size="sm" value={choice.score} colorScheme="gray" borderRadius="md" />
      </Flex>
    </Stack>
  </Box>
);

const SubmissionCard = ({ choice }: { choice: ChoiceWithScore }) => (
  <Box border="1px" borderRadius="md" borderColor="#9293FF" _hover={{ cursor: 'pointer' }}>
    <Stack flexDirection="row">
      <Box p={2}>
        <Image minW="3rem" minH="3rem" boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
      </Box>
      <Flex w="full" direction="column" pl={1} pr={2}>
        <Text mt={'-1px !important'} fontSize="xs" color="#DFDFDF" fontFamily="monospace">
          {choice.name}
        </Text>
        <Flex mt={-0.5} minW="full" justifyContent={'space-between'}>
          <Text fontSize="2xs" textColor="#FFFFFF" fontFamily="inter" letterSpacing="widest">
            {choice.artist}
          </Text>
          <Text mt={1} fontSize="2xs" textColor="white">
            {+choice.score.toFixed(2)}%
          </Text>
        </Flex>
        <Progress mt={1} size="sm" value={choice.score} colorScheme="gray" borderRadius="md" />
      </Flex>
    </Stack>
  </Box>
);

import { Box, Flex, Grid, Image, Progress, Stack, Text, IconButton, Center } from '@chakra-ui/react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, store } from '@/store';
import { Choice, ChoiceWithScore } from '@/pages/vote/models/voteModel';

interface OpenVoteSubmissionProps {
  choices: Choice[];
  handleSelectedSubmission: (choice: ChoiceWithScore) => void;
}

interface CardProps {
  choice: ChoiceWithScore;
  handleSelectedSubmission: (choice: ChoiceWithScore) => void;
  showArtist?: boolean;
}

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

const OpenSubmission = ({ choice, handleSelectedSubmission }: CardProps) => {
  const dispatch = useDispatch<Dispatch>();
  const userLikes = useSelector(store.select.voteModel.selectUserLikes);
  const vp = useSelector(store.select.voteModel.selectUserVotingPower);
  const totalVpDistributed = Object.values(userLikes).reduce((num, acc) => num + acc, 0);
  const currentVpDistribution = userLikes[choice.id] / totalVpDistributed;
  return (
    <Box border="1px" borderRadius="md" borderColor="#9293FF" _hover={{ cursor: 'pointer' }} onClick={() => handleSelectedSubmission(choice)}>
      <Stack flexDirection="row">
        <Box p={2}>
          <Image minW="3rem" minH="3rem" boxSize="3rem" borderRadius="md" src={choice.image} alt="Submission Image" />
        </Box>
        <Flex w="full" direction="column" pl={1} pr={2} justifyContent="center">
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Text mt={'-0.5px !important'} fontSize="xs" color="#DFDFDF" fontFamily="space">
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
                  {userLikes?.[choice.id] >= 0 ? <HeartIcon height="16" width="16" fill="red" /> : <HeartIcon height="16" width="16" stroke="#808080" />}
                </Center>
              </IconButton>
            )}
          </Flex>
          <Progress
            mt={vp > 0 ? 2 : 4}
            size="sm"
            value={currentVpDistribution > 0 ? currentVpDistribution * 100 : 0.01}
            colorScheme="purple"
            borderRadius="md"
          />
        </Flex>
      </Stack>
    </Box>
  );
};

import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Box, Divider, Flex, Grid, Heading, Stack, Image, Text, Progress } from '@chakra-ui/react';
import { VoteChoice } from '../store/voteModel';

interface OwnProps {
  handleSelectedSubmission: (choice: VoteChoice) => void;
}

export const ActiveSubmissions = ({ handleSelectedSubmission }: OwnProps) => {
  const choices = useSelector(store.select.voteModel.selectProposalChoices);

  return (
    <Box mx="auto">
      <Divider my={3} borderColor="transparent" w="full" />
      <Heading className="animate__animated animate__fadeIn" fontWeight="light" letterSpacing="widest" size={['xs', 'sm']} color={'gray.900'}>
        SUBMISSIONS
      </Heading>
      <Divider my={1.5} borderColor="transparent" w="full" />
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={1}>
        {choices
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((choice) => (
            <Box
              key={choice.name + choice.image}
              border="1px"
              borderRadius="md"
              borderColor="gray.800"
              _hover={{ cursor: 'pointer' }}
              onClick={() => handleSelectedSubmission(choice)}
            >
              <Stack flexDirection="row">
                <Box p={2}>
                  <Image minW="3rem" minH="3rem" boxSize="3rem" borderRadius="md" src={choice.image} />
                </Box>
                <Flex w="full" direction="column" pl={1} pr={2}>
                  <Text mt={'-0.5px !important'} fontSize="xs">
                    {choice.name}
                  </Text>
                </Flex>
              </Stack>
            </Box>
          ))}
      </Grid>
    </Box>
  );
};

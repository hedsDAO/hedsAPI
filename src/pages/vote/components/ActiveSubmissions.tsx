import { useSelector } from 'react-redux';
import { store } from '@/store';
import { Box, Divider, Flex, Grid, Heading } from '@chakra-ui/react';
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
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={1}></Grid>
    </Box>
  );
};

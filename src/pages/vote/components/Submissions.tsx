import { Dispatch, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Grid, Skeleton, Text, VStack } from '@chakra-ui/react';
import { SubmissionCard } from './SubmissionCard';

import { Choice } from 'hedsvote';

export const Submissions = () => {
  const dispatch = useDispatch<Dispatch>();
  const choices = useSelector(store.select.voteModel.selectProposalChoices);
  const proposal = useSelector(store.select.voteModel.selectProposal);

  return (
    <Box mx="auto">
      what
      <Grid pt={6} templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={1}>
        {choices &&
          choices?.map((choice: Choice) => {
            return <SubmissionCard key={choice.name + choice.image} choice={choice} />;
          })}
      </Grid>
    </Box>
  );
};

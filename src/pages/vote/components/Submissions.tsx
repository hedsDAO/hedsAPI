import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Dispatch, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';


import { Box, Grid, Skeleton, Text, VStack } from '@chakra-ui/react';
import { SubmissionCard } from './SubmissionCard';

import { Choice } from 'hedsvote';

export const Submissions = () => {
  const { tape, id } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const choices = useSelector(store.select.voteModel.selectProposalChoices);
  const proposal = useSelector(store.select.voteModel.selectProposal);
  const scores = useSelector(store.select.voteModel.selectScores);
  const currentTape = useSelector(store.select.tapesModel.selectCurrentVoteTape([tape, id]));
  const sortedChoicesByResults = useSelector(store.select.voteModel.selectSortedChoicesByResults({choices, scores, tapeTrackIds: currentTape?.tracks}));

  useEffect(() => {
    console.log('sorted choices by results', sortedChoicesByResults);
  }, [currentTape]);

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

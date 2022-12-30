import { Dispatch, store } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { VoteChoiceCard } from '@/common/media';
import { Choice } from 'hedsvote';
import { Container, Grid } from '@chakra-ui/react';

const VoteChoices = () => {
  const dispatch = useDispatch<Dispatch>();
  const choices = useSelector(store.select.voteModel.selectProposalChoices);

  return (
    <Container mx="auto" maxW="7xl">
      <Grid pt={6} templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(10, 1fr)' }} gap={3}>
        {choices &&
          choices?.map((choice: Choice) => {
            return <VoteChoiceCard onClick={() => dispatch.voteModel.setCurrentTrack(choice)} key={choice.name + choice.image} choice={choice} />;
          })}
      </Grid>
    </Container>
  );
};
export default VoteChoices;

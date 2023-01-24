import { Dispatch, store } from '@/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { VoteChoiceCard } from './VoteChoiceCard';
import { Container, Flex, Grid, Heading, Stack } from '@chakra-ui/react';
import { SelectedSubmission } from './SelectedSubmission';
import { VoteDistribution } from '../components/VoteDistribution';

// Models
import { Choice, ProposalState } from 'hedsvote';
import { SubmissionChoice } from '../store/voteModel';

export const VoteChoices = () => {
  const dispatch = useDispatch<Dispatch>();
  const choices = useSelector(store.select.voteModel.selectProposalChoices);
  const proposal = useSelector(store.select.voteModel.selectProposal);
  const proposalState = proposal?.state;
  const [voteOptions, setVoteOptions] = useState<SubmissionChoice[]>([]);

  const handleSelectedSubmission = (choice: Choice) => {
    if (proposalState === ProposalState.CLOSED) {
      if (!voteOptions.find((c) => c.id === choice.id)) {
        const choiceWithScore = { ...choice, score: 0 };
        setVoteOptions([...voteOptions, choiceWithScore]);
      }
    }
    dispatch.voteModel.setCurrentTrack(choice);
  };

  const handleScoreChange = (choice: SubmissionChoice, type: string) => {
    const newVoteOptions = voteOptions.map((c) => {
      if (c.id === choice.id) {
        return { ...c, score: type === 'add' ? c.score + 1 : c.score > 0 ? c.score - 1 : 0 };
      } else {
        return c;
      }
    });
    setVoteOptions(newVoteOptions);
  };

  return (
    <Container mx="auto" maxW="7xl">
      {proposalState === ProposalState.CLOSED ? (
        <VoteDistribution handleScoreChange={handleSelectedSubmission} />
      ) : (
        <Flex>
          <Container>
            <Heading
              px={{ base: 0, lg: 2 }}
              className="animate__animated animate__fadeIn"
              fontWeight={'semibold'}
              letterSpacing={'widest'}
              size={['xs', 'sm']}
              color={'gray.900'}
            >
              SUBMISSIONS
            </Heading>
            <Grid pt={6} templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }} gap={3}>
              {choices &&
                choices?.map((choice: Choice) => {
                  return <VoteChoiceCard onClick={() => handleSelectedSubmission(choice)} key={choice.name + choice.image} choice={choice} />;
                })}
            </Grid>
          </Container>

          <Container>
            <Heading
              px={{ base: 0, lg: 2 }}
              className="animate__animated animate__fadeIn"
              fontWeight={'semibold'}
              letterSpacing={'widest'}
              size={['xs', 'sm']}
              color={'gray.900'}
            >
              SELECTED SUBMISSIONS
            </Heading>
            <Stack pt={3} my={3}>
              {voteOptions.map((choice: SubmissionChoice) => {
                return (
                  <SelectedSubmission
                    handleRemoveSubmission={() => setVoteOptions(voteOptions.filter((c) => c.id !== choice.id))}
                    key={choice.name + choice.image}
                    choice={choice}
                    handleScoreChange={handleScoreChange}
                  />
                );
              })}
            </Stack>
          </Container>
        </Flex>
      )}
    </Container>
  );
};

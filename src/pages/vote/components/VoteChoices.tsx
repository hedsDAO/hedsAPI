import { Dispatch, store } from '@/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import { VoteChoiceCard } from '@/common/media';
import { Container, Flex, Grid, Heading, Stack } from '@chakra-ui/react';
import { SubmissionCard } from './SubmissionCard';
import { SelectedSubmission } from './SelectedSubmission';

// Models
import { Choice, ProposalState } from 'hedsvote';
import { SubmissionChoice } from '../store/voteModel';

// Styles
import styled from 'styled-components';

export const VoteChoices = () => {
  const dispatch = useDispatch<Dispatch>();
  const choices = useSelector(store.select.voteModel.selectProposalChoices);
  const proposal = useSelector(store.select.voteModel.selectProposal);
  const proposalState = proposal?.state;
  const [voteOptions, setVoteOptions] = useState<SubmissionChoice[]>([]);

  const handleSelectedSubmission = (choice: Choice) => {
    if (!voteOptions.find((c) => c.id === choice.id)) {
      const choiceWithScore = { ...choice, score: 0 };
      setVoteOptions([...voteOptions, choiceWithScore]);
    }
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

  // need to add heading to CLOSED option
  return (
    <Container mx="auto" maxW="7xl">
      {proposalState === ProposalState.OPEN ? (
        <Grid pt={6} templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(10, 1fr)' }} gap={3}>
          {choices &&
            choices?.map((choice: Choice) => {
              return <VoteChoiceCard onClick={() => dispatch.voteModel.setCurrentTrack(choice)} key={choice.name + choice.image} choice={choice} />;
            })}
        </Grid>
      ) : (
        <Flex>
          <Container>
            <StyledHeading px={{ base: 0, lg: 2 }} className="animate__animated animate__fadeIn" size={['xs', 'sm']}>
              SUBMISSIONS
            </StyledHeading>
            <Grid pt={6} templateColumns={{ base: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }} gap={3}>
              {choices &&
                choices?.map((choice: Choice) => {
                  return <SubmissionCard onClick={() => handleSelectedSubmission(choice)} key={choice.name + choice.image} choice={choice} />;
                })}
            </Grid>
          </Container>

          <Container>
            <StyledHeading px={{ base: 0, lg: 2 }} className="animate__animated animate__fadeIn" size={['xs', 'sm']}>
              SELECTED SUBMISSIONS
            </StyledHeading>
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

const StyledHeading = styled(Heading)`
  font-weight: 'semibold';
  letter-spacing: 'widest';
  color: 'gray.900';
`;

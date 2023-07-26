import { Strategy, Choice } from 'hedsvote';

interface _Vote {
  id?: number;
  proposal_id: string;
  signature?: string;
  vp: number;
  voter: string;
  vote_choices: _VoteChoice[];
}
interface _VoteChoice {
  vote_id?: number;
  choice_id: number;
  proposal_id: string;
  amount: number;
}

interface QuadraticVoteConfig {
  choices: Choice[];
  strategies: Strategy[];
  votes: _Vote[];
  // selected: { [key: string]: number };
}

export function QuadraticVoting(config: QuadraticVoteConfig) {
  const { choices, votes, strategies } = config;
  console.log('choices', choices);
  console.log('votes', votes);
  console.log('strategies', strategies);

  const totalVp: number = votes.reduce((acc, curr: _Vote) => {
    const { vp } = curr;
    return acc + vp;
  }, 0);

  /**
  Returns an object mapping each choice by ID with the value of the weight of that choice calculated as choice / total weight within a single vote across all votes
   */
  function calculateVoteWeightByChoiceId<
    R extends Record<number, number>,
  >(): R {
    const proposalChoices: { [key: number]: number } = Object.fromEntries(choices.map(({ id }) => [id , 0]));

    return votes.reduce((acc, curr: _Vote) => {
      const { vote_choices, vp } = curr;

      const totalWeightPerVote = vote_choices.reduce((acc, choice) => (acc += choice.amount), 0);

      // Populating the proposal choices object with individual vote
      vote_choices.forEach((choice) => {
        const percentage = choice.amount / totalWeightPerVote;
        acc[choice.choice_id] ? (acc[choice.choice_id] += Math.sqrt(percentage * vp)) : (acc[choice.choice_id] = Math.sqrt(percentage * vp));
      });
      return acc;
    }, proposalChoices) as unknown as R;
  }

  return {
    getScores() {
      const voteWeightByChoice = calculateVoteWeightByChoiceId();
      const squareTotalScoreByChoice = Object.values(voteWeightByChoice).map((score) => score * score);
      const totalScores = squareTotalScoreByChoice.reduce((acc, curr) => acc + curr, 0);
      const calculatedScoreByChoice = squareTotalScoreByChoice.map((score) => {
        const percentage = (score / totalScores) * 100;
        return parseFloat(((totalVp / 100) * percentage).toFixed(3));
      });

      return calculatedScoreByChoice;
    },
    getScoresTotal() {
      return totalVp;
    },
  };
}

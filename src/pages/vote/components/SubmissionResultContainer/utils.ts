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

  const isValidChoice = (voteChoice, voteWeight) => {
    return (
      typeof voteChoice === 'number' &&
      // proposalChoices[voteChoice] !== undefined &&
      voteWeight > 0
    );
  };

  /**
  Returns an object mapping each choice by ID with the value of the weight of that choice calculated as choice / total weight within a single vote across all votes
   */
  function calculateVoteWeightByChoiceId<
    T extends 'normal' | 'strategy',
    R extends Record<number, any> = T extends 'normal' ? Record<number, number> : Record<number, Record<number, number>>,
  >(type: T): R {
    const proposalChoices: { [key: number]: number } =
      type === 'strategy'
        ? choices.reduce((acc, { id }) => {
            acc[id] = Object.fromEntries(strategies.map((_, idx) => [idx, 0]));
            return acc;
          }, {})
        : Object.fromEntries(choices.map(({ id }) => [id + 1, 0]));

    return votes.reduce((acc, curr: _Vote) => {
      const { vote_choices, vp } = curr;

      const totalWeightPerVote = vote_choices.reduce((acc, choice) => (acc += choice.amount), 0);

      // Populating the proposal choices object with individual vote
      vote_choices.forEach((choice) => {
        const percentage = choice.amount / totalWeightPerVote;
        if (type === 'normal') {
          acc[choice.choice_id] ? (acc[choice.choice_id] += Math.sqrt(percentage * vp)) : (acc[choice.choice_id] = Math.sqrt(percentage * vp));
        } else {
          strategies.forEach((_, idx) => {
            acc[choice.choice_id][idx] ? (acc[choice.choice_id][idx] += Math.sqrt(percentage)) : (acc[choice.choice_id][idx] = Math.sqrt(percentage));
          });
        }
      });
      return acc;
    }, proposalChoices) as unknown as R;
  }

  return {
    getScores() {
      const voteWeightByChoice = calculateVoteWeightByChoiceId('normal');
      const squareTotalScoreByChoice = Object.values(voteWeightByChoice).map((score) => score * score);
      const totalScores = squareTotalScoreByChoice.reduce((acc, curr) => acc + curr, 0);
      const calculatedScoreByChoice = squareTotalScoreByChoice.map((score) => {
        const percentage = (score / totalScores) * 100;
        return parseFloat(((totalVp / 100) * percentage).toFixed(3));
      });

      return calculatedScoreByChoice;
    },

    getScoresByStrategy() {
      const voteWeightByChoice = calculateVoteWeightByChoiceId('strategy');
      const squareTotalScoreByChoice = Object.values(voteWeightByChoice)
        .map((choiceStrategies) => Object.values(choiceStrategies))
        .map((choiceStrategies) => choiceStrategies.map((val) => val * val));
      const totalScores = squareTotalScoreByChoice.flat().reduce((acc, curr) => acc + curr, 0);
      const calculatedScoreByChoice = squareTotalScoreByChoice.map((choiceStrategies) =>
        choiceStrategies.map((score) => {
          const percentage = (score / totalScores) * 100;
          return parseFloat(((totalVp / 100) * percentage).toFixed(3));
        }),
      );

      return calculatedScoreByChoice;
    },
    getScoresTotal() {
      return totalVp;
    },
  };
}

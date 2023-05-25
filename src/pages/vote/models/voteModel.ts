import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { createClient, ProposalState, VoteMethod } from 'hedsvote';
import { Song } from '@/models/common';
import { getManyUsersByWalletId } from '@/api/user';

interface VoteState {
  ipfs_hash: string;
  space_id: number;
  signature: string;
  author: string;
  start_time: string;
  end_time: string;
  block: number;
  state: ProposalState;
  method: VoteMethod;
  title: string;
  description: string;
  scores: number[];
  created_at: string;
  choices: Choice[];
  votes: Vote[];
}

interface Choice {
  id: number;
  proposal_id: string;
  image: string;
  wallet_id: string;
  artist: string;
  name: string;
  location: string;
  media: string;
}

export interface Vote {
  id: number;
  proposal_id: string;
  signature: string;
  created: string;
  vp: number;
  voter: string;
  vote_choices: VoteChoice[];
}

interface VoteChoice {
  vote_id: number;
  choice_id: number;
  proposal_id: string;
  amount: number;
}

export interface ChoiceWithScore extends Choice {
  score: number;
}

interface UserResultsInfo {
  display_name: string;
  profile_picture: string;
  wallet: string;
}

export const voteModel = createModel<RootModel>()({
  state: { vote: {} as VoteState, calculatedScores: [] as ChoiceWithScore[], userResultsInfo: {} as { [key: string]: UserResultsInfo }, isLoading: false },
  reducers: {
    setProposal(state, vote) {
      return { ...state, vote };
    },
    setUserResultsInfo(state, users) {
      const userResultsData = {} as { [key: string]: UserResultsInfo };
      users.forEach((user: UserResultsInfo) => {
        userResultsData[user.wallet] = { display_name: user.display_name, profile_picture: user.profile_picture, wallet: user.wallet };
      });
      return { ...state, userResultsInfo: userResultsData };
    },
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
  },
  selectors: (slice, createSelector, hasProps) => ({
    selectCurrentVote: () => slice((state) => state.vote),
    selectChoices: () => slice((state) => state.vote.choices),
    selectScores: () => slice((state) => state.vote.scores),
    selectVotes: () => slice((state) => state.vote.votes),
    selectUserResultsInfo: () => slice((state) => state.userResultsInfo),
    selectIsLoading: () => slice((state) => state.isLoading),
    selectSortedChoicesByResults: hasProps(function (models, { choices, scores, tracks }) {
      return slice((voteModel) => {
        if (!voteModel || !scores) return [];
        const topVotedScores = [...scores].sort((a, b) => b - a).slice(0, 20);
        const totalScore = scores.reduce((acc: number, score: number) => acc + score, 0);
        const sortedChoicesByResults: ChoiceWithScore[][] = choices.reduce(
          (acc: ChoiceWithScore[][], choice: ChoiceWithScore) => {
            const scorePercentage = (scores[choice.id - 1] / totalScore) * 100;
            const roundedPercentage = Math.round((scorePercentage + Number.EPSILON) * 1000) / 1000;
            const tracksWalletIds = tracks.map((track: Song) => track.artist_wallet);
            if (tracksWalletIds.includes(choice.wallet_id)) {
              choice.score = roundedPercentage;
              acc[0].push(choice);
              return acc;
            } else if (topVotedScores.includes(scores[choice.id - 1])) {
              choice.score = roundedPercentage;
              acc[1].push(choice);
              return acc;
            } else {
              choice.score = roundedPercentage;
              acc[2].push(choice);
              return acc;
            }
          },
          [[], [], []],
        );
        for (const array of sortedChoicesByResults) {
          array.sort((a: ChoiceWithScore, b: ChoiceWithScore) => b.score - a.score);
        }
        return sortedChoicesByResults;
      });
    }),
  }),
  effects: () => ({
    async getProposalById(proposalId: string) {
      try {
        this.setIsLoading(true);
        const { getProposal } = createClient();
        const response = await getProposal(proposalId);
        this.setProposal(response.data);
        this.setIsLoading(false);
      } catch (e) {
        console.error(e);
        this.setIsLoading(false);
      }
    },
    async getManyUsers(wallets: string[]) {
      const response = await getManyUsersByWalletId(wallets);
      this.setUserResultsInfo(response.data);
    },
  }),
});

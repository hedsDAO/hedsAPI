import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { createClient, ProposalState, VoteMethod, Strategy, Vote } from 'hedsvote';
import { Song } from '@/models/common';
import { getManyUsersByWalletId } from '@/api/user';
import { Signer } from 'ethers';

export interface VoteState {
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
  strategies: Strategy[];
}

export interface Choice {
  id: number;
  proposal_id: string;
  image: string;
  wallet_id: string;
  artist: string;
  name: string;
  location: string;
  media: string;
}

// export interface Vote {
//   id: number;
//   proposalId: string;
//   signature: string;
//   created: string;
//   vp: number;
//   voter: string;
//   voteChoices: VoteChoice[];
// }

// interface VoteChoice {
//   voteId: number;
//   choiceId: number;
//   proposalId: string;
//   amount: number;
// }

export interface ChoiceWithScore extends Choice {
  score?: number;
}

interface UserResultsInfo {
  display_name: string;
  profile_picture: string;
  wallet: string;
}

export const voteModel = createModel<RootModel>()({
  state: {
    vote: {} as VoteState,
    calculatedScores: [] as ChoiceWithScore[],
    userResultsInfo: {} as { [key: string]: UserResultsInfo },
    isLoading: false,
    likesByChoiceId: {} as { [key: string]: number },
    vp: 0,
  },
  reducers: {
    setProposal: (state, vote) => ({ ...state, vote }),
    setUserResultsInfo: (state, users) => {
      const userResultsData = {} as { [key: string]: UserResultsInfo };
      users.forEach((user: UserResultsInfo) => {
        userResultsData[user.wallet] = { display_name: user.display_name, profile_picture: user.profile_picture, wallet: user.wallet };
      });
      return { ...state, userResultsInfo: userResultsData };
    },
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setCurrentTrack: (state, currentTrack: Choice) => ({ ...state, currentTrack }),
    increaseChoiceWeightFromLikes: (state, choice: Choice) => ({
      ...state,
      likesByChoiceId: { ...state.likesByChoiceId, [choice.id]: ++state.likesByChoiceId[choice.id] },
    }),
    decreaseChoiceWeightFromLikes: (state, choice: Choice) => ({
      ...state,
      likesByChoiceId: { ...state.likesByChoiceId, [choice.id]: state.likesByChoiceId[choice.id] > 1 ? --state.likesByChoiceId[choice.id] : 1 },
    }),
    addChoiceToLikes: (state, choice: Choice) => ({ ...state, likesByChoiceId: { ...state.likesByChoiceId, [choice.id]: 1 } }),
    deleteChoiceFromLikes: (state, choice: Choice) => {
      const likesByChoiceId = { ...state.likesByChoiceId };
      delete likesByChoiceId[choice.id];
      return { ...state, likesByChoiceId };
    },
    setUserLikesById: (state, likesByChoiceId) => ({ ...state, likesByChoiceId }),
    setVp: (state, vp: number) => ({ ...state, vp }),
  },
  selectors: (slice, createSelector, hasProps) => ({
    selectCurrentVote: () => slice((state) => state.vote),
    selectChoices: () => slice((state) => state.vote.choices),
    selectScores: () => slice((state) => state.vote.scores),
    selectVotes: () => slice((state) => state.vote.votes),
    selectUserResultsInfo: () => slice((state) => state.userResultsInfo),
    selectIsLoading: () => slice((state) => state.isLoading),
    selectUserLikes: () => slice((state) => state.likesByChoiceId),
    selectUserVotingPower: () => slice((state) => state?.vp || 0),
    selectSortedChoicesByResults: hasProps(function (models, { choices, scores, tracks }) {
      return slice((voteModel) => {
        if (!voteModel || !scores) return [];
        const topVotedScores = [...scores].sort((a, b) => b - a).slice(0, 20);
        const totalScore = scores.reduce((acc: number, score: number) => acc + score, 0);
        const sortedChoicesByResults: ChoiceWithScore[][] = choices.reduce(
          (acc: ChoiceWithScore[][], choice: ChoiceWithScore) => {
            const scorePercentage = (scores[choice.id - 1] / totalScore) * 100;
            const roundedPercentage = Math.round((scorePercentage + Number.EPSILON) * 1000) / 1000;
            const tracksWalletIds = tracks.map((track: Song) => track.artists.map((artist) => artist.artist_wallet)).flat();
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
    selectHasUserVoted: hasProps(function (models, connectedUser) {
      return slice((state) => {
        if (!state.vote.votes || !connectedUser) return false;
        if (state.vote.votes) {
          return state.vote.votes.some((vote) => vote.voter === connectedUser.toLowerCase());
        } else {
          return false;
        }
      });
    }),
  }),
  effects: () => ({
    async getProposalById(proposalId: string) {
      try {
        this.setIsLoading(true);
        const { getProposal } = createClient();
        const response = await getProposal(proposalId);
        console.log('response', response.data);
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
    async castVote({ vote, signer }: { vote: Vote; signer: Signer }) {
      const { castVote } = createClient();
      try {
        await castVote(signer, vote);
        this.getProposalById(vote.proposalId);
        return;
      } catch (error) {
        console.log(error);
      }
    },
  }),
});

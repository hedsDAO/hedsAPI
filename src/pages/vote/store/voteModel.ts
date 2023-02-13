import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { Choice, createClient, Proposal, ProposalState, quadratic, QuadraticVote, SingleChoiceVote, UpdatedVoteObject, VoteMethod, VoteObject } from 'hedsvote';
import { User } from '@/models/common';
import axios from 'axios';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/App';

export interface SubmissionChoice extends Choice {
  score?: number;
}

export interface VoteChoice extends Choice {
  votes?: number;
}

export function formatVoteToFb(vote: VoteObject | UpdatedVoteObject, choices: Choice[]) {
  const choicesIndexes = Object.keys(vote.vote.choice);
  const formattedVote: any = vote;
   choicesIndexes.map ( (choiceIndex) => {
    console.log(choiceIndex)
    const choice = choices.find(choice => choice.id + 1 === parseInt(choiceIndex));
    const weight =  vote.vote.choice[choiceIndex];
    console.log(weight)
    formattedVote.vote.choice[choiceIndex] = { choice, weight};
    return formattedVote.vote;
  })
  return formattedVote;
}

export interface VoteModelState {
  scores?: number[];
  choices: Choice[];
  likesbyChoiceId?: { [key: string]: number };
  proposal: Proposal;
  //! RE-UPLOAD VOTES AS QUADRATIC VOTES IN FB
  quadraticVotes?: QuadraticVote[];
  singleChoiceVotes?: SingleChoiceVote[];
  vp: number;
  allProposals: Proposal[];
  currentTrack: Choice;
  isLoading: boolean;
  selectedSubmissions: SubmissionChoice[];
  resultsUserData?: { [key: string]: User };
}

export const voteModel = createModel<RootModel>()({
  state: {
    choices: [],
    proposal: {},
    allProposals: [],
    isLoading: false,
  } as VoteModelState,
  selectors: (slice, createSelector, hasProps) => ({
    selectProposalState() {
      return slice((voteModel) => voteModel?.proposal?.state);
    },
    selectResultsUserData() {
      return slice((voteModel) => voteModel?.resultsUserData);
    },
    selectIsLoading() {
      return slice((voteModel) => voteModel?.isLoading);
    },
    selectProposal() {
      return slice((voteModel) => voteModel?.proposal);
    },
    selectAllProposals() {
      return slice((voteModel) => voteModel?.allProposals);
    },
    selectCurrentTrack() {
      return slice((voteModel) => voteModel?.currentTrack);
    },
    selectScores() {
      return slice((voteModel) => voteModel?.scores);
    },
    selectScoresByPercentage() {
      return createSelector(this.selectScores, (scores: number[]) => {
        if (!scores) return null;
        const total = scores.reduce((acc, score) => acc + score, 0);
        return scores.map((score) => (score / total) * 100);
      });
    },
    selectProposalChoices() {
      return slice((voteModel) => {
        const choices = voteModel?.choices || [];
        return choices ? choices.sort((a, b) => a.id - b.id) : [];
      });
    },
    selectSortedChoicesByResults: hasProps(function (models, { choices, scores, tapeTrackIds }) {
      return slice((voteModel) => {
        if (!voteModel || !scores) return [];
        const topVotedScores = [...scores].sort((a, b) => b - a).slice(0, 20);
        const totalScore = scores.reduce((acc: number, score: number) => acc + score, 0);
        const sortedChoicesByResults: SubmissionChoice[][] = choices.reduce(
          (acc: SubmissionChoice[][], choice: SubmissionChoice) => {
            const scorePercentage = (scores[choice.id] / totalScore) * 100;
            const roundedPercentage = Math.round((scorePercentage + Number.EPSILON) * 1000) / 1000;
            if (tapeTrackIds.includes(choice.walletId)) {
              choice.score = roundedPercentage;
              acc[0].push(choice);
              return acc;
            } else if (topVotedScores.includes(scores[choice.id])) {
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
          array.sort((a: SubmissionChoice, b: SubmissionChoice) => b.score - a.score);
        }

        return sortedChoicesByResults;
      });
    }),
    selectQuadraticVotes() {
      return slice((voteModel) => voteModel?.quadraticVotes || null);
    },
    selectQuadraticVoteScores() {
      return createSelector(
        this.selectProposal,
        this.selectQuadraticVotes,
        this.selectScores,
        (proposal: Proposal, votes: QuadraticVote[], scores: number[]) => {
          if (scores) return scores;
          if (votes) {
            const { choices } = proposal;
            const strategies = Object.values(proposal.strategies);
            const { getScores } = quadratic({ choices, votes, strategies });
            return getScores();
          } else {
            return null;
          }
        },
      );
    },
    selectUserVotingPower() {
      return slice((voteModel) => voteModel?.vp || 0);
      },
    selectUserLikes() {
      return slice((voteModel) => voteModel?.likesbyChoiceId || {});
    },
    selectVoteObject() {
      return createSelector(this.selectUserLikes, (userChoices) => {
        if (!userChoices) return {};
        const formattedChoicesTank: { [key: string]: number } = {};
        for (let key in userChoices) {
          const newKey = `${+key + 1}`;
          formattedChoicesTank[newKey] = userChoices[key];
        }
        return formattedChoicesTank;
      });
    },
    selectHasUserVoted: hasProps(function (models,  connectedUser) {
      return slice((voteModel) => {
        if (!voteModel || !connectedUser) return false;
        if (voteModel.quadraticVotes) {
          return voteModel.quadraticVotes.some((vote) => vote.voter === connectedUser.toLowerCase());
        } else if (voteModel.singleChoiceVotes) {
          return voteModel.singleChoiceVotes.some((vote) => vote.voter === connectedUser.toLowerCase());
        } else {
          return false;
        }
      });
    }),
  }),
  reducers: {
    addChoiceToLikes: (state, choice: Choice) => ({ ...state, likesbyChoiceId: { ...state.likesbyChoiceId, [choice.id]: 1 } }),
    increaseChoiceWeightFromLikes: (state, choice: Choice) => ({
      ...state,
      likesbyChoiceId: { ...state.likesbyChoiceId, [choice.id]: ++state.likesbyChoiceId[choice.id] },
    }),
    decreaseChoiceWeightFromLikes: (state, choice: Choice) => ({
      ...state,
      likesbyChoiceId: { ...state.likesbyChoiceId, [choice.id]: state.likesbyChoiceId[choice.id] > 1 ? --state.likesbyChoiceId[choice.id] : 1 },
    }),
    deleteChoiceFromLikes: (state, choice: Choice) => {
      const likesbyChoiceId = { ...state.likesbyChoiceId };
      delete likesbyChoiceId[choice.id];
      return { ...state, likesbyChoiceId };
    },
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setCurrentTrack: (state, currentTrack: Choice) => ({ ...state, currentTrack }),
    setProposal: (state, proposal: Proposal) => ({ ...state, proposal }),
    setChoices: (state, choices: Choice[]) => ({ ...state, choices }),
    setScores: (state, scores: number[]) => ({ ...state, scores }),
    setVp: (state, vp: number) => ({ ...state, vp }),
    setQuadraticVotes: (state, quadraticVotes: QuadraticVote[]) => ({ ...state, quadraticVotes }),
    setSingleChoiceVotes: (state, singleChoiceVotes: SingleChoiceVote[]) => ({ ...state, singleChoiceVotes }),
    setAllProposals: (state, allProposals: Proposal[]) => ({ ...state, allProposals }),
    setSelectedSubmissions: (state, selectedSubmission: SubmissionChoice) => ({ ...state, selectedSubmission }),
    setResultsUserData: (state, resultsUserData) => ({ ...state, resultsUserData }),
  },
  effects: () => ({
    async castVote(vote: VoteObject) {
      const { castVote } = createClient();
      try {
          await castVote(vote);
          this.getProposal(vote.proposalId);
      } catch (error) {
        console.log(error);
      }
    },
    async updateVote(vote: UpdatedVoteObject) {
      const { updateVote } = createClient();
      try {
        await updateVote(vote);
        this.getProposal(vote.proposalId);
      } catch (error) {
        console.log(error);
      }

    },
    async createProposal(proposal: Proposal) {
      const { createProposal } = createClient();
      try {
        const proposalCreated = await (await createProposal('proposals', proposal)).data;
        const { choices } = proposalCreated;
        this.setProposal(proposalCreated);
        this.setChoices(choices);
        console.log(proposalCreated);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProposal(proposalAddress: string) {
      const { deleteProposal } = createClient();
      try {
        await (
          await deleteProposal('proposals', proposalAddress)
        ).status;
      } catch (error) {
        console.log(error);
      }
    },
    async getProposal(proposalAddress: string) {
      const { getProposal } = createClient();
      if (proposalAddress?.length) {
        try {
          const proposal = await (await getProposal('proposals', proposalAddress)).data;
          const { choices, method, votes } = proposal;
          this.setProposal(proposal);
          this.setChoices(choices);
          if (proposal.scores) this.setScores(proposal.scores);
          const currentTrack: Choice = proposal?.choices?.[0];
          if (currentTrack) this.setCurrentTrack(currentTrack);
          if (method === VoteMethod.QUADRATIC && votes) {
            const quadraticVotes = Array.from(votes as QuadraticVote[]);
            this.setQuadraticVotes(quadraticVotes);
          } else if (method === VoteMethod.SINGLE_CHOICE && votes) {
            const singleChoiceVotes = Array.from(votes as SingleChoiceVote[]);
            this.setSingleChoiceVotes(singleChoiceVotes);
          }
          // get user data for vote results
          if (proposal.state === ProposalState.CLOSED) {
            const users = proposal.votes.map((vote) => vote.voter.toLowerCase());
            const url = `https://us-central1-heds-104d8.cloudfunctions.net/users/getManyUsers`;
            axios.post(url, { users: users }).then((res) => {
              const { data } = res;
              this.setResultsUserData(data);
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getAllProposals() {
      const { getAllProposals } = createClient();
      try {
        const allProposals = await (await getAllProposals('proposals')).data;
        this.setAllProposals(allProposals);
      } catch (error) {
        console.log(error);
      }
    },
  }),
});

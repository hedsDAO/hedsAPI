// @ts-nocheck
import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { calculateUserVotingPower, Choice, createClient, Proposal, quadratic, QuadraticVote, SingleChoiceVote, VoteMethod, VoteObject } from 'hedsvote';

export interface VoteModelState {
  choices: Choice[];
  proposal: Proposal;
  //! RE-UPLOAD VOTES AS QUADRATIC VOTES IN FB
  quadraticVotes?: QuadraticVote[];
  singleChoiceVotes?: SingleChoiceVote[];
  vp: number;
  allProposals: Proposal[];
  currentTrack: Choice;
  isLoading: boolean;
}

export const voteModel = createModel<RootModel>()({
  state: {
    choices: [],
    proposal: {},
    allProposals: [],
    isLoading: false,
  } as VoteModelState,
  selectors: (slice, createSelector, hasProps) => ({
    selectIsLoading() {
      return slice((voteModel) => voteModel?.isLoading);
    },
    selectProposal() {
      return slice((voteModel) => voteModel?.proposal);
    },
    selectCurrentTrack() {
      return slice((voteModel) => voteModel?.currentTrack);
    },
    selectProposalChoices() {
      return slice((voteModel) => voteModel?.choices || []);
    },
    selectQuadraticVotes() {
      return slice((voteModel) => voteModel?.quadraticVotes || null);
    },
    selectQuadraticVoteScores() {
      return createSelector(this.selectProposal, this.selectQuadraticVotes, (proposal: Proposal, votes: QuadraticVote[]) => {
        if (votes) {
          const { choices } = proposal;
          const strategies = Object.values(proposal.strategies);
          const { getScores } = quadratic({ choices, votes, strategies });
          return getScores();
        } else {
          return null;
        }
      });
    },
    selectUserVotingPower() {
      return createSelector(this.selectProposal, (proposal: Proposal) => {
        if (!proposal.strategies) return 0;
        const { strategies } = proposal;
        console.log(strategies);
        return calculateUserVotingPower('0x6402fE3Af805FcEe00E9b4b635e689Dc0d1FFFbF'.toLowerCase(), strategies);
      });
    },
  }),
  reducers: {
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setCurrentTrack: (state, currentTrack: Choice) => ({ ...state, currentTrack }),
    setProposal: (state, proposal: Proposal) => ({ ...state, proposal }),
    setChoices: (state, choices: Choice[]) => ({ ...state, choices }),
    setQuadraticVotes: (state, quadraticVotes: QuadraticVote[]) => ({ ...state, quadraticVotes }),
    setSingleChoiceVotes: (state, singleChoiceVotes: SingleChoiceVote[]) => ({ ...state, singleChoiceVotes }),
    setAllProposals: (state, allProposals: Proposal[]) => ({ ...state, allProposals }),
  },
  effects: () => ({
    async castVote(vote: VoteObject) {
      const { castVote } = createClient();
      try {
        await (
          await castVote(vote)
        ).data;
      } catch (error) {
        console.log(error);
      }
    },
    async createProposal(proposal: Proposal) {
      const { createProposal } = createClient();
      try {
        const proposalCreated = await (await createProposal('proposals', proposal)).data;
        const { choices, method, votes } = proposalCreated;
        this.setProposal(proposalCreated);
        this.setChoices(choices);
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
          const currentTrack: Choice = proposal?.choices?.[0];
          if (currentTrack) this.setCurrentTrack(currentTrack);
          if (method === VoteMethod.QUADRATIC && votes) {
            const quadraticVotes = Array.from(votes as QuadraticVote[]);
            this.setQuadraticVotes(quadraticVotes);
          } else if (method === VoteMethod.SINGLE_CHOICE && votes) {
            const singleChoiceVotes = Array.from(votes as SingleChoiceVote[]);
            this.setSingleChoiceVotes(singleChoiceVotes);
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
        console.log('all proposals', allProposals);
        this.setAllProposals(allProposals);
      } catch (error) {
        console.log(error);
      }
    },
  }),
});

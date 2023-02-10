import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { calculateUserVotingPower, Choice, createClient, Proposal, quadratic, QuadraticVote, SingleChoiceVote, VoteMethod, VoteObject } from 'hedsvote';

export interface SubmissionChoice extends Choice {
  score: number;
}

export interface VoteChoice extends Choice {
  votes: number;
}

export interface VoteModelState {
  scores?: number[];
  choices: Choice[];
  proposal: Proposal;
  //! RE-UPLOAD VOTES AS QUADRATIC VOTES IN FB
  quadraticVotes?: QuadraticVote[];
  singleChoiceVotes?: SingleChoiceVote[];
  vp: number;
  allProposals: Proposal[];
  currentTrack: Choice;
  isLoading: boolean;
  selectedSubmissions: SubmissionChoice[];
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
        const sortedChoicesByResults = choices.reduce(
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

        sortedChoicesByResults[0].sort((a: SubmissionChoice, b: SubmissionChoice) => b.score - a.score);
        sortedChoicesByResults[1].sort((a: SubmissionChoice, b: SubmissionChoice) => b.score - a.score);
        sortedChoicesByResults[2].sort((a: SubmissionChoice, b: SubmissionChoice) => b.score - a.score);

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
      return createSelector(this.selectProposal, (proposal: Proposal) => {
        if (!proposal.strategies) return 0;
        const { strategies } = proposal;
        // return calculateUserVotingPower('0x6402fE3Af805FcEe00E9b4b635e689Dc0d1FFFbF'.toLowerCase(), strategies);
      });
    },
  }),
  reducers: {
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setCurrentTrack: (state, currentTrack: Choice) => ({ ...state, currentTrack }),
    setProposal: (state, proposal: Proposal) => ({ ...state, proposal }),
    setChoices: (state, choices: Choice[]) => ({ ...state, choices }),
    setScores: (state, scores: number[]) => ({ ...state, scores }),
    setQuadraticVotes: (state, quadraticVotes: QuadraticVote[]) => ({ ...state, quadraticVotes }),
    setSingleChoiceVotes: (state, singleChoiceVotes: SingleChoiceVote[]) => ({ ...state, singleChoiceVotes }),
    setAllProposals: (state, allProposals: Proposal[]) => ({ ...state, allProposals }),
    setSelectedSubmissions: (state, selectedSubmission: SubmissionChoice) => ({ ...state, selectedSubmission }),
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
          const proposal = await (await getProposal('heds', proposalAddress)).data;
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

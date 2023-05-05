import { createModel } from '@rematch/core';
import { getTapeById, getSongsByTapeId } from '@/api/tape';
import type { RootModel } from '@/models';

export const tapeModel = createModel<RootModel>()({
  state: {
    tape: {
      id: undefined,
      contract: '',
      name: '',
      merkleRoot: '',
      description: '',
      image: '',
      proposalId: '',
      video: '',
      bpm: undefined,
      tracks: [],
      timeline: undefined,
      type: undefined,
      splits: '',
      market: undefined,
      links: undefined,
    },
  },
  reducers: {
    setTape: (state, tape, songs) => {
      const newTape = { ...tape, merkleRoot: tape.merkle_root, proposalId: tape.proposal_id, tracks: songs };
      delete newTape.merkle_root;
      delete newTape.proposal_id;
      return { ...state, tape: newTape };
    },
  },
  selectors: (slice) => ({
    selectCurrentTape: () => slice((state) => state.tape),
  }),
  effects: (dispatch) => ({
    async getTape(id: string) {
      const tape = await getTapeById(id);
      const songs = await getSongsByTapeId(id);
      this.setTape(tape.data, songs.data);
    },
  }),
});

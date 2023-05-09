import { createModel } from '@rematch/core';
import { getTapeById } from '@/api/tape';
import type { RootModel } from '@/models';
import { Tape } from '@models/common';

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
      timeline: {
        mint: { start: 0, end: 0 },
        submit: { start: 0, end: 0 },
        vote: { start: 0, end: 0 },
      },
      type: undefined,
      splits: '',
      links: undefined,
      sampleArtists: [],
    } as Tape,
  },
  reducers: {
    setTape: (state, tape) => {
      const { id, contract, name, merkle_root, description, image, proposal_id, video, bpm, timeline, type, splits, links, sample_artists, songs } = tape;
      const newTape = {
        id,
        contract,
        name,
        merkleRoot: merkle_root,
        description,
        image,
        proposalId: proposal_id,
        video,
        bpm,
        timeline,
        type,
        splits,
        links,
        sampleArtists: sample_artists,
        tracks: songs,
      };
      return { ...state, tape: newTape };
    },
  },
  selectors: (slice) => ({
    selectCurrentTape: () => slice((state) => state.tape),
  }),
  effects: (dispatch) => ({
    async getTape(id: string) {
      // const tape = await getTapeById(id);
      // console.log('tape', tape);
      const response = await getTapeById(id);
      this.setTape(response.data);
    },
  }),
});

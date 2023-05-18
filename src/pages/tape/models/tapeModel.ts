import { createModel } from '@rematch/core';
import { getTapeById } from '@/api/tape';
import type { RootModel } from '@/models';
import { Tape } from '@models/common';
import { DateTime } from 'luxon';

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
    isLoading: false,
    cycle: '',
  },
  reducers: {
    setTape: (state, tape) => {
      const { id, contract, name, merkle_root, description, image, proposal_id, video, bpm, timeline, type, splits, links, sample_artists, songs } = tape;
      const { mint, submit, vote } = timeline;

      const checkTimeline = () => {
        const now = DateTime.now().toMillis();
        if (now >= submit.start && now < submit.end) {
          return 'submit';
        } else if (now >= vote.start && now < vote.end) {
          return 'vote';
        } else if (now >= mint.start && now < mint.end) {
          return 'mint';
        } else {
          return 'end';
        }
      };

      const currentCycle = checkTimeline();

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
      return { ...state, cycle: currentCycle, tape: newTape };
    },
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
  },
  selectors: (slice) => ({
    selectCurrentTape: () => slice((state) => state.tape),
    selectTapeCover: () => slice((state) => state.tape.image),
    selectTimeline: () => slice((state) => state.tape.timeline),
    selectTracks: () => slice((state) => state.tape.tracks),
    selectSampleArtists: () => slice((state) => state.tape.sampleArtists),
    selectCurrentTapeContract: () => slice((state) => state.tape.contract),
    selectIsLoading: () => slice((state) => state.isLoading),
    selectCurrentCycle: () => slice((state) => state.cycle),
  }),
  effects: (dispatch) => ({
    async getTape(id: string) {
      this.setIsLoading(true);
      const response = await getTapeById(id);
      this.setTape(response.data);
      console.log(response.data);
      this.setIsLoading(false);
    },
  }),
});

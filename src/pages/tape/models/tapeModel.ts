import { createModel } from '@rematch/core';
import { getTapeById } from '@/api/tape';
import type { RootModel } from '@/models';
import { Tape, Song } from '@models/common';
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
      sample: undefined,
      songs: [],
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
        if (submit !== undefined && now >= submit.start && now < submit.end) {
          return 'submit';
        } else if (vote !== undefined && now >= vote.start && now < vote.end) {
          return 'vote';
        } else if (mint !== undefined && now >= mint.start && now < mint.end) {
          return 'mint';
        } else {
          return 'end';
        }
      };

      const tracks = songs.filter((song: Song) => song.type === 'track' || song.type === 'collab');
      const sample = songs.find((song: Song) => song.type === 'sample');
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
        tracks,
        sample,
        songs,
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
    selectSongs: () => slice((state) => state.tape.songs),
    selectSampleArtists: () => slice((state) => state.tape.sampleArtists),
    selectCurrentTapeContract: () => slice((state) => state.tape.contract),
    selectIsLoading: () => slice((state) => state.isLoading),
    selectCurrentCycle: () => slice((state) => state.cycle),
    selectTapeProposalId: () => slice((state) => state.tape.proposalId),
    selectCurrentTapeSample: () => slice((state) => state.tape.sample),
    selectTapeVideo: () => slice((state) => state.tape.video),
  }),
  effects: (dispatch) => ({
    async getTape(id: string) {
      this.setIsLoading(true);
      const response = await getTapeById(id);
      this.setTape(response.data);
      this.setIsLoading(false);
    },
  }),
});

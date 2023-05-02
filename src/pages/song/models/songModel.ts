import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import { getSongByHash } from '@api/song';
import { Song } from '@/models/common';
import { getCyaniteData } from '@/utils';

interface SongState {
  song?: Song;
  cyanite_data?: any;
}

export const songModel = createModel<RootModel>()({
  state: {
    song: {},
    cyanite_data: {},
  } as SongState,
  reducers: {
    setSong: (state, payload: Song) => ({ ...state, song: payload }),
    setCyaniteData: (state, payload: any) => ({ ...state, cyanite_data: payload }),
  },
  selectors: (slice, createSelector, hasProps) => ({
    selectSong: () => slice((state: SongState) => state.song),
    selectCyaniteData: () => slice((state: SongState) => state.cyanite_data),
  }),
  effects: () => ({
    async getSongData(hash: string) {
      const response = await getSongByHash(hash);
      this.setSong(response?.data);
      if (response?.data?.cyanite_id) {
        const cyaniteResponse = await getCyaniteData(parseInt(response?.data?.cyanite_id));
        this.setCyaniteData(cyaniteResponse.result);
      }
    },
  }),
});

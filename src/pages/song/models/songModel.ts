import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import { getSongByHash } from '@api/song';

export const songModel = createModel<RootModel>()({
  state: {} as any,
  reducers: {
    setSong: (state, payload: any) => ({ state, ...payload }),
  },
  effects: () => ({
    async getSongData(hash: string) {
      const response = await getSongByHash(hash);
      console.log(response);
    },
  }),
});

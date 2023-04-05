import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import axios from 'axios';

export const songModel = createModel<RootModel>()({
  state: {} as any,
  reducers: {
    setSong: (state, payload: any) => ({ state, ...payload }),
  },
  effects: () => ({
    async getSongData(audio: string) {
      const response = await axios.get(`http://localhost:5001/heds-104d8/us-central1/api/songs/${audio}`);
      console.log(response);
    }
  }),
});



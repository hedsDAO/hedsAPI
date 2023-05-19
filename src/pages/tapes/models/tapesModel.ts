import { getAllTapes } from '@/api/tape';
import type { RootModel } from '@/models';
import { Tape } from '@/models/common';
import { createModel } from '@rematch/core';

export const tapesModel = createModel<RootModel>()({
  state: {} as Tape[],
  reducers: {
    setState: (state, newState) => ({ ...state, ...newState }),
    setTapes: (state, payload) => [...payload],
    clearState: () => ({} as Tape[]),
  },
  selectors: (slice) => ({
    selectAllTapes: () => slice((state) => state),
  }),
  effects: () => ({
    async getTapes() {
      try {
        const response = await getAllTapes();
        const sorted = response.data.sort((a: Tape, b: Tape) => b.id - a.id);
        this.setTapes(sorted);
      } catch (error: any) {
        console.log(error);
      }
    },
  }),
});

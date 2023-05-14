import type { RootModel } from '@/models';
import { Tape } from '@/models/common';
import { createModel } from '@rematch/core';

export const tapesModel = createModel<RootModel>()({
  state: {} as Tape[],
  reducers: {
    setState: (state, newState) => ({ ...state, ...newState }),
    setTapes: (state, payload: Tape[]) => [...payload],
    clearState: () => ({} as Tape[]),
  },
  selectors: (slice) => ({
    selectAllTapes: () => slice((state) => state),
  }),
  effects: () => ({
    async getTapes() {
      // add get call to get all hedstapes/collabtapes, sort them by id and set them in state
      // const hedsTapes = allTapes.filter((tape: Tape) => tape.type === 'hedstape' || tape.type === 'legacy').sort((a, b) => b.id - a.id);
      // const collabTapes = allTapes.filter((tape: Tape) => tape.type === 'collabtape').sort((a, b) => b.id - a.id);
      // const tapes = [...hedsTapes, ...collabTapes];
      // this.setTapes(tapes);
    },
  }),
});

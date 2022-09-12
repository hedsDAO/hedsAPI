import { createModel } from '@rematch/core';
import { collection, getDocs } from 'firebase/firestore';
import { TapeData } from './common';
import { db } from '../../src/App';
import type { RootModel } from '.';

interface AllTapes {
  [tapeName: string]: {
    [tapeId: string]: TapeData;
  };
}

export interface TapeState {
  allTapes: AllTapes;
  tapeTypes: Array<string>;
}

export const tapesModel = createModel<RootModel>()({
  state: {} as TapeState,
  reducers: {
    setAllTapes: (state, allTapes) => ({ ...state, allTapes }),
    setTapeTypes: (state, tapeTypes) => ({ ...state, tapeTypes }),
  },
  effects: () => ({
    async getAllTapes() {
      const docRef = collection(db, 'tapes');
      const docSnap = await getDocs(docRef);
      const allTapes: AllTapes = {};
      const tapeTypes: Array<string> = [];
      if (!docSnap.empty) {
        docSnap.forEach((tape) => {
          tapeTypes.push(tape.id);
          allTapes[tape.id] = tape.data();
        });
      }
      tapeTypes.reverse();
      this.setTapeTypes(tapeTypes);
      this.setAllTapes(allTapes);
      return;
    },
  }),
});

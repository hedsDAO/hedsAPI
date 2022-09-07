import { createModel } from '@rematch/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { BadgeData, TapeData } from './common';
import { populateNewUser } from '../../src/utils/populateNewUser';
import { db } from '../../src/App';
import type { RootModel } from '.';

export interface TapeState {
  [tape: string]: TapeData;
}

export const tapesModel = createModel<RootModel>()({
  state: {} as TapeState,
  reducers: {
    setSpacesData: (state, payload) => ({ ...state, ...payload }),
  },
  effects: () => ({
    async getSpacesData(tape: string) {
      const docRef = doc(db, 'spaces', 'heds');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.setSpacesData(docSnap.data()[tape]);
      }
    },
  }),
});

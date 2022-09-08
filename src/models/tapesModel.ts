import { createModel } from '@rematch/core';
import { collection, collectionGroup, doc, getDoc, getDocs, query } from 'firebase/firestore';
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
      const docRef = collection(doc(db, 'spaces', 'heds'), tape);
      const docSnap = await getDocs(docRef);
      if (docSnap.docs) {
        docSnap.forEach((e) => {
          this.setSpacesData({[e.id] : e.data()})
        });
      }
    },
  }),
});

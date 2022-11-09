import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { emptyUserState } from './utils';
import { db } from '@/App';
import { RootState } from '@/store';
import { AllTapes, UserRoles, User, HedsTapes } from '@/models/common';
import { formatUserCollection } from '@/utils';
import { Result } from 'ethers/lib/utils';

export const userModel = createModel<RootModel>()({
  state: {} as User,
  reducers: {
    setUserData: (state, payload) => ({ ...state, ...payload }),
    clearUserState: (state) => emptyUserState(state),
  },
  effects: () => ({
    async getUserData(wallet: string) {
      const docRef = doc(db, 'users', wallet.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.setUserData(docSnap.data());
      }
    },
    async updateUserCollection([wallet, data, hedsTapes]: [string, Result[], HedsTapes]) {
      const collection = formatUserCollection(data, hedsTapes);
      const docSnap = await getDoc(doc(db, 'users', wallet));
      const userData = docSnap.exists() ? docSnap.data() : null;
      const { role } = userData;
      if (role >= UserRoles.USER) await setDoc(doc(db, 'users', wallet), { ...userData, collection });
      if (role >= UserRoles.ARTIST) await setDoc(doc(db, 'artists', wallet), { ...userData, collection });
      if (role >= UserRoles.CURATOR) await setDoc(doc(db, 'curators', wallet), { ...userData, collection });
      this.setUserData({ ...userData, collection });
    },
  }),
  selectors: (slice, createSelector) => ({
    getTapeCovers() {
      return createSelector(
        slice,
        (a: RootState, tapeData: AllTapes) => (a ? tapeData : null),
        (userData, tapeData) => {
          const userTracks = userData?.tracks?.heds?.hedstape;
          if (userTracks && tapeData) {
            return Object.keys(userTracks).reduce((acc, curr) => ({ ...acc, [curr]: tapeData[curr] }), {});
          }
        },
      );
    },
  }),
});

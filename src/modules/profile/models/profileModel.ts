import { createModel } from '@rematch/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { RootModel } from '../../../models';
import { AllTapes, User } from '../../../models/common';
import { populateNewUser } from '@/utils';
import { db } from '../../../App';
import { RootState } from '@/store';

export const profileModel = createModel<RootModel>()({
  state: {} as User,
  reducers: {
    setProfileData: (state, payload: User) => ({ ...state, ...payload }),
  },
  effects: () => ({
    async getProfileData(wallet: string) {
      const docRef = doc(db, 'users', wallet.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.setProfileData(docSnap.data());
      } else {
        const newProfileData = populateNewUser(wallet);
        await setDoc(docRef, newProfileData).then(() => {
          this.setProfileData(newProfileData);
        });
      }
    },
  }),
  selectors: (slice, createSelector) => ({
    getTapeCovers() {
      return createSelector(
        slice,
        (a: RootState, tapeData: AllTapes) => tapeData,
        (userData, tapeData) => {
          console.log(userData, tapeData)
          const userTracks = userData?.tracks?.heds?.hedstape;
          if (userTracks && tapeData) {
            return Object.keys(userTracks).reduce((acc, curr) => ({ ...acc, [curr]: tapeData[curr] }), {});
          }
        },
      );
    },
  }),
});

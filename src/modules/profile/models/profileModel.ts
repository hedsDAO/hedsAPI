import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AllTapes, User, UserRoles } from '@/models/common';
import { formatUserCollection, populateNewUser } from '@/utils';
import { db } from '@/App';
import { RootState } from '@/store';
import { Result } from 'ethers/lib/utils';
import { emptyUserState } from '@/models/utils';

export const profileModel = createModel<RootModel>()({
  state: {} as User,
  reducers: {
    setProfileData: (state, payload: User) => ({ ...state, ...payload }),
    clearProfileState: (state) => emptyUserState(state),
  },
  effects: () => ({
    async getProfileData(wallet: string) {
      const docRef = doc(db, 'users', wallet.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) this.setProfileData(docSnap.data());
      else {
        const newProfileData = populateNewUser(wallet);
        await setDoc(docRef, newProfileData).then(() => {
          this.setProfileData(newProfileData);
        });
      }
    },
    async updateUserCollection([wallet, data]: [string, Result[]]) {
      const collection = formatUserCollection(data);
      const docSnap = await getDoc(doc(db, 'users', wallet));
      const profileData = docSnap.exists() ? docSnap.data() : null;
      const { role } = profileData;
      if (role === UserRoles.USER) await setDoc(doc(db, 'users', wallet), { ...profileData, collection });
      if (role === UserRoles.ARTIST) await setDoc(doc(db, 'artists', wallet), { ...profileData, collection });
      if (role === UserRoles.CURATOR) await setDoc(doc(db, 'curators', wallet), { ...profileData, collection });
      this.setProfileData({ ...profileData, collection });
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

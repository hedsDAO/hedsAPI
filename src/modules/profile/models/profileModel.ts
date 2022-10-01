import { createModel } from '@rematch/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { RootModel } from '../../../models';
import { AllTapes, User } from '../../../models/common';
import { populateNewUser } from '@/utils';
import { db } from '../../../App';
import { RootState, store } from '@/store';
import { UserCollection } from './common';
import { BigNumber } from 'ethers';
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
      if (docSnap.exists()) {
        this.setProfileData(docSnap.data());
      } else {
        const newProfileData = populateNewUser(wallet);
        await setDoc(docRef, newProfileData).then(() => {
          this.setProfileData(newProfileData);
        });
      }
    },
    async updateUserCollection([wallet, data]: [string, Result[]]) {
      const tapeDataForOwnership: UserCollection = store.select.tapesModel.getTapeDataForOwnership(store.getState());
      const userCollectionTank: UserCollection = {};
      const docRef = doc(db, 'users', wallet.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && tapeDataForOwnership) {
        Object.keys(tapeDataForOwnership).map((key: string, index: number) => {
          if (data?.[index] !== null) {
            if (data[index].toNumber() !== 0) {
              userCollectionTank[key] = {
                ...tapeDataForOwnership[key],
                quantity: data[index].toNumber(),
              };
            } else delete userCollectionTank[key];
          }
        });

        await setDoc(docRef, { ...docSnap.data(), collection: userCollectionTank })
          .then(() => this.setProfileData({ ...docSnap.data(), collection: userCollectionTank }))
          .catch((err) => console.log(err));
      }
    },
  }),
  selectors: (slice, createSelector) => ({
    getTapeCovers() {
      return createSelector(
        slice,
        (a: RootState, tapeData: AllTapes) => tapeData,
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

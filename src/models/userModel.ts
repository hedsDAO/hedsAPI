import { createModel } from '@rematch/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { RootModel } from '.';
import { BadgeData } from './common';
import { populateNewUser } from '../../src/utils/populateNewUser';
import { db } from '../../src/App';

export interface UserState {
  profilePicture: string;
  twitterHandle: string;
  badges: Array<BadgeData>;
  description: string;
}

export const userModel = createModel<RootModel>()({
  state: {} as UserState,
  reducers: {
    setUserData: (state, payload: UserState) => ({ ...state, ...payload }),
  },
  effects: () => ({
    async getUserData(wallet: string) {
      const docRef = doc(db, 'users', wallet.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.setUserData(docSnap.data());
      } else {
        const newUserData = populateNewUser(wallet);
        await setDoc(docRef, newUserData).then(() => {
          this.setUserData(newUserData);
        });
      }
    },
  }),
});

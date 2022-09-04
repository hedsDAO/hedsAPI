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
  displayName: string;
  wallet: string;
}

export const userModel = createModel<RootModel>()({
  state: {
    profilePicture: '',
    twitterHandle: '',
    badges: [],
    description: '',
    displayName: '',
    wallet: '',
  } as UserState,
  reducers: {
    setUserData: (state, payload: UserState) => ({ ...state, ...payload }),
    clearUserState: (state) => {
      const newState = { ...state };
      newState.profilePicture = '';
      newState.twitterHandle = '';
      newState.description = '';
      newState.badges = [];
      newState.displayName = '';
      newState.wallet = '';
      return newState;
    },
  },
  effects: () => ({
    async getUserData(wallet: string) {
      const docRef = doc(db, 'users', wallet.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.setUserData(docSnap.data());
      }
    },
  }),
});

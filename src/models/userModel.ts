import type { RootModel } from '.';
import { createModel } from '@rematch/core';
import { doc, getDoc } from 'firebase/firestore';
import { User } from './common';
import { db } from '../../src/App';

export const userModel = createModel<RootModel>()({
  state: {} as User,
  reducers: {
    setUserData: (state, payload: User) => ({ ...state, ...payload }),
    clearUserState: (state) => {
      const newState = { ...state };
      newState.profilePicture = '';
      newState.twitterHandle = '';
      newState.description = '';
      newState.badges = [];
      newState.displayName = '';
      newState.wallet = '';
      newState.samples = {};
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

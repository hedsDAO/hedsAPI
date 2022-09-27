import type { RootModel } from '../../models';
import { createModel } from '@rematch/core';
import { doc, getDoc } from 'firebase/firestore';
import { User } from '../../models/common';
import { db } from '@/App';

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
      newState.submissions = {};
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

import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { doc, getDoc } from 'firebase/firestore';
import { User } from './common';
import { emptyUserState } from './utils';
import { db } from '@/App';

export const userModel = createModel<RootModel>()({
  state: {} as User,
  reducers: {
    setUserData: (state, payload: User) => ({ ...state, ...payload }),
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
  }),
});

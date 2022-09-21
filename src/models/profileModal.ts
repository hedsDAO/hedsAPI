import { createModel } from '@rematch/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { RootModel } from '.';
import { User } from './common';
import { populateNewUser } from '../../src/utils/populateNewUser';
import { db } from '../../src/App';

export const profileModel = createModel<RootModel>()({
  state: {
    
  } as User,
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
});

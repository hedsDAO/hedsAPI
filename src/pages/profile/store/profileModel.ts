import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User, UserRoles } from '@/models/common';
import { populateNewUser } from '@/utils';
import { db } from '@/App';
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
    async updateUserData([wallet, newUserData]: [string, User]) {
      const docSnap = await getDoc(doc(db, 'users', wallet));
      const userData = docSnap.exists() ? docSnap.data() : null;
      const { role } = userData;
      if (role >= UserRoles.USER) await setDoc(doc(db, 'users', wallet), newUserData);
      if (role >= UserRoles.ARTIST) await setDoc(doc(db, 'artists', wallet), newUserData);
      if (role >= UserRoles.CURATOR) await setDoc(doc(db, 'curators', wallet), newUserData);
      this.setProfileData(newUserData);
      this.setUserData(newUserData);
    },
  }),
});

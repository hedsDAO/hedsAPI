import { populateNewUser } from './../../../../wrappers/store/utils';
import { User } from '@/models/common';
import { db } from '@/App';
import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { NameModelState } from './common';

export const nameModel = createModel<RootModel>()({
  state: {
    displayName: '',
    isLoading: false,
  } as NameModelState,
  reducers: {
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setDisplayName: (state, displayName: string) => ({ ...state, displayName }),
    setError: (state, error: string) => ({ ...state, error }),
  },
  selectors: (slice) => ({
    selectIsLoading() {
      return slice((nameModel) => nameModel.isLoading);
    },
    selectError() {
      return slice((nameModel) => nameModel.error);
    },
    selectDisplayName() {
      return slice((nameModel) => nameModel.displayName);
    },
  }),
  effects: (dispatch) => ({
    async validateDisplayName([displayName, connectedUserWallet, isOnOwnPage, connectedUserData]: [string, string, boolean, User | undefined]) {
      const docRef = doc(db, 'displayName', displayName.toLowerCase());
      const docSnap = await getDoc(docRef);
      this.setIsLoading(true);
      if (displayName.length <= 3 || displayName.length >= 15) {
        this.setError('Invalid display name. Must be between 3 and 15 characters.');
        return this.setIsLoading(false);
      } else if (docSnap.exists) {
        this.setError('This display name is already taken.');
        return this.setIsLoading(false);
      } else {
        // user's display name is valid length and is unique
        const newUserData = populateNewUser(connectedUserWallet, displayName);
        const docRef = doc(db, 'users', connectedUserWallet.toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const v2UserData = { ...newUserData, ...docSnap.data() };
          await setDoc(docRef, v2UserData).then(() => {
            this.setConnectedUserData(v2UserData);
            if (isOnOwnPage) this.setCurrentUserData(v2UserData);
            return this.setIsLoading(false);
          });
        } else {
          const docRef = doc(db, 'users', connectedUserWallet.toLowerCase());
          await setDoc(docRef, newUserData).then(() => {
            this.setConnectedUserData(newUserData);
            if (isOnOwnPage) this.setCurrentUserData(newUserData);
            return this.setIsLoading(false);
          });
        }
      }
    },
  }),
});

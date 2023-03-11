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
    async validateDisplayName([displayName, connectedUserWallet, isOnOwnPage]: [string, string, boolean]) {
      const displayNameRef = doc(db, 'displayName', displayName.toLowerCase());
      const userRef = doc(db, 'users', connectedUserWallet.toLowerCase());
      const userDocSnap = await getDoc(userRef);
      const displayNameDocSnap = await getDoc(displayNameRef);
      this.setIsLoading(true);
      if (displayName.length <= 3 || displayName.length >= 15) {
        this.setError('Invalid display name. Must be between 3 and 15 characters.');
        return this.setIsLoading(false);
      } else if (displayNameDocSnap.exists()) {
        this.setError('This display name is already taken.');
        return this.setIsLoading(false);
      } else {
        // user's display name is valid length and is unique
        const newUserData = populateNewUser(connectedUserWallet, displayName) as User;
        if (userDocSnap.exists()) {
          const v2UserData = { ...newUserData, ...userDocSnap.data() } as User;
          await setDoc(userRef, v2UserData);
          await setDoc(displayNameRef, { wallet: connectedUserWallet });
          dispatch.userModel.setConnectedUserData(v2UserData);
          if (isOnOwnPage) dispatch.userModel.setCurrentUserData(v2UserData);
          this.setIsLoading(false);
        } else {
          await setDoc(userRef, newUserData);
          await setDoc(displayNameRef, { wallet: connectedUserWallet });
          dispatch.userModel.setConnectedUserData(newUserData);
          if (isOnOwnPage) dispatch.userModel.setCurrentUserData(newUserData);
          this.setIsLoading(false);
        }
        return dispatch.modalModel.setModalOpen(false);
      }
    },
  }),
});

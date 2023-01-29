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
      this.setIsLoading(true);
      if (displayName.length >= 3 && displayName.length <= 15) {
        const docRef = doc(db, 'displayName', displayName.toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.setError('This display name is already taken.');
          return this.setIsLoading(false);
        } else {
          if (connectedUserData) {
            const newUserData = {
              ...connectedUserData,
              displayName: displayName,
            };
            await setDoc(docRef, { wallet: connectedUserWallet.toLowerCase() });
            dispatch.userModel.updateConnectedUserData([connectedUserWallet.toLowerCase(), newUserData]);
            dispatch.userModel.setConnectedUserData(newUserData);
          } else {
            await setDoc(docRef, { wallet: connectedUserWallet.toLowerCase() });
            dispatch.userModel.createNewUser([connectedUserWallet.toLowerCase(), displayName, isOnOwnPage]);
            dispatch.modalModel.setModalOpen(false);
          }
          dispatch.modalModel.setModalOpen(false);
          return this.setIsLoading(false);
        }
      } else {
        this.setError('Invalid display name. Must be between 3 and 15 characters.');
        return this.setIsLoading(false);
      }
    },
  }),
});

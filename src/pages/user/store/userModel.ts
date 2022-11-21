import type { RootModel } from '@/models';
import { Modals } from '@/modules/modals/store/modalModel';
import { createModel } from '@rematch/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { emptyUserState, populateNewUser } from './utils';
import { db } from '@/App';
import { UserRoles, User, HedsTapes } from '@/models/common';
import { formatUserCollection } from '@/utils';
import { Result } from 'ethers/lib/utils';

export interface userModelState {
  connectedUser: User;
  currentUser: User;
}

export const userModel = createModel<RootModel>()({
  state: {} as userModelState,
  reducers: {
    setUserData: (state, payload) => ({ ...state, ...payload }),
    setConnectedUserData: (state, connectedUser: User) => ({ ...state, connectedUser }),
    clearUserState: (state) => emptyUserState(state),
  },
  effects: (dispatch) => ({
    async getConnectedUserData(wallet: string) {
      const docRef = doc(db, 'users', wallet.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.setConnectedUserData(docSnap.data());
      } else {
        dispatch.modalModel.setModal(Modals.NAME_MODAL);
        dispatch.modalModel.setModalOpen(true);
      }
    },
    async createNewUser([wallet, displayName]: [string, string]) {
      const docRef = doc(db, 'users', wallet.toLowerCase());
      const newUserData = populateNewUser(wallet, displayName);
      await setDoc(docRef, newUserData).then(() => {
        this.setConnectedUserData(newUserData);
      });
    },
    async getUserData(wallet: string) {
      const docRef = doc(db, 'users', wallet.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.setUserData(docSnap.data());
      }
    },
    async updateUserCollection([wallet, data, hedsTapes]: [string, Result[], HedsTapes]) {
      const collection = formatUserCollection(data, hedsTapes);
      const docSnap = await getDoc(doc(db, 'users', wallet));
      const userData = docSnap.exists() ? docSnap.data() : null;
      const { role } = userData;
      if (role >= UserRoles.USER) await setDoc(doc(db, 'users', wallet), { ...userData, collection });
      if (role >= UserRoles.ARTIST) await setDoc(doc(db, 'artists', wallet), { ...userData, collection });
      if (role >= UserRoles.CURATOR) await setDoc(doc(db, 'curators', wallet), { ...userData, collection });
      this.setUserData({ ...userData, collection });
    },
  }),
});

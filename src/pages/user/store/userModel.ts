import type { RootModel } from '@/models';
import { Modals } from '@/modules/modals/store/modalModel';
import { createModel } from '@rematch/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { clearUserState, clearConnectedUserState, populateNewUser } from './utils';
import { db } from '@/App';
import { UserRoles, User, HedsTapes } from '@/models/common';
import { formatUserCollection, isEmpty } from '@/utils';
import { Result } from 'ethers/lib/utils';

export interface userModelState {
  connectedUser: User;
  currentUser: User;
}

export const userModel = createModel<RootModel>()({
  state: {} as userModelState,
  selectors: (slice, createSelector, hasProps) => ({
    /** Connected User Selectors */
    selectConnectedUser() {
      return slice((userModel) => userModel.connectedUser);
    },
    selectConnectedUserSubmissions() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.submissions?.heds?.hedstape || {});
    },
    selectConnectedUserBadges() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.badges || []);
    },
    selectConnectedUserTracks() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.tracks?.heds?.hedstape || {});
    },
    selectConnectedUserSamples() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.samples?.heds?.hedstape || {});
    },
    selectConnectedUserDisplayName() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.displayName || '');
    },
    selectConnectedUserBanner() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.banner || '');
    },
    selectConnectedUserWallet() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.wallet || '');
    },
    selectConnectedUserDescription() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.description || '');
    },
    selectConnectedUserTwitterHandle() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.twitterHandle || '');
    },
    selectConnectedUserProfilePicture() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.profilePicture || '');
    },
    selectConnectedUserCollection() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.collection || {});
    },
    selectConnectedUserSubmissionsBySpaceTapeId: hasProps(function (models, [space, tape, id]) {
      return slice((userModel) => userModel.connectedUser.submissions?.[space]?.[tape]?.[id]);
    }),

    /** Current User Selectors */
    selectCurrentUser() {
      return slice((userModel) => userModel.currentUser);
    },
    selectCurrentUserSubmissions() {
      return createSelector(this.selectCurrentUser, (currentUser: User) => currentUser?.submissions?.heds?.hedstape || {});
    },
    selectCurrentUserBadges() {
      return createSelector(this.selectCurrentUser, (currentUser: User) => currentUser?.badges || []);
    },
    selectCurrentUserTracks() {
      return createSelector(this.selectCurrentUser, (currentUser: User) => currentUser?.tracks?.heds?.hedstape || {});
    },
    selectCurrentUserSamples() {
      return createSelector(this.selectCurrentUser, (currentUser: User) => currentUser?.samples?.heds?.hedstape || {});
    },
    selectCurrentUserDisplayName() {
      return createSelector(this.selectCurrentUser, (currentUser: User) => currentUser?.displayName || '');
    },
    selectCurrentUserBanner() {
      return createSelector(this.selectCurrentUser, (currentUser: User) => currentUser?.banner || '');
    },
    selectCurrentUserWallet() {
      return createSelector(this.selectCurrentUser, (currentUser: User) => currentUser?.wallet || '');
    },
    selectCurrentUserDescription() {
      return createSelector(this.selectCurrentUser, (currentUser: User) => currentUser?.description || '');
    },
    selectCurrentUserTwitterHandle() {
      return createSelector(this.selectCurrentUser, (currentUser: User) => currentUser?.twitterHandle || '');
    },
    selectCurrentUserProfilePicture() {
      return createSelector(this.selectCurrentUser, (currentUser: User) => currentUser?.profilePicture || '');
    },
    selectCurrentUserCollection() {
      return createSelector(this.selectCurrentUser, (currentUser: User) => currentUser?.collection || {});
    },
    selectCurrentUserSubmissionsBySpaceTapeId: hasProps(function (models, [space, tape, id]) {
      return slice((userModel) => userModel.currentUser.submissions?.[space]?.[tape]?.[id]);
    }),

    selectIsOwnPage() {
      return createSelector(
        this.selectConnectedUserWallet,
        this.selectCurrentUserWallet,
        (connectedWallet: string, currentWallet: string) => connectedWallet === currentWallet,
      );
    },
  }),
  reducers: {
    setUserData: (state, payload) => ({ ...state, ...payload }),
    setCurrentUserData: (state, currentUser: User) => ({ ...state, currentUser }),
    setConnectedUserData: (state, connectedUser: User) => ({ ...state, connectedUser }),
    clearUserState: (state) => clearUserState(state),
    clearConnectedUserState: (state) => clearConnectedUserState(state),
  },
  effects: (dispatch) => ({
    async getConnectedUserData(wallet: string) {
      if (wallet?.length) {
        const docRef = doc(db, 'users', wallet.toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.setConnectedUserData(docSnap.data());
        } else {
          dispatch.modalModel.setModal(Modals.NAME_MODAL);
          dispatch.modalModel.setModalOpen(true);
        }
      }
    },
    async getCurrentUserData(wallet: string) {
      if (wallet?.length) {
        const docRef = doc(db, 'users', wallet.toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.setCurrentUserData(docSnap.data());
        }
      }
    },
    async createNewUser([wallet, displayName]: [string, string]) {
      if (wallet?.length) {
        const docRef = doc(db, 'users', wallet.toLowerCase());
        const newUserData = populateNewUser(wallet, displayName);
        await setDoc(docRef, newUserData).then(() => {
          this.setConnectedUserData(newUserData);
        });
      }
    },
    async updateConnectedUserData([wallet, newUserData]: [string, User]) {
      if (wallet.toLowerCase() === newUserData?.wallet.toLowerCase()) {
        const docRef = doc(db, 'users', wallet.toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await setDoc(docRef, newUserData).then(() => {
            this.setConnectedUserData(newUserData);
            this.setCurrentUserData(newUserData);
          });
        }
      }
    },
    async updateCurrentUserCollection([wallet, data, hedsTapes]: [string, Result[], HedsTapes]) {
      const collection = formatUserCollection(data, hedsTapes);
      const docSnap = await getDoc(doc(db, 'users', wallet));
      const userData = docSnap.exists() ? docSnap.data() : null;
      const { role } = userData;
      if (role >= UserRoles.USER) await setDoc(doc(db, 'users', wallet), { ...userData, collection });
      if (role >= UserRoles.ARTIST) await setDoc(doc(db, 'artists', wallet), { ...userData, collection });
      if (role >= UserRoles.CURATOR) await setDoc(doc(db, 'curators', wallet), { ...userData, collection });
      this.setCurrentUserData({ ...userData, collection });
    },
    async updateConnectedUserCollection([wallet, data, hedsTapes]: [string, Result[], HedsTapes]) {
      const collection = formatUserCollection(data, hedsTapes);
      const docSnap = await getDoc(doc(db, 'users', wallet));
      const userData = docSnap.exists() ? docSnap.data() : null;
      const { role } = userData;
      if (role >= UserRoles.USER) await setDoc(doc(db, 'users', wallet), { ...userData, collection });
      if (role >= UserRoles.ARTIST) await setDoc(doc(db, 'artists', wallet), { ...userData, collection });
      if (role >= UserRoles.CURATOR) await setDoc(doc(db, 'curators', wallet), { ...userData, collection });
      this.setConnectedUserData({ ...userData, collection });
    },
  }),
});

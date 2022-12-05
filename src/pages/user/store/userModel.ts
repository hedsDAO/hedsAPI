import { TrackMetadataMapping } from './../../../models/common';
import type { RootModel } from '@/models';
import { Modals } from '@/modules/modals/store/modalModel';
import { createModel } from '@rematch/core';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { clearUserState, clearConnectedUserState, populateNewUser, clearCurrentUserState } from './utils';
import { db } from '@/App';
import { UserRoles, User, TapeData, TrackMetadata } from '@/models/common';
import { formatUserCollection } from '@/utils';
import { Result } from 'ethers/lib/utils';

export interface userModelState {
  connectedUser: User;
  currentUser: User;
  currentTab: number;
}

export const userModel = createModel<RootModel>()({
  state: { currentTab: 0 } as userModelState,
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
    selectCurrentUserAllTracks() {
      return createSelector(
        this.selectCurrentUser,
        (currentUser: User): { [key: string]: { [key: string]: TrackMetadata } } => currentUser?.tracks?.heds || {},
      );
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
    selectCurrentUserJoined() {
      return createSelector(this.selectCurrentUser, (currentUser: User) => currentUser?.joined || 0);
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
    selectHasConnectedUserLikedTrack: hasProps(function (models, track) {
      return slice((userModel) => (track?.stats?.likedBy && userModel.connectedUser.wallet in track?.stats?.likedBy) || false);
    }),
    selectIsOwnPage() {
      return createSelector(
        this.selectConnectedUserWallet,
        this.selectCurrentUserWallet,
        (connectedWallet: string, currentWallet: string) => connectedWallet === currentWallet,
      );
    },
    selectCurrentTab() {
      return slice((userModel): number => userModel.currentTab);
    },
  }),
  reducers: {
    setUserData: (state, payload) => ({ ...state, ...payload }),
    setCurrentUserData: (state, currentUser: User) => ({ ...state, currentUser }),
    setConnectedUserData: (state, connectedUser: User) => ({ ...state, connectedUser }),
    setCurrentTab: (state, currentTab: number) => ({ ...state, currentTab }),
    clearUserState: (state) => clearUserState(state),
    clearConnectedUserState: (state) => clearConnectedUserState(state),
    clearCurrentUserState: (state) => clearCurrentUserState(state),
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
    async createNewUser([wallet, displayName, isOnOwnPage]: [string, string, boolean]) {
      if (wallet?.length) {
        const docRef = doc(db, 'users', wallet.toLowerCase());
        const newUserData = populateNewUser(wallet, displayName);
        await setDoc(docRef, newUserData).then(() => {
          this.setConnectedUserData(newUserData);
          if (isOnOwnPage) this.setCurrentUserData(newUserData);
        });
      }
    },
    async updateConnectedUserData([wallet, newUserData]: [string, User]) {
      const docSnap = await getDoc(doc(db, 'users', wallet));
      const userData = docSnap.exists() ? docSnap.data() : null;
      const { role } = userData;
      if (role >= UserRoles.USER) await setDoc(doc(db, 'users', wallet), { ...userData, ...newUserData });
      if (role >= UserRoles.ARTIST) await setDoc(doc(db, 'artists', wallet), { ...userData, ...newUserData });
      if (role >= UserRoles.CURATOR) await setDoc(doc(db, 'curators', wallet), { ...userData, ...newUserData });
      this.setCurrentUserData({ ...userData, ...newUserData });
    },
    async updateCurrentUserCollection([wallet, data, allTapeData]: [string, Result[], TapeData[]]) {
      const collection = formatUserCollection(data, allTapeData);
      const docSnap = await getDoc(doc(db, 'users', wallet));
      const userData = docSnap.exists() ? docSnap.data() : null;
      const { role } = userData;
      if (role >= UserRoles.USER) await setDoc(doc(db, 'users', wallet), { ...userData, collection });
      if (role >= UserRoles.ARTIST) await setDoc(doc(db, 'artists', wallet), { ...userData, collection });
      if (role >= UserRoles.CURATOR) await setDoc(doc(db, 'curators', wallet), { ...userData, collection });
      this.setCurrentUserData({ ...userData, collection });
    },
    async updateConnectedUserCollection([wallet, data, allTapeData]: [string, Result[], TapeData[]]) {
      const collection = formatUserCollection(data, allTapeData);
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

import { TrackMetadataMapping } from '../../../models/common';
import type { RootModel } from '@/models';
import { Modals } from '@/modules/modals/store/modalModel';
import { createModel } from '@rematch/core';
import { doc, DocumentData, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { clearUserState, clearConnectedUserState, populateNewUser, clearCurrentUserState } from './utils';
import { db } from '@/App';
import { UserCollection, UserRoles, User, TapeData, TrackMetadata } from '@/models/common';
import { formatUserCollection, isEmpty } from '@/utils';
import { Result } from 'ethers/lib/utils';
import { whitelist } from '@/data/tokenBurnWhitelist';
import { ethers } from 'ethers';
import { getSplitsBalance } from '@/utils/graphql/getSplitsBalance';
import { Choice, UpdatedVoteObject, VoteObject } from 'hedsvote';

export interface userModelState {
  connectedUser: User;
  currentUser: User;
  splitsBalance?: string;
  audioTabIndex: number;
  engagementTabIndex: number;
  engagementTabs?: Array<string>;
  audioTabs?: Array<string>;
}

export const tapesAndVpWeights: { [key: string]: number } = {
  '0xde8a0b17d3dc0468adc65309881d9d6a6cd66372': 9,
  '0x5083cf11003f2b25ca7456717e6dc980545002e5': 6,
  '0x567e687c93103010962f9e9cf5730ae8dbfc6d41': 5,
  '0x8045fd700946a00436923f37d08f280ade3b4af6': 7,
  '0x8f36eb094f7b960a234a482d4d8ffb8b37f728c6': 6,
  '0x885236535d5cf7033bdc5bc1050cad7fdf4970a6': 5,
  '0x20f2717f113d0b3815124876f3d72f8e1179341e': 6,
  '0xa2aced918e8cff703b8bb4129a30146a1dc35675': 7,
  '0xeb8377be44222e90388ff8bb04be27f9bfc6a98e': 8,
  '0x9f396644ec4b2a2bc3c6cf665d29165dde0e83f1': 7,
  '0xfdf7d7ffe3d363f858644057ebc62afabb99152a': 7,
};

export const userModel = createModel<RootModel>()({
  state: { engagementTabIndex: 0, audioTabIndex: 0 } as userModelState,
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
    selectConnectedUserRole() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.role || 0);
    },
    selectConnectedUserTwitterHandle() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.twitterHandle || '');
    },
    selectConnectedUserProfilePicture() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.profilePicture || '');
    },
    selectConnectedUserCollection() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.collection || { items: {}, lastUpdated: 0 });
    },
    selectConnectedUserSubmissionsBySpaceTapeId: hasProps(function (models, [space, tape, id]) {
      return slice((userModel) => userModel.connectedUser?.submissions?.[space]?.[tape]?.[id]);
    }),
    selectConnectedUserLikes() {
      return createSelector(this.selectConnectedUser, (connectedUser: User) => connectedUser?.likes || []);
    },

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
    selectCurrentUserLikes() {
      return createSelector(this.selectCurrentUser, (currentUser: User) => currentUser?.likes || []);
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
    selectCurrentUserRole() {
      return createSelector(this.selectCurrentUser, (currentUser: User) => currentUser.role || 0);
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
      return createSelector(this.selectCurrentUser, (currentUser: User) => currentUser?.collection || { items: {}, lastUpdated: 0 });
    },
    selectCurrentUserSubmissionsBySpaceTapeId: hasProps(function (models, [space, tape, id]) {
      return slice((userModel) => userModel.currentUser.submissions?.[space]?.[tape]?.[id]);
    }),
    selectCurrentUserVotingPower() {
      return createSelector(
        this.selectCurrentUserRole,
        this.selectCurrentUserWallet,
        this.selectCurrentUserCollection,
        (role: number, wallet: string, userCollection: UserCollection) => {
          const vpFromArtistWhitelist = role >= UserRoles.ARTIST ? 15 : 0;
          const vpFromOgWhitelist = whitelist.find((whitelistAdress) => whitelistAdress === wallet.toLowerCase());

          const collectionContracts = Object.keys(userCollection?.items || {});
          if (!collectionContracts.length) {
            return vpFromArtistWhitelist ? (vpFromOgWhitelist ? 10 + vpFromArtistWhitelist : vpFromArtistWhitelist) : vpFromOgWhitelist ? 10 : 0;
          }

          const filteredContracts = collectionContracts.reduce((results, collectionContract) => {
            if (userCollection.items[collectionContract].tape === 'hedstape') {
              const quantity = userCollection.items[collectionContract].quantity;
              results.push({ contract: collectionContract.toLowerCase(), quantity });
            }
            return results;
          }, []);

          if (!filteredContracts.length) return 0;

          const vpFromCollection: number = filteredContracts.reduce((totalVp: number, filteredContract: { contract: string; quantity: number }) => {
            const { contract, quantity } = filteredContract;
            if (Object.keys(tapesAndVpWeights).includes(contract)) {
              if (!totalVp) totalVp = 0;
              const vpToAdd = quantity === 1 ? tapesAndVpWeights[contract] : tapesAndVpWeights[contract] * quantity;
              return (totalVp += vpToAdd);
            }
          }, 0);

          return vpFromOgWhitelist ? 10 + vpFromCollection + vpFromArtistWhitelist : vpFromCollection + vpFromArtistWhitelist;
        },
      );
    },
    selectHasConnectedUserLikedTrack: hasProps(function (models, track) {
      return slice((userModel) => (!isEmpty(track?.likedBy) ? userModel?.connectedUser?.wallet in track?.likedBy : false));
    }),
    selectIsOwnPage() {
      return createSelector(
        this.selectConnectedUserWallet,
        this.selectCurrentUserWallet,
        (connectedWallet: string, currentWallet: string) => connectedWallet === currentWallet,
      );
    },
    selectUserSplitsBalance() {
      return slice((userModel) => userModel?.splitsBalance);
    },
    selectDoesUserHavePublicSubmissions() {
      return slice((userModel) => {
        if (userModel?.currentUser) {
          if (!isEmpty(userModel?.currentUser?.submissions)) {
            const userSubs = Object.values(userModel?.currentUser?.submissions?.heds?.hedstape);
            const publicSubs = userSubs.filter((sub) => sub?.public);
            if (publicSubs.length > 0) return true;
          }
        } else return false;
      });
    },
    selectAudioTabIndex() {
      return slice((userModel): number => userModel.audioTabIndex);
    },
    selectEngagementTabIndex() {
      return slice((userModel): number => userModel.engagementTabIndex);
    },
    selectAudioTabs() {
      return slice((userModel): Array<string> => userModel.audioTabs);
    },
    selectEngagementTabs() {
      return slice((userModel): Array<string> => userModel.engagementTabs);
    },
  }),
  reducers: {
    setUserData: (state, payload) => ({ ...state, ...payload }),
    setCurrentUserData: (state, currentUser: User) => ({ ...state, currentUser }),
    setConnectedUserData: (state, connectedUser: User) => ({ ...state, connectedUser }),
    setSplitsBalance: (state, splitsBalance: string) => ({ ...state, splitsBalance }),
    setEngagementTabIndex: (state, engagementTabIndex: number) => ({ ...state, engagementTabIndex }),
    setAudioTabIndex: (state, audioTabIndex: number) => ({ ...state, audioTabIndex }),
    setAudioTabs: (state, audioTabs: Array<string>) => ({ ...state, audioTabs }),
    setEngagementTabs: (state, engagementTabs: Array<string>) => ({ ...state, engagementTabs }),
    clearUserState: (state) => clearUserState(state),
    clearConnectedUserState: (state) => clearConnectedUserState(state),
    clearCurrentUserState: (state) => clearCurrentUserState(state),
  },
  effects: (dispatch) => ({
    async getConnectedUserData(wallet: string) {
      if (wallet?.length) {
        const docRef = doc(db, 'users', wallet.toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data()?.displayName) this.setConnectedUserData(docSnap.data());
        else if (docSnap.exists() && !docSnap.data()?.displayName?.length) {
          dispatch.modalModel.setModal(Modals.NAME_MODAL);
          dispatch.modalModel.setModalOpen(true);
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
          const audioTabs: string[] = [];
          const engagementTabs: string[] = [];
          this.setCurrentUserData(docSnap.data());
          const userData = docSnap.data();

          if (userData) engagementTabs.push('collection');
          if (userData?.likes && userData?.likes?.length) engagementTabs.push('likes');
          if (userData?.submissions && !isEmpty(userData?.submissions)) audioTabs.push('submissions');
          if (userData?.tracks && !isEmpty(userData?.tracks)) audioTabs.push('tracks');
          if (userData?.samples && !isEmpty(userData?.samples)) audioTabs.push('samples');
          this.setAudioTabs(audioTabs);
          this.setEngagementTabs(engagementTabs);
        }
      }
    },
    async getSplitsBalance(walletId: string) {
      const balance = await getSplitsBalance(walletId);
      if (!balance.user) return;
      const tokenId = balance.user.internalBalances[0].token.id;
      const amount = balance.user.internalBalances[0].amount;
      if (tokenId === '0x0000000000000000000000000000000000000000' && amount > 0) {
        this.setSplitsBalance(ethers.utils.formatEther(amount));
        return;
      }
      return;
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
    async addUserLike([connectedWallet, currentWallet, track]: [string, string, TrackMetadata]) {
      const docRef = doc(db, 'users', connectedWallet.toLowerCase());
      const docSnap = await getDoc(docRef);
      const userData = docSnap.exists() ? docSnap.data() : null;
      const prevLikes = userData?.likes;
      const { role } = userData;
      let updatedLikesTank: TrackMetadata[];
      if (prevLikes?.length) updatedLikesTank = [...prevLikes, track];
      else updatedLikesTank = [track];
      if (role >= UserRoles.USER) await setDoc(doc(db, 'users', connectedWallet), { ...userData, likes: updatedLikesTank });
      if (role >= UserRoles.ARTIST) await setDoc(doc(db, 'artists', connectedWallet), { ...userData, likes: updatedLikesTank });
      if (role === UserRoles.ARTIST) dispatch.artistModel.getAllArtists();
      this.setConnectedUserData({ ...userData, likes: updatedLikesTank });
      if (connectedWallet.toLowerCase() === currentWallet.toLowerCase()) this.setCurrentUserData({ ...userData, likes: updatedLikesTank });
    },
    async removeUserLike([connectedWallet, currentWallet, track]: [string, string, TrackMetadata]) {
      const docRef = doc(db, 'users', connectedWallet.toLowerCase());
      const docSnap = await getDoc(docRef);
      const userData = docSnap.exists() ? docSnap.data() : null;
      const prevLikes = userData?.likes;
      const { role } = userData;
      let updatedLikesTank: TrackMetadata[];
      if (prevLikes?.length) updatedLikesTank = prevLikes.filter((likedTrack: TrackMetadata) => track.audio !== likedTrack.audio);
      else updatedLikesTank = [];
      if (role >= UserRoles.USER) await setDoc(doc(db, 'users', connectedWallet), { ...userData, likes: updatedLikesTank });
      if (role >= UserRoles.ARTIST) await setDoc(doc(db, 'artists', connectedWallet), { ...userData, likes: updatedLikesTank });
      if (role === UserRoles.ARTIST) dispatch.artistModel.getAllArtists();
      this.setConnectedUserData({ ...userData, likes: updatedLikesTank });
      if (connectedWallet.toLowerCase() === currentWallet.toLowerCase()) this.setCurrentUserData({ ...userData, likes: updatedLikesTank });
    },
    async updateConnectedUserData([wallet, newUserData]: [string, User]) {
      const docSnap = await getDoc(doc(db, 'users', wallet));
      const userData = docSnap.exists() ? docSnap.data() : null;
      const { role } = userData;
      if (role >= UserRoles.USER) await setDoc(doc(db, 'users', wallet), { ...userData, ...newUserData });
      if (role >= UserRoles.ARTIST) await setDoc(doc(db, 'artists', wallet), { ...userData, ...newUserData });
      if (role >= UserRoles.CURATOR) await setDoc(doc(db, 'curators', wallet), { ...userData, ...newUserData });
      this.setConnectedUserData({ ...userData, ...newUserData });
      this.setCurrentUserData({ ...userData, ...newUserData });
    },
    async updateUserTrackMetadataStats([wallet, newUserData]) {
      const docSnap = await getDoc(doc(db, 'users', wallet));
      const userData = docSnap.exists() ? docSnap.data() : null;
      const { role } = userData;
      const { tracks, submissions, samples } = newUserData;
      const updatedUser = { ...userData, tracks, submissions, samples };
      if (role >= UserRoles.USER) await updateDoc(doc(db, 'users', wallet), { ...updatedUser });
      if (role === UserRoles.ARTIST) await updateDoc(doc(db, 'artists', wallet), { ...updatedUser });
      if (role === UserRoles.ARTIST) dispatch.artistModel.getAllArtists();
      this.setCurrentUserData({ ...updatedUser });
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
    async updateConnectedUserSubmissionStatus([track, wallet]: [TrackMetadata, string]) {
      const docSnap = await getDoc(doc(db, 'users', wallet.toLowerCase()));
      const userData = docSnap.exists() ? docSnap.data() : null;
      const { role } = userData;
      const { space, tape, id } = track;
      const updatedUserData = { ...userData };
      updatedUserData.submissions[space][tape][id] = { ...track, public: !track.public };
      if (!isEmpty(track?.stats?.likedBy)) {
        Object.keys(track.stats.likedBy).map(async (wallet) => {
          const docSnap = await getDoc(doc(db, 'users', wallet));
          const userData = docSnap.exists() ? docSnap.data() : null;
          const { role } = userData;
          if (userData?.likes?.length) {
            const updatedUserLikes = [...userData.likes].map((likedTrack) => {
              return likedTrack?.audio === track.audio ? { ...likedTrack, public: !track.public } : likedTrack;
            });
            if (role >= UserRoles.USER) await setDoc(doc(db, 'users', wallet), { ...userData, likes: updatedUserLikes });
            if (role >= UserRoles.ARTIST) await setDoc(doc(db, 'artists', wallet), { ...userData, likes: updatedUserLikes });
          }
        });
      }
      if (role >= UserRoles.USER) await setDoc(doc(db, 'users', wallet), updatedUserData);
      if (role >= UserRoles.ARTIST) await setDoc(doc(db, 'artists', wallet), updatedUserData);
      this.setCurrentUserData(updatedUserData);
    },
    async newUserSubmission([track, wallet]: [TrackMetadata, string]) {
      const docSnap = await getDoc(doc(db, 'users', wallet.toLowerCase()));
      const userData = docSnap.exists() ? docSnap.data() : null;
      const { role } = userData;
      const { space, tape, id } = track;
      const updatedUserData = { ...userData };
      updatedUserData.submissions = {
        [space]: {
          ...(updatedUserData?.['submissions']?.[space] && updatedUserData.submissions[space]),
          [tape]: {
            ...(updatedUserData?.['submissions']?.[space]?.[tape] && updatedUserData.submissions[space][tape]),
            [id]: { ...track, public: false },
          },
        },
      };
      if (role >= UserRoles.USER) await setDoc(doc(db, 'users', wallet), updatedUserData);
      if (role >= UserRoles.ARTIST) await setDoc(doc(db, 'artists', wallet), updatedUserData);
      this.setConnectedUserData(updatedUserData);
    },
    async deletePreviousSubmission([track, wallet]) {
      const docSnap = await getDoc(doc(db, 'users', wallet.toLowerCase()));
      const userData = docSnap.exists() ? docSnap.data() : null;
      const { role } = userData;
      const { space, tape, id } = track;
      const updatedUserData = { ...userData };
      delete updatedUserData.submissions[space][tape][id];
      if (isEmpty(updatedUserData.submissions[space][tape])) updatedUserData.submissions = {};
      if (role >= UserRoles.USER) await setDoc(doc(db, 'users', wallet), updatedUserData);
      if (role >= UserRoles.ARTIST) await setDoc(doc(db, 'artists', wallet), updatedUserData);
      this.setConnectedUserData(updatedUserData);
    },

    async addUserVote([vote, choices]: [VoteObject | UpdatedVoteObject, Choice[]]) {
      const docRef = doc(db, 'users', vote.vote.voter.toLowerCase());
      const docSnap = await getDoc(docRef);
      const tapeId = choices.pop().location.split('/')[2];
      const formattedVote: any = { ...vote.vote };
      for (let choiceId of Object.keys(vote.vote.choice)) {
        const choice = choices.find((choice) => choice.id + 1 === Number(choiceId));
        const weight = vote.vote.choice[choiceId];
        formattedVote.choice[choiceId] = { weight, choice };
      }
      await updateDoc(docRef, { votes: { heds: { hedstape: { ...docSnap.data().votes?.heds?.hedstape, [tapeId]: formattedVote } } } });
      return;
    },
  }),
});

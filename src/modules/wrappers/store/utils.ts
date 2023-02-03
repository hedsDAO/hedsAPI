import { User, BadgeData, TrackMetadata, UserCollection } from '@/models/common';
import { DateTime } from 'luxon';
import { userModelState } from './userModel';

/**
 * @function emptyUserState
 * @summary Function to clear and return a typed user state.
 * @note state is recieved as an argument, spread and overwritten to
 * prevent unused variable ts error in UserModal.
 */

export const clearUserState = (state: userModelState): userModelState => {
  const empty: User = {
    profilePicture: '',
    banner: '',
    twitterHandle: '',
    badges: [],
    description: '',
    displayName: '',
    role: 0,
    wallet: '',
    samples: {},
    tracks: {},
    submissions: {},
    collection: {} as UserCollection,
    joined: null,
  };
  return {
    connectedUser: empty,
    currentUser: empty,
    audioTabIndex: 0,
    engagementTabIndex: 0,
    audioTabs: [] as Array<string>,
    engagementTabs: [] as Array<string>,
  };
};

/**
 * @function clearConnectedUserState
 * @summary Function to clear and return a typed user state.
 * @note state is recieved as an argument, spread and overwritten to
 * prevent unused variable ts error in UserModal.
 */

export const clearConnectedUserState = (state: userModelState): userModelState => {
  const newState = { ...state };
  const currentUserState = newState.currentUser;
  return {
    currentUser: currentUserState,
    connectedUser: {
      profilePicture: '',
      banner: '',
      twitterHandle: '',
      badges: [],
      description: '',
      displayName: '',
      role: 0,
      wallet: '',
      samples: {},
      tracks: {},
      submissions: {},
      collection: {} as UserCollection,
      joined: null,
    },
    audioTabIndex: 0,
    engagementTabIndex: 0,
  };
};
export const clearCurrentUserState = (state: userModelState): userModelState => {
  const empty: User = {
    profilePicture: '',
    banner: '',
    twitterHandle: '',
    badges: [],
    description: '',
    displayName: '',
    role: 0,
    wallet: '',
    samples: {},
    tracks: {},
    submissions: {},
    collection: {} as UserCollection,
    joined: null,
  };
  const newState = { ...state };
  const connectedUserState = newState.connectedUser;
  return {
    currentUser: empty,
    connectedUser: connectedUserState,
    audioTabIndex: 0,
    engagementTabIndex: 0,
    audioTabs: [] as Array<string>,
    engagementTabs: [] as Array<string>,
  };
};

/**
 * @function populateNewUser
 * @summary populated new user data with @const {string} wallet recieved from wagmi.
 */

export const populateNewUser = (wallet: string, displayName: string): User => {
  const STORAGE_PREFIX_URL = 'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o';
  const vistorBadge: BadgeData = {
    description: 'Welcome to heds.',
    image: `${STORAGE_PREFIX_URL}/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1`,
    name: 'Visitor',
  };
  const newUserData = {
    profilePicture: `${STORAGE_PREFIX_URL}/profilePictures%2F0x000000000000000000000000000000.png?alt=media&token=55cb53fe-736d-4b1e-bcd0-bf17bc7146dc`,
    banner: `${STORAGE_PREFIX_URL}/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3`,
    twitterHandle: '',
    badges: [vistorBadge],
    description: '',
    displayName: displayName,
    wallet: wallet.toLowerCase(),
    collection: {} as UserCollection,
    samples: {},
    tracks: {},
    submissions: {},
    role: 0,
    joined: DateTime.now().toMillis(),
    likes: [] as TrackMetadata[],
  };
  return newUserData;
};

export default populateNewUser;

import { User, BadgeData } from '@/models/common';
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
    collection: {},
  };
  return {
    connectedUser: empty,
    currentUser: empty,
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
      collection: {},
    },
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
    collection: {},
  };
  const newState = { ...state };
  const connectedUserState = newState.connectedUser;
  return {
    currentUser: empty,
    connectedUser: connectedUserState,
  };
};

/**
 * @function populateNewUser
 * @summary populated new user data with @const {string} wallet recieved from wagmi.
 */

export const populateNewUser = (wallet: string, displayName: string): User => {
  const vistorBadge: BadgeData = {
    description: 'Welcome to heds.',
    image: 'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1',
    name: 'Visitor',
  };
  const newUserData = {
    profilePicture:
      'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/users%2F0x000000000000000000000000000000.png?alt=media&token=55cb53fe-736d-4b1e-bcd0-bf17bc7146dc',
    banner:
      'https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/banners%2F0x000000000000000000000000000000.jpg?alt=media&token=0ce2e318-a672-443f-903a-f252f02b505f',
    twitterHandle: '',
    badges: [vistorBadge],
    description: '',
    displayName: displayName,
    wallet: wallet.toLowerCase(),
    collection: {},
    role: 0,
  };
  return newUserData;
};

export default populateNewUser;

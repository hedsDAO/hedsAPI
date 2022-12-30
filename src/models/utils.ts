import { User, UserCollection } from './common';

export const emptyUserState = (state: User): User => {
  return {
    ...state,
    profilePicture: '',
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
  };
};

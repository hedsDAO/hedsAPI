import { User } from './common';

/**
 * @name emptyProfileState
 * @summary Function to clear and return a typed user state.
 *
 * @note state is recieved as an argument, spread and overwritten to
 * prevent unused variable ts error in UserModal.
 */

export const emptyProfileState = (state: User): User => {
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
    public: false,
  };
};

import { User } from './common';

/**
 * @name emptyUserState
 * @summary Function to clear and return a typed user state.
 *
 * @note state is recieved as an argument, spread and overwritten to
 * prevent unused variable ts error in UserModal.
 */

export const emptyUserState = (state: User): User => {
  return {
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

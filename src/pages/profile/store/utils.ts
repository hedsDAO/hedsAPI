import { User } from '@/models/common';

/**
 * @name emptyProfileState
 * @summary Function to clear and return a typed user state.
 *
 * @note state is recieved as an argument, spread and overwritten to
 * prevent unused variable ts error in UserModal.
 */

export const emptyProfileState = (state: User): User => {
  return {
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
    public: false,
  };
};

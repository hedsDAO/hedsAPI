import { createUser, getUserByWallet, getUserLikesById, updateUser } from '@/api/user';
import { Song, User } from '@models/common';
import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import { DateTime } from 'luxon';
import { createNewUserData } from './constants';

interface AuthModelState {
  user: User;
  userLikes: Song[];
}

export const authModel = createModel<RootModel>()({
  state: {
    user: null,
    userLikes: [],
  } as AuthModelState,
  reducers: {
    setUser: (state, user: User) => ({ ...state, user }),
    setUserLikes: (state, userLikes: Song[]) => ({ ...state, userLikes }),
  },
  selectors: (slice, _, hasProps) => ({
    selectUser: () => slice((state) => state.user),
    selectBanner: () => slice((state) => state.user?.banner),
    selectProfilePicture: () => slice((state) => state.user?.profile_picture),
    selectDescription: () => slice((state) => state.user?.description),
    selectUserLikes: () => slice((state) => state.userLikes),
    selectUserId: () => slice((state) => state.user?.id),
    selectWallet: () => slice((state) => state.user?.wallet),
    selectUserDisplayName: () => slice((state) => state.user?.display_name || ''),
  }),
  effects: () => ({
    async getUser(wallet: string) {
      const response = await getUserByWallet(wallet?.toLowerCase());
      if (response.data === '') {
        const newUserData = createNewUserData(wallet);
        const newUserResponse = await createUser(newUserData);
        this.setUser(newUserResponse.data);
        const { id } = response.data;
        const likes = await getUserLikesById(id);
        if (likes?.data) this.setUserLikes(likes.data);
      } else if (response.data?.id) {
        this.setUser(response.data);
        const { id } = response.data;
        const likes = await getUserLikesById(id);
        if (likes?.data) this.setUserLikes(likes.data);
      }
    },
    async updateUser(newUserData: User) {
      const response = await updateUser(newUserData.id, newUserData);
      this.setUser(response.data);
    },
    async getUserLikes(userId: number) {
      const response = await getUserLikesById(userId);
      this.setUserLikes(response.data);
    },
  }),
});

import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import { getUserByWallet, updateUser } from '@/api/user';
import { User } from '@models/common';

interface AuthModelState {
  user: User;
}

export const authModel = createModel<RootModel>()({
  state: {
    user: null,
  } as AuthModelState,
  reducers: {
    setUser: (state, user: User) => ({ ...state, user }),
  },
  selectors: (slice) => ({
    selectUser: () => slice((state) => state.user),
    selectBanner: () => slice((state) => state.user?.banner),
    selectProfilePicture: () => slice((state) => state.user?.profile_picture),
    selectDescription: () => slice((state) => state.user?.description),
  }),
  effects: () => ({
    async getUser(wallet: string) {
      const response = await getUserByWallet(wallet.toLowerCase());
      this.setUser(response.data);
    },
    async updateUser(newUserData: User) {
      const response = await updateUser(newUserData.id, newUserData);
      this.setUser(response.data);
    },
  }),
});

import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import { getUserByWallet } from '@/api/user';
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
  }),
  effects: () => ({
    async getUser(wallet: string) {
      const response = await getUserByWallet(wallet.toLowerCase());
      this.setUser(response.data);
    },
  }),
});

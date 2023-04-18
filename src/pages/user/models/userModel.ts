import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import { getUserByWallet } from '@/api/user';
import { User } from '@models/common';
import { getSongByHash } from '@/api/song';

interface UserModelState {
  user: User;
}

export const userModel = createModel<RootModel>()({
  state: {
    user: null,
  } as UserModelState,
  reducers: {
    setUser: (state, user: User) => ({ ...state, user }),
  },
  selectors: (slice) => ({
    selectUser: () => slice((state) => state.user),
  }),
  effects: () => ({
    async getUser(wallet: string) {
      const response = await getUserByWallet(wallet.toLowerCase());
      if (response.data?.spotlight?.length) {
        const spotlight = await getSongByHash(response.data.spotlight);
        this.setUser({ ...response.data, spotlight: spotlight.data });
      } else this.setUser({ ...response.data });
    },
  }),
});

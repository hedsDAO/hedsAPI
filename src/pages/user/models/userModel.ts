import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { getUserByWallet, getUserEventsById, getUserLikesById, getUserSongsById } from '@/api/user';
import { Song, User, UserEvent } from '@models/common';
import { getSongByHash } from '@/api/song';

interface UserModelState {
  user: User;
  user_songs: Song[];
  user_likes: Song[];
  user_events: UserEvent[];
}

export const userModel = createModel<RootModel>()({
  state: {
    user: null,
  } as UserModelState,
  reducers: {
    setUser: (state, user: User) => ({ ...state, user }),
    setUserSongs: (state, user_songs: any) => ({ ...state, user_songs }),
    setUserLikes: (state, user_likes: any) => ({ ...state, user_likes }),
    setUserEvents: (state, user_events: any) => ({ ...state, user_events }),
  },
  selectors: (slice) => ({
    selectUser: () => slice((state) => state.user),
    selectSongs: () => slice((state) => state.user_songs),
    selectLikes: () => slice((state) => state.user_likes),
    selectUserEvents: () => slice((state): UserEvent[] => state.user_events),
    //
    selectProfilePicture: () => slice((state) => state.user?.profile_picture),
    selectBanner: () => slice((state) => state.user?.banner),
    selectDisplayName: () => slice((state) => state.user?.display_name),
    selectDescription: () => slice((state) => state.user?.description),
    selectTwitterHandle: () => slice((state) => state.user?.twitter_handle),
    selectSpotlight: () => slice((state): Song => state.user?.spotlight),
    selectWallet: () => slice((state) => state.user?.wallet),
    selectCollection: () => slice((state): { [key: string]: any } => state.user?.collection?.items),
  }),
  effects: () => ({
    async getUser(wallet: string) {
      let spotlight, user_songs, user_likes, user_events;
      const response = await getUserByWallet(wallet.toLowerCase());
      if (response.data?.spotlight?.length) spotlight = await getSongByHash(response.data.spotlight);
      if (response.data?.id) {
        user_songs = await getUserSongsById(response.data.id);
        user_likes = await getUserLikesById(response.data.id);
        user_events = await getUserEventsById(response.data.id);
      }
      this.setUser({ ...response.data, spotlight: spotlight?.data || null });
      this.setUserSongs(user_songs?.data || []);
      this.setUserLikes(user_likes?.data || []);
      this.setUserEvents(user_events?.data || []);
    },
  }),
});

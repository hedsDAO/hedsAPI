import type { RootModel } from '@/models';
import { getSongByHash } from '@/api/song';
import { getUserByWallet, getUserEventsById, getUserLikesById, getUserSongsById } from '@/api/user';
import { isEmpty } from '@/utils';
import { Song, User, UserEvents } from '@models/common';
import { UserModelState } from '@pages/user/models/common';
import { createModel } from '@rematch/core';

/**
 * reducers
 * @property {Function} setUser - Redux reducer for setting the user object in the state.
 * @property {Function} setUserSongs - Redux reducer for setting the user songs array in the state.
 * @property {Function} setUserLikes - Redux reducer for setting the user likes array in the state.
 * @property {Function} setUserEvents - Redux reducer for setting the user events array in the state.
 *
 * selectors
 * @property {Function} selectUser - Selector for getting the user object from the state.
 * @property {Function} selectUserEvents - Selector for getting the user events array from the state.
 * @property {Function} selectProfilePicture - Selector for getting the user's profile picture from the state.
 * @property {Function} selectBanner - Selector for getting the user's banner from the state.
 * @property {Function} selectDisplayName - Selector for getting the user's display name from the state.
 * @property {Function} selectDescription - Selector for getting the user's description from the state.
 * @property {Function} selectTwitterHandle - Selector for getting the user's Twitter handle from the state.
 * @property {Function} selectSpotlight - Selector for getting the user's spotlight song from the state.
 * @property {Function} selectWallet - Selector for getting the user's wallet address from the state.
 * @property {Function} selectSongs - Selector for getting the user's uploaded songs array from the state.
 * @property {Function} selectNumOfSongs - Selector for getting the number of uploaded songs from the state.
 * @property {Function} selectLikes - Selector for getting the user's liked songs array from the state.
 * @property {Function} selectNumOfLikes - Selector for getting the number of liked songs from the state.
 * @property {Function} selectCollection - Selector for getting the user's collection object from the state.
 * @property {Function} selectNumOfCollections - Selector for getting the number of items in the user's collection from the state.
 *
 * effects
 * @property {Function} getUser - Redux effect for fetching user data and setting it in the state.
 */

export const userModel = createModel<RootModel>()({
  state: {} as UserModelState,
  reducers: {
    setState: (state, newState) => ({ ...state, ...newState }),
    setUser: (state, user: User) => ({ ...state, user }),
    setUserSongs: (state, user_songs: any) => ({ ...state, user_songs }),
    setUserLikes: (state, user_likes: any) => ({ ...state, user_likes }),
    setUserEvents: (state, user_events: any) => ({ ...state, user_events }),
  },
  selectors: (slice) => ({
    selectUser: () => slice((state) => state.user),
    selectUserEvents: () => slice((state): UserEvents[] | [] => state.user_events),
    selectProfilePicture: () => slice((state) => state.user?.profile_picture),
    selectBanner: () => slice((state) => state.user?.banner),
    selectDisplayName: () => slice((state) => state.user?.display_name),
    selectDescription: () => slice((state) => state.user?.description),
    selectTwitterHandle: () => slice((state) => state.user?.twitter_handle),
    selectSpotlight: () => slice((state): Song => state.user?.spotlight),
    selectWallet: () => slice((state) => state.user?.wallet),
    selectSongs: () => slice((state) => state.user_songs),
    selectNumOfSongs: () => slice((state) => state.user_songs?.length),
    selectLikes: () => slice((state) => state.user_likes),
    selectNumOfLikes: () => slice((state) => state.user_likes?.length),
    selectCollection: () => slice((state): { [key: string]: any } => state.user?.collection?.items),
    selectNumOfCollections: () => slice((state) => (!isEmpty(state.user?.collection) ? Object.values(state.user?.collection?.items)?.length : 0)),
  }),
  effects: (dispatch) => ({
    async getUser(wallet: string) {
      let spotlight, user_songs, user_likes, user_events;
      const response = await getUserByWallet(wallet.toLowerCase());
      if (response.data?.spotlight?.length) spotlight = await getSongByHash(response?.data?.spotlight);
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

import { Song, TapeCollectionArg, User, UserEvents, UserSong } from '@/models/common';

/**
 * @enum {number}
 * @description enum representing the possible tabs in the User component.
 */
export enum UserNavTabs {
  COLLECTION = 0,
  LIKES,
  DISCOGRAPHY,
}

/**
 * @interface UserModelState
 * @description Interface representing the state of the user model in the app.
 * @property {User} user - The user object containing the user's details.
 * @property {Song[]} user_songs - An array of songs uploaded by the user.
 * @property {Song[]} user_likes - An array of songs liked by the user.
 * @property {UserEvents[]} user_events - An array of user events.
 */

export interface UserModelState {
  user: User;
  spotlight?: Song; 
  user_songs: UserSong[];
  user_likes: Song[];
  user_events: UserEvents[];
  user_vp: number;
  collection_args: TapeCollectionArg[];
  isFetchingCollection: boolean;
}

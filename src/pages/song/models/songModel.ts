import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import { getManySongsByHash, getSongByHash, getSongEventsById, getSongLikesById, likeSong, unlikeSong } from '@api/song';
import { CyaniteData, Song, SongEvents, User } from '@/models/common';
import { getCyaniteData, getRelatedTracks } from '@/utils';
import { DEFAULT_NAV_TABS, APPEARS_ON_TAB } from '@pages/song/models/constants';

interface SongState {
  song?: Song;
  cyaniteData?: CyaniteData;
  songEvents?: SongEvents[];
  relatedSongs?: Song[];
  navbarTabs: string[];
  likes: User[];
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
}

export const songModel = createModel<RootModel>()({
  state: {} as SongState,
  reducers: {
    setSong: (state, payload: Song) => ({ ...state, song: payload }),
    setCyaniteData: (state, payload: any) => ({ ...state, cyaniteData: payload }),
    setIsPlaying: (state, isPlaying: boolean) => ({ ...state, isPlaying }),
    setVolume: (state, volume: number) => ({ ...state, volume }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setIsMuted: (state, isMuted: boolean) => ({ ...state, isMuted }),
    setSongEvents: (state, songEvents: any) => ({ ...state, songEvents }),
    setRelatedSongs: (state, relatedSongs: any) => ({ ...state, relatedSongs }),
    setSongLikes: (state, likes: any) => ({ ...state, likes }),
    setNavbarTabs: (state, navbarTabs: string[]) => ({ ...state, navbarTabs }),
    clearState: () => ({} as SongState),
  },
  selectors: (slice) => ({
    selectSong: () => slice((state: SongState) => state.song),
    selectSongId: () => slice((state: SongState) => state.song?.id),
    selectSongCover: () => slice((state: SongState) => state.song?.cover),
    selectSongHash: () => slice((state: SongState): string => state.song?.audio?.split('/ipfs/')[1]),
    selectSongSubmissionCover: () => slice((state: SongState) => state.song?.submission_data?.sub_image),
    selectSongArtists: () => slice((state: SongState): User[] => state.song?.artists?.map((artist) => artist)),
    selectSongTrackName: () => slice((state: SongState) => state.song?.track_name || state.song?.submission_data?.sub_id),
    selectSongTrackNumber: () => slice((state: SongState) => state.song?.track_data?.track_no),
    selectCyaniteData: () => slice((state: SongState) => state?.cyaniteData),
    selectRelatedSongs: () => slice((state: SongState) => state?.relatedSongs),
    selectSongEvents: () => slice((state: SongState) => state?.songEvents),
    selectSongLikes: () => slice((state: SongState) => state?.likes),
    selectIsPlaying: () => slice((state: SongState) => state.isPlaying),
    selectVolume: () => slice((state: SongState) => state.volume),
    selectIsLoading: () => slice((state: SongState) => state.isLoading),
    selectIsMuted: () => slice((state: SongState) => state.isMuted),
    selectNavbarTabs: () => slice((state: SongState) => state?.navbarTabs),
    selectNumberOfAttributes: () =>
      slice((state: SongState) => {
        const subGenreTags = state.cyaniteData?.subgenreTags?.length || 0;
        const genreTags = state.cyaniteData?.genreTags?.length || 0;
        const bpmPrediction = 1;
        const keyPrediction = 1;
        return subGenreTags + genreTags + bpmPrediction + keyPrediction;
      }),
    selectTapeName: () => slice((state: SongState): string => state.song?.track_data?.tape_name),
  }),
  effects: (dispatch) => ({
    async getSongData(hash: string) {
      this.setIsLoading(true);
      const response = await getSongByHash(hash);
      this.setSong(response?.data);
      const songEventsResponse = await getSongEventsById(response.data?.id);
      this.setSongEvents(songEventsResponse?.data);
      const songLikes = await getSongLikesById(response.data?.id);
      this.setSongLikes(songLikes?.data);
      const cyaniteId = response?.data?.cyanite_id;
      if (cyaniteId) {
        const cyaniteResponse = await getCyaniteData(parseInt(cyaniteId));
        this.setCyaniteData(cyaniteResponse.result);
      }
      if (cyaniteId) {
        const song_hashes = await getRelatedTracks(parseInt(cyaniteId));
        if (song_hashes?.length) {
          const relatedSongsResponse = await getManySongsByHash(song_hashes);
          this.setRelatedSongs(relatedSongsResponse?.data);
        }
      }
      const navbarTabs = [...DEFAULT_NAV_TABS];
      if (response.data?.track_data?.track_no) navbarTabs.push(APPEARS_ON_TAB);
      this.setNavbarTabs(navbarTabs);
      this.setIsLoading(false);
    },
    async handleLikeSong([song_id, user_id, hash]: [number, number, string]) {
      await likeSong(song_id, user_id);
      const updatedLikes = await getSongLikesById(song_id);
      dispatch.authModel.getUserLikes(user_id);
      dispatch.songModel.getSongData(hash);
      this.setSongLikes(updatedLikes?.data);
    },
    async handleUnlikeSong([song_id, user_id, hash]: [number, number, string]) {
      await unlikeSong(song_id, user_id);
      const updatedLikes = await getSongLikesById(song_id);
      dispatch.authModel.getUserLikes(user_id);
      dispatch.songModel.getSongData(hash);
      this.setSongLikes(updatedLikes?.data);
    },
  }),
});

import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import { getManySongs, getSongByHash, getSongEventsById, getSongLikesById, likeSong, unlikeSong } from '@api/song';
import { CyaniteData, Song, SongEvents, User } from '@/models/common';
import { getCyaniteData, getRelatedTracks } from '@/utils';
import { DEFAULT_NAV_TABS, APPEARS_ON_TAB } from '@pages/song/models/constants';
import { SongModelState } from '@pages/song/models/common';

export const songModel = createModel<RootModel>()({
  state: {} as SongModelState,
  reducers: {
    setState: (state, payload: SongModelState) => ({ ...state, ...payload }),
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
    clearState: () => ({} as SongModelState),
  },
  selectors: (slice) => ({
    selectSong: () => slice((state: SongModelState) => state.song),
    selectSongId: () => slice((state: SongModelState) => state.song?.id),
    selectSongTapeId: () => slice((state: SongModelState) => state.song?.tape_id),
    selectSongCover: () => slice((state: SongModelState) => state.song?.cover),
    selectSongHash: () => slice((state: SongModelState): string => state.song?.audio?.split('/ipfs/')[1]),
    selectSongSubmissionCover: () => slice((state: SongModelState) => state.song?.submission_data?.sub_image),
    selectSongArtists: () => slice((state: SongModelState): User[] => state.song?.artists?.map((artist) => artist)),
    selectSongTrackName: () => slice((state: SongModelState) => state.song?.track_name || state.song?.submission_data?.sub_id),
    selectSongTrackNumber: () => slice((state: SongModelState) => state.song?.track_data?.track_no),
    selectCyaniteData: () => slice((state: SongModelState) => state?.cyaniteData),
    selectRelatedSongs: () => slice((state: SongModelState) => state?.relatedSongs),
    selectSongEvents: () => slice((state: SongModelState) => state?.songEvents),
    selectSongLikes: () => slice((state: SongModelState) => state?.likes),
    selectIsPlaying: () => slice((state: SongModelState) => state.isPlaying),
    selectVolume: () => slice((state: SongModelState) => state.volume),
    selectIsLoading: () => slice((state: SongModelState) => state.isLoading),
    selectIsMuted: () => slice((state: SongModelState) => state.isMuted),
    selectNavbarTabs: () => slice((state: SongModelState) => state?.navbarTabs),
    selectIsSongPublic: () => slice((state: SongModelState) => state?.song?.public),
    selectSongVideo: () => slice((state: SongModelState) => state?.song?.video),
    selectNumberOfAttributes: () =>
      slice((state: SongModelState) => {
        const subGenreTags = state.cyaniteData?.subgenreTags?.length || 0;
        const genreTags = state.cyaniteData?.genreTags?.length || 0;
        const bpmPrediction = 1;
        const keyPrediction = 1;
        return subGenreTags + genreTags + bpmPrediction + keyPrediction;
      }),
    selectTapeName: () => slice((state: SongModelState): string => state.song?.track_data?.tape_name),
  }),
  effects: (dispatch) => ({
    async getSongData(hash: string) {
      this.setIsLoading(true);
      const response = await getSongByHash(hash);
      this.setSong(response?.data);
      const songEventsResponse = await getSongEventsById(response.data?.id);
      const sortedEvents = songEventsResponse?.data?.sort((a: SongEvents, b: SongEvents) => {
        return new Date(b.event_timestamp).getTime() - new Date(a.event_timestamp).getTime();
      });
      this.setSongEvents(sortedEvents);
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
          const relatedSongsResponse = await getManySongs(song_hashes);
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
      this.setSongLikes(updatedLikes?.data || []);
    },
    async handleUnlikeSong([song_id, user_id, hash]: [number, number, string]) {
      await unlikeSong(song_id, user_id);
      const updatedLikes = await getSongLikesById(song_id);
      dispatch.authModel.getUserLikes(user_id);
      dispatch.songModel.getSongData(hash);
      this.setSongLikes(updatedLikes?.data || []);
    },
  }),
});

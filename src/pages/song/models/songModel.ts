import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import { getManySongsByHash, getSongByHash, getSongEventsById, getSongLikesById } from '@api/song';
import { CyaniteData, Song, SongEvents, User } from '@/models/common';
import { getCyaniteData, getRelatedTracks } from '@/utils';

interface SongState {
  song?: Song;
  cyanite_data?: CyaniteData;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  song_events?: SongEvents[];
  related_songs?: Song[];
  likes: User[];
}

export const songModel = createModel<RootModel>()({
  state: {
    song: {},
    cyanite_data: {} as CyaniteData,
    isPlaying: false,
    volume: 1,
    isMuted: false,
    isLoading: false,
    song_events: [] as SongEvents[],
    likes: [],
  } as SongState,
  reducers: {
    setSong: (state, payload: Song) => ({ ...state, song: payload }),
    setCyaniteData: (state, payload: any) => ({ ...state, cyanite_data: payload }),
    setIsPlaying: (state, isPlaying: boolean) => ({ ...state, isPlaying }),
    setVolume: (state, volume: number) => ({ ...state, volume }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setIsMuted: (state, isMuted: boolean) => ({ ...state, isMuted }),
    setSongEvents: (state, song_events: any) => ({ ...state, song_events }),
    setRelatedSongs: (state, related_songs: any) => ({ ...state, related_songs }),
    setSongLikes: (state, likes: any) => ({ ...state, likes }),
    clearState: () => ({ song: null, likes: [], cyanite_data: {} as CyaniteData, isPlaying: false, volume: 1, isLoading: false, isMuted: false }),
  },
  selectors: (slice) => ({
    selectSong: () => slice((state: SongState) => state.song),
    selectSongCover: () => slice((state: SongState) => state.song?.cover),
    selectSongSubmissionCover: () => slice((state: SongState) => state.song?.submission_data?.sub_image),
    selectSongArtists: () => slice((state: SongState): string[] => state.song?.artists?.map((artist) => artist?.display_name)),
    selectSongTrackName: () => slice((state: SongState) => state.song?.track_name || state.song?.submission_data?.sub_id),
    selectCyaniteData: () => slice((state: SongState) => state?.cyanite_data),
    selectRelatedSongs: () => slice((state: SongState) => state?.related_songs),
    selectSongEvents: () => slice((state: SongState) => state?.song_events),
    selectSongLikes: () => slice((state: SongState) => state?.likes),
    selectIsPlaying: () => slice((state: SongState) => state.isPlaying),
    selectVolume: () => slice((state: SongState) => state.volume),
    selectIsLoading: () => slice((state: SongState) => state.isLoading),
    selectIsMuted: () => slice((state: SongState) => state.isMuted),
    selectTapeName: () => slice((state: SongState): string => state.song?.track_data?.tape_name),
  }),
  effects: () => ({
    async getSongData(hash: string) {
      const response = await getSongByHash(hash);
      this.setSong(response?.data);
      const songEventsResponse = await getSongEventsById(response.data?.id);
      this.setSongEvents(songEventsResponse?.data);
      const songLikes = await getSongLikesById(response.data?.id);
      this.setSongLikes(songLikes?.data)
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
    },
  }),
});

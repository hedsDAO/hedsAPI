import { SongLikeData } from './../../../pages/song/models/common';
import { AxiosResponse } from 'axios';
import { getManySongs, getSongByHash, getSongLikesById, likeSong, unlikeSong } from '@/api/song';
import type { RootModel } from '@/models';
import { Song } from '@/models/common';
import { getRelatedTracks } from '@/utils';
import { createModel } from '@rematch/core';
import { AudioModelState } from '@/hooks/useAudio/models/common';

export const audioModel = createModel<RootModel>()({
  state: {
    song: {} as Song,
    isPlaying: false,
    isMuted: false,
    isLoading: false,
    isError: false,
    autoplay: true,
    progress: 0,
    duration: 0,
    volume: 1,
  } as AudioModelState,
  reducers: {
    setSong: (state, song: Song) => ({ ...state, song }),
    setIsPlaying: (state, isPlaying: boolean) => ({ ...state, isPlaying }),
    setIsMuted: (state, isMuted: boolean) => ({ ...state, isMuted }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setPrevious: (state, previous: Song) => ({ ...state, previous }),
    setError: (state, isError: boolean) => ({ ...state, isError }),
    setProgress: (state, progress: number) => ({ ...state, progress }),
    setAutoplay: (state, autoplay: boolean) => ({ ...state, autoplay }),
    setVolume: (state, volume: number) => ({ ...state, volume }),
    setUpNext: (state, upNext: Song) => ({ ...state, upNext }),
    setDuration: (state, duration: number) => ({ ...state, duration }),
    setSongLikes: (state: AudioModelState, likes: SongLikeData[]) => ({ ...state, likes }),
    setState: (state, payload): AudioModelState => ({ ...state, ...payload }),
    clearState: () => ({
      song: {} as Song,
      isPlaying: false,
      isMuted: false,
      isLoading: false,
      isError: false,
      autoplay: true,
      progress: 0,
      duration: 0,
      volume: 1,
      likes: [],
    }),
  },
  selectors: (slice) => ({
    selectSong() {
      return slice((state): Song => state?.song);
    },
    selectIsPlaying() {
      return slice((state): boolean => state?.isPlaying);
    },
    selectIsLoading() {
      return slice((state): boolean => state?.isLoading);
    },
    selectIsMuted() {
      return slice((state): boolean => state?.isMuted);
    },
    selectProgress() {
      return slice((state): number => state?.progress);
    },
    selectDuration() {
      return slice((state): number => state?.duration);
    },
    selectVolume() {
      return slice((state): number => state?.volume);
    },
    selectAutoplay() {
      return slice((state): boolean => state?.autoplay);
    },
    selectUpNext() {
      return slice((state): Song => state?.upNext);
    },
    selectPrevious() {
      return slice((state): Song => state?.previous);
    },
    // song data selectors
    selectTrackName() {
      return slice((state): string => state.song?.track_name);
    },
    selectAudio() {
      return slice((state): string => state.song?.audio);
    },
    selectArtists() {
      return slice((state): string => state.song?.artists?.map((artist) => artist.display_name).join(', '));
    },
    selectArtistWallets() {
      return slice((state): string[] => state.song?.artists?.map((artist) => artist.wallet));
    },
    selectTapeName() {
      return slice((state): string => state.song?.track_data?.tape_name);
    },
    selectCover() {
      return slice((state): string => state.song?.cover);
    },
    selectSongId() {
      return slice((state): number => state.song?.id);
    },
    selectSongHash() {
      return slice((state): string => state.song?.audio?.split('/ipfs/')[1]);
    },
    selectIsSongPublic() {
      return slice((state): boolean => state?.song?.public);
    },
    selectSongLikes() {
      return slice((state) => state?.likes || []);
    },
  }),
  effects: (dispatch) => ({
    async getNextSong(song: Song) {
      this.setIsLoading(true);
      if (song?.cyanite_id) {
        let relatedSongHashes: string[];
        let nextSongResponse: AxiosResponse<Song>;
        relatedSongHashes = await getRelatedTracks(parseInt(song?.cyanite_id), 10);
        if (relatedSongHashes?.length) {
          const nextUniqueTrack = relatedSongHashes.filter((hash) => hash !== song?.audio?.split('/ipfs/')[1] && hash);
          let rand = Math.floor(Math.random() * 10) + 1;
          if (nextUniqueTrack[rand]) {
            nextSongResponse = await getSongByHash(nextUniqueTrack[rand]);
            this.setUpNext(nextSongResponse.data);
          }
        }
      }
      this.setIsLoading(false);
    },
    async getPrevious(song: Song) {
      this.setIsLoading(true);
      if (song?.cyanite_id) {
        let relatedSongHashes: string[];
        let previousSongResponse: AxiosResponse<Song>;
        relatedSongHashes = await getRelatedTracks(parseInt(song?.cyanite_id), 10);
        if (relatedSongHashes?.length) {
          const previousUniqueTrack = relatedSongHashes.filter((hash) => hash !== song?.audio?.split('/ipfs/')[1] && hash);
          let rand = Math.floor(Math.random() * 10) + 1;
          if (previousUniqueTrack[rand]) {
            previousSongResponse = await getSongByHash(previousUniqueTrack[rand]);
            this.setPrevious(previousSongResponse.data);
          }
        }
      }
      this.setIsLoading(false);
    },
    async getSongLikes(song: Song) {
      const songLikes = await getSongLikesById(song?.id);
      this.setSongLikes(songLikes?.data);
    },
    async handleLikeSong([song_id, user_id, hash]: [number, number, string]) {
      await likeSong(song_id, user_id);
      const updatedLikes = await getSongLikesById(song_id);
      dispatch.authModel.getUserLikes(user_id);
      const updatedSongData = await getSongByHash(hash);
      this.setSong(updatedSongData?.data);
      this.setSongLikes(updatedLikes?.data || []);
    },
    async handleUnlikeSong([song_id, user_id, hash]: [number, number, string]) {
      await unlikeSong(song_id, user_id);
      const updatedLikes = await getSongLikesById(song_id);
      dispatch.authModel.getUserLikes(user_id);
      const updatedSongData = await getSongByHash(hash);
      this.setSong(updatedSongData?.data);
      this.setSongLikes(updatedLikes?.data || []);
    },
  }),
});

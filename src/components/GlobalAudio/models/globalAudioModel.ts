import type { RootModel } from '@/models';
import { Song, SongArtist } from '@/models/common';
import { createModel } from '@rematch/core';
import Wavesurfer from 'wavesurfer.js';

export const globalAudioModel = createModel<RootModel>()({
  state: {
    currentSong: null as Song | null,
    isPlaying: false,
    volume: 1,
    isMuted: false,
    isLoading: false,
  },
  reducers: {
    setCurrentSong: (state, currentSong: Song | null) => ({ ...state, currentSong }),
    setIsPlaying: (state, isPlaying: boolean) => ({ ...state, isPlaying }),
    setVolume: (state, volume: number) => ({ ...state, volume }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setIsMuted: (state, isMuted: boolean) => ({ ...state, isMuted }),
    clearState: () => ({ currentSong: null, isPlaying: false, volume: 1, waveform: null, isLoading: false, isMuted: false }),
  },
  selectors: (slice) => ({
    selectIsMuted() {
      return slice((state): boolean => state.isMuted);
    },
    selectIsLoading() {
      return slice((state): boolean => state.isLoading);
    },
    selectCurrentSong() {
      return slice((state): Song => state.currentSong);
    },
    selectCurrentSongHash() {
      return slice((state): string => state.currentSong?.audio.split('/ipfs/')[1]);
    },
    selectCurrentSongName() {
      return slice((state): string => state.currentSong?.track_name || state.currentSong?.submission_data?.sub_id);
    },
    selectCurrentSongArtists() {
      return slice((state): string[] => state.currentSong?.artists?.map((artist: SongArtist) => artist?.display_name));
    },
    selectVolume() {
      return slice((state) => state.volume);
    },
    selectIsPlaying() {
      return slice((state) => state.isPlaying);
    },
  }),
  effects: () => ({}),
});

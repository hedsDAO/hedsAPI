import { createModel } from '@rematch/core';
import type { RootModel } from '../../models';
import { TrackMetadata } from '../../models/common';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../App';

export enum PlayerSize {
  HIDDEN = 0,
  OPEN,
  MINIMIZED,
}

export interface AudioState {
  currentTapeTracks: Array<TrackMetadata>;
  currentTrack: number;
  currentTapeId: any;
  currentTape: string;
  playerSize: PlayerSize;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: [string, number];
  duration: [string, number];
  volume: number;
  isSample: boolean;
}

export const audioModel = createModel<RootModel>()({
  state: {
    playerSize: PlayerSize.HIDDEN,
    isPlaying: false,
    isLoading: false,
    volume: 0,
  } as AudioState,
  reducers: {
    setPlayerSize: (state, playerSize: PlayerSize) => ({ ...state, playerSize }),
    setIsPlaying: (state, isPlaying: boolean) => ({ ...state, isPlaying }),
    setVolume: (state, volume: number) => ({ ...state, volume }),
    setCurrentTime: (state, currentTime: [string, number]) => ({ ...state, currentTime }),
    setDuration: (state, duration: [string, number]) => ({ ...state, duration }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
  },
  effects: () => ({
    async getTrackData([tapeTracks, space, tape, id]: [Array<string>, string, string, string]) {
      const tapeTracksTank: Array<TrackMetadata> = [];
      tapeTracks.forEach(async (artist: string) => {
        const docRef = doc(db, 'artists', artist.toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const artistTrack = docSnap.data()?.['tracks']?.[space]?.[tape]?.[id];
          if (artistTrack) tapeTracksTank.push(artistTrack);
        }
      });
    },
  }),
});

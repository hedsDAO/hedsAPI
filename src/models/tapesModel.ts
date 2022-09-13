import { createModel } from '@rematch/core';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { TapeData, User } from './common';
import { db } from '../../src/App';
import type { RootModel } from '.';

interface AllTapes {
  [tapeName: string]: {
    [tapeId: string]: TapeData;
  };
}

export interface TrackAndArtistMetadata {
  audio: string;
  duration: number;
  track: string;
  profilePicture: string;
  wallet: string;
  displayName: string;
}

interface TapeAndArtistData {
  contract: string;
  curator: string;
  description: string;
  etherscan: string;
  image: string;
  name: string;
  opensea: string;
  route: string;
  tracks: Array<TrackAndArtistMetadata>;
}

export interface TapeState {
  allTapes: AllTapes;
  tapeTypes: Array<string>;
  currentTracks: Array<TrackAndArtistMetadata>;
}

export const tapesModel = createModel<RootModel>()({
  state: {} as TapeState,
  reducers: {
    setAllTapes: (state, allTapes) => ({ ...state, allTapes }),
    setTapeTypes: (state, tapeTypes) => ({ ...state, tapeTypes }),
    setCurrentTracks: (state, currentTracks) => ({ ...state, currentTracks }),
  },
  effects: () => ({
    async getAllTapes() {
      const docRef = collection(db, 'tapes');
      const docSnap = await getDocs(docRef);
      const allTapes: AllTapes = {};
      const tapeTypes: Array<string> = [];
      if (!docSnap.empty) {
        docSnap.forEach((tape) => {
          tapeTypes.push(tape.id);
          allTapes[tape.id] = tape.data();
        });
      }
      tapeTypes.reverse();
      this.setTapeTypes(tapeTypes);
      this.setAllTapes(allTapes);
      return;
    },
    async getCurrentTape([allTapes, allArtists, space, tape, id]: [
      AllTapes,
      { [key: string]: User },
      string,
      string,
      string,
    ]) {
      const currentTape = allTapes?.[tape]?.[id];
      const currentTracks = currentTape?.tracks;
      const tracks: Array<TrackAndArtistMetadata> = [];
      currentTape.tracks.map((wallet) => {
        if (wallet in allArtists) {
          const { displayName, profilePicture } = allArtists[wallet];
          const { duration, track, audio } = allArtists[wallet]?.tracks?.[space]?.[tape]?.[id];
          tracks.push({
            displayName,
            profilePicture,
            wallet: allArtists[wallet].wallet,
            duration,
            track,
            audio,
          });
        }
      });
      this.setCurrentTracks(tracks);
    },
  }),
});

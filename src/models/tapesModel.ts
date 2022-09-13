import { createModel } from '@rematch/core';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { TapeData, TrackMetadata } from './common';
import { db } from '../../src/App';
import type { RootModel } from '.';

interface AllTapes {
  [tapeName: string]: {
    [tapeId: string]: TapeData;
  };
}

export interface TapeState {
  allTapes: AllTapes;
  tapeTypes: Array<string>;
  currentTape: [string, string, string];
  currentTracks: Array<any>;
}

export const tapesModel = createModel<RootModel>()({
  state: {} as TapeState,
  reducers: {
    setAllTapes: (state, allTapes) => ({ ...state, allTapes }),
    setTapeTypes: (state, tapeTypes) => ({ ...state, tapeTypes }),
    setCurrentTracks: (state, currentTracks) => ({ ...state, currentTracks }),
    setCurrentTape: (state, currentTape: [string, string, string]) => ({ ...state, currentTape }),
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
    async getCurrentTracks([allTapes, space, tape, id]: [AllTapes, string, string, string]) {
      const tapeTracks = allTapes?.[tape]?.[id]?.tracks;
      const tapeTracksTank: Array<any> = [];
      tapeTracks.forEach(async (artist: string) => {
        const docRef = doc(db, 'artists', artist.toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const artistTrack = {
            ...docSnap.data()?.['tracks']?.[space]?.[tape]?.[id],
            profilePicture: docSnap.data()?.profilePicture,
            wallet: docSnap.data()?.wallet,
          };
          if (artistTrack) tapeTracksTank.push(artistTrack);
        }
      });
      this.setCurrentTracks(tapeTracksTank);
    },
  }),
});

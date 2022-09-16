import type { RootModel } from '.';
import { createModel } from '@rematch/core';
import { collection, getDocs } from 'firebase/firestore';
import artistMapping from '@utils/artistMapping';
import { TapeAndTrackData, AllTapes, TrackArtistMetadata, ArtistMapping, CuratorMetadata } from './common';
import { db } from '@/App';

export interface TapeState {
  allTapes: AllTapes;
  tapeTypes: Array<string>;
  currentTape: TapeAndTrackData;
}

export const tapesModel = createModel<RootModel>()({
  state: {} as TapeState,
  reducers: {
    setAllTapes: (state, allTapes) => ({ ...state, allTapes }),
    setTapeTypes: (state, tapeTypes) => ({ ...state, tapeTypes }),
    setCurrentTape: (state, currentTape) => ({ ...state, currentTape }),
  },
  effects: () => ({
    async getAllTapes() {
      const docRef = collection(db, 'tapes');
      const docSnap = await getDocs(docRef);
      const allTapes: AllTapes = {};
      const tapeTypes: Array<string> = [];
      docSnap.forEach((tape) => {
        tapeTypes.push(tape.id);
        allTapes[tape.id] = tape.data();
      });
      tapeTypes.reverse();
      this.setTapeTypes(tapeTypes);
      this.setAllTapes(allTapes);
    },
    async getCurrentTape([allTapes, allArtists, space, tape, id]: [AllTapes, ArtistMapping, string, string, string]) {
      const curator: TrackArtistMetadata | CuratorMetadata = artistMapping([[allTapes[tape][id].curator], allArtists, space, tape, id, true])[0];
      const tracks: Array<TrackArtistMetadata> = artistMapping([allTapes[tape][id].tracks, allArtists, space, tape, id, false]);
      this.setCurrentTape({ ...allTapes[tape][id], curator, tracks });
    },
  }),
});

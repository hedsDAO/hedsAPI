import { createModel } from '@rematch/core';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { artistMapping } from '../../src/utils/artistMapping';
import { TapeData, TapeAndTrackData, AllTapes, TrackArtistMetadata, ArtistMapping } from './common';
import { db } from '../../src/App';
import type { RootModel } from '.';

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
      const { contract, description, etherscan, image, name, opensea, route, tracks, curator } = allTapes[tape][id];
      const sample: TrackArtistMetadata = artistMapping([[curator], allArtists, space, tape, id, true])[0];
      const tapeTracks: Array<TrackArtistMetadata> = artistMapping([tracks, allArtists, space, tape, id, false]);
      return this.setCurrentTape({
        contract,
        description,
        etherscan,
        image,
        name,
        opensea,
        route,
        curator: sample,
        tracks: tapeTracks,
      });
    },
  }),
});

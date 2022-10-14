import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { doc, getDoc } from 'firebase/firestore';
import { TapeAndTrackData, AllTapes, TrackArtistMetadata, ArtistMapping, CuratorMetadata } from '@/models/common';
import { artistMapping } from '@/utils';
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
    async getHedsTapes() {
      const docRef = doc(db, 'tapes', 'hedstape');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.setAllTapes(docSnap.data());
      }
    },
    // async getCurrentTape([allTapes, allArtists, space, tape, id]: [AllTapes, ArtistMapping, string, string, string]) {
    //   const curator: TrackArtistMetadata | CuratorMetadata = artistMapping([[allTapes[id].curator], allArtists, space, tape, id, true])[0];
    //   const tracks: Array<TrackArtistMetadata> = artistMapping([allTapes[id].tracks, allArtists, space, tape, id, false]);
    //   this.setCurrentTape({ ...allTapes[id], curator, tracks });
    // },
  }),
  selectors: (slice) => ({
    getTapeDataForOwnership() {
      return slice((tapeData: TapeState) => {
        if (tapeData?.allTapes) {
          return (
            Object.values(tapeData.allTapes)
              .filter((tape) => tape?.contract?.length)
              .reduce((acc, cur) => ({ ...acc, [cur.contract]: { image: cur.image, name: cur.name } }), {}) || {}
          );
        }
      });
    },
  }),
});

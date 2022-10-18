import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { doc, getDoc } from 'firebase/firestore';
import { TapeAndTrackData, AllTapes, HedsTapes, CollabTapes } from '@/models/common';
import { artistMapping } from '@/utils';
import { db } from '@/App';

export interface TapeState {
  allTapes: AllTapes;
  tapeTypes: Array<string>;
  currentTape: TapeAndTrackData;
  hedsTapes: HedsTapes;
  collabTapes: CollabTapes;
}

export const tapesModel = createModel<RootModel>()({
  state: {} as TapeState,
  reducers: {
    setAllTapes: (state, allTapes) => ({ ...state, allTapes }),
    setTapeTypes: (state, tapeTypes) => ({ ...state, tapeTypes }),
    setHedsTapes: (state, hedsTapes) => ({ ...state, hedsTapes }),
    setCollabTapes: (state, collabTapes) => ({ ...state, collabTapes }),
    setCurrentTape: (state, currentTape) => ({ ...state, currentTape }),
  },
  effects: () => ({
    async getHedsTapes() {
      const docRef = doc(db, 'tapes', 'hedstape');
      const docSnap = await getDoc(docRef);
      docSnap.exists() ? this.setHedsTapes(docSnap.data()) : null;
    },
    async getCollabTapes() {
      const docRef = doc(db, 'tapes', 'collabtape');
      const docSnap = await getDoc(docRef);
      docSnap.exists() ? this.setCollabTapes(docSnap.data()) : null;
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

import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { doc, getDoc } from 'firebase/firestore';
import { TapeAndTrackData, AllTapes, HedsTapes, CollabTapes, ArtistMapping, TapeData } from '@/models/common';
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
    async getHedsTapeArtists([hedsTape, artistMapping]: [TapeData, ArtistMapping]) {
      const artistAddresses = [hedsTape?.curator, ...hedsTape?.tracks];
      const populatedArtists = artistAddresses.map((address: string) => artistMapping[address]);
      this.setCurrentTape({ ...hedsTape, curator: populatedArtists.shift(), tracks: populatedArtists });
    },
    // async getCollabTapeTracks() {},
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

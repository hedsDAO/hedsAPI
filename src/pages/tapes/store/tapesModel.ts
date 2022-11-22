import { TrackMetadata } from './../../../models/common';
import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { doc, getDoc } from 'firebase/firestore';
import { TapeAndTrackData, AllTapes, HedsTapes, CollabTapes, ArtistMapping, TapeData, User, Timeline } from '@/models/common';
import { db } from '@/App';

export interface TapeState {
  allTapes: AllTapes;
  tapeTypes: Array<string>;
  currentTape: TapeAndTrackData;
  hedsTapes: HedsTapes;
  collabTapes: CollabTapes;
  currentCollabTape: TapeAndTrackData;
  latestCollabTape: TapeAndTrackData;
  spaceTapeId: [string, string, string];
}

export const tapesModel = createModel<RootModel>()({
  state: {} as TapeState,
  selectors: (slice, createSelector, hasProps) => ({
    // Selectors for Space, Tape, and Id
    selectCurrentTapeSpaceTapeId() {
      return slice((tapesModel) => tapesModel?.spaceTapeId || ['heds', '', '']);
    },
    selectCurrentTapeSpace() {
      return slice((tapesModel) => tapesModel?.spaceTapeId?.[0] || 'heds');
    },
    selectCurrentTapeTape() {
      return slice((tapesModel) => tapesModel?.spaceTapeId?.[1]);
    },
    selectCurrentTapeId() {
      return slice((tapesModel) => tapesModel?.spaceTapeId?.[2]);
    },
    // Current Tape Data
    selectCurrentTape() {
      return slice((tapesModel) => tapesModel?.currentTape);
    },
    selectCurrentTapeBpm() {
      return createSelector(this.selectCurrentTape, (tape): number => tape.bpm || 0);
    },
    selectCurrentTapeCurator() {
      return createSelector(this.selectCurrentTape, (tape): User => tape.curator);
    },
    selectCurrentTapeTimeline() {
      return createSelector(this.selectCurrentTape, (tape): Timeline => tape.timeline);
    },
    selectCurrentTapeName() {
      return createSelector(this.selectCurrentTape, (tape): string => tape.name || '');
    },
    selectCurrentTapeDescription() {
      return createSelector(this.selectCurrentTape, (tape): string => tape.description || '');
    },
    selectCurrentTapeCover() {
      return createSelector(this.selectCurrentTape, (tape): string => tape.image || '');
    },
    selectCurrentTapeEtherscanLink() {
      return createSelector(this.selectCurrentTape, (tape): string => tape.etherscan || '');
    },
    selectCurrentTapeOpenseaLink() {
      return createSelector(this.selectCurrentTape, (tape): string => tape.opensea || '');
    },
    selectCurrentTapeContract() {
      return createSelector(this.selectCurrentTape, (tape): string => tape.contract || '');
    },
    selectCurrentTapeTracks() {
      return createSelector(this.selectCurrentTape, (tape): Array<User> => tape.tracks || []);
    },

    // HedsTape Data
    selectHedsTapeById: hasProps(function (models, id) {
      return slice((tapesModel) => tapesModel.hedsTapes?.[id]);
    }),
    selectHedstapeByNameById: hasProps(function (models, id) {
      return slice((tapesModel) => tapesModel.hedsTapes?.[id]?.name);
    }),
    selectHedstapeByCoverById: hasProps(function (models, id) {
      return slice((tapesModel) => tapesModel.hedsTapes?.[id]?.image);
    }),
    selectLatestHedsTape() {
      return slice((tapesModel): TapeData => {
        const lastIndex = [Object.keys(tapesModel.hedsTapes)?.length - 1].toString();
        return tapesModel.hedsTapes?.[lastIndex];
      });
    },

    // CollabTape Data
    selectCurrentCollabTape() {
      return slice((collabModel) => collabModel?.currentCollabTape);
    },
    selectLatestCollabTape() {
      return slice((collabModel) => collabModel?.latestCollabTape);
    },
    // Current CollabTape
    selectCurrentCollabTapeCurator() {
      return createSelector(this.selectCurrentCollabTape, (tape): User => tape.curator);
    },
    selectCurrentCollabTapeName() {
      return createSelector(this.selectCurrentCollabTape, (tape): string => tape.name || '');
    },
    selectCurrentCollabTapeDescription() {
      return createSelector(this.selectCurrentCollabTape, (tape): string => tape.description || '');
    },
    selectCurrentCollabTapeCover() {
      return createSelector(this.selectCurrentCollabTape, (tape): string => tape.image || '');
    },
    selectCurrentCollabTapeEtherscanLink() {
      return createSelector(this.selectCurrentCollabTape, (tape): string => tape.etherscan || '');
    },
    selectCurrentCollabTapeOpenseaLink() {
      return createSelector(this.selectCurrentCollabTape, (tape): string => tape.opensea || '');
    },
    selectCurrentCollabTapeContract() {
      return createSelector(this.selectCurrentCollabTape, (tape): string => tape.contract || '');
    },
    selectCurrentCollabTapeTracks() {
      return createSelector(this.selectCurrentCollabTape, (tape): User[] => tape.tracks || []);
    },
    selectCurrentCollabTapeTimeline() {
      return createSelector(this.selectCurrentCollabTape, (tape): Timeline => tape.timeline);
    },
    // Global
    selectAllHedsTapes() {
      return slice((tapesModel) => tapesModel.hedsTapes);
    },
    selectAllCollabTapes() {
      return slice((tapesModel) => tapesModel.collabTapes);
    },
  }),
  reducers: {
    setAllTapes: (state, allTapes) => ({ ...state, allTapes }),
    setTapeTypes: (state, tapeTypes) => ({ ...state, tapeTypes }),
    setHedsTapes: (state, hedsTapes) => ({ ...state, hedsTapes }),
    setCollabTapes: (state, collabTapes: CollabTapes) => ({ ...state, collabTapes }),
    setCurrentCollabTape: (state, currentCollabTape) => ({ ...state, currentCollabTape }),
    setLatestCollabTape: (state, latestCollabTape) => ({ ...state, latestCollabTape }),
    setCurrentTape: (state, currentTape) => ({ ...state, currentTape }),
    setSpaceTapeId: (state, [space, tape, id]: [string, string, string]) => ({ ...state, spaceTapeId: [space, tape, id] }),
  },
  effects: (dispatch) => ({
    async getHedsTapes() {
      const docRef = doc(db, 'tapes', 'hedstape');
      const docSnap = await getDoc(docRef);
      docSnap.exists() ? this.setHedsTapes(docSnap.data()) : null;
    },
    async getCollabTapes() {
      const docRef = doc(db, 'tapes', 'collabtape');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const latestCollabTape = Object.values(docSnap.data())[Object.keys(docSnap.data()).length - 1];
        this.setCollabTapes(docSnap.data());
        this.setLatestCollabTape(latestCollabTape);
      }
    },
    async getHedsTapeArtists([hedsTape, artistMapping]: [TapeData, ArtistMapping]) {
      if (hedsTape?.tracks?.length) {
        const artistAddresses = [hedsTape?.curator, ...hedsTape?.tracks];
        const populatedArtists = artistAddresses.map((address: string) => artistMapping[address]);
        this.setCurrentTape({ ...hedsTape, curator: populatedArtists.shift(), tracks: populatedArtists });
      } else {
        const curator = artistMapping[hedsTape?.curator];
        this.setCurrentTape({ ...hedsTape, curator: curator, tracks: [] });
      }
    },
  }),
});

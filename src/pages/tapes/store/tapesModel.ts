import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { collection, DocumentData, getDocs, query } from 'firebase/firestore';
import { TapeAndTrackData, AllTapes, ArtistMapping, TapeData, User, Timeline } from '@/models/common';
import { db } from '@/App';

export interface TapeState {
  allTapes: AllTapes;
  currentTape: TapeAndTrackData;
  spaceTapeId: [string, string, string];
}

export const tapesModel = createModel<RootModel>()({
  state: {} as TapeState,
  selectors: (slice, createSelector, hasProps) => ({
    // Current Tape Selectors
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
    selectCurrentTapeId() {
      return createSelector(this.selectCurrentTape, (tape): string => tape.id);
    },

    // Global
    selectAllHedsTapes() {
      return slice((tapesModel) => tapesModel.allTapes?.hedstape);
    },
    selectAllCollabTapes() {
      return slice((tapesModel) => tapesModel.allTapes?.collabtape);
    },
    selectAllTapes() {
      return slice((tapesModel) => tapesModel.allTapes);
    },
    selectAllTapeData() {
      return slice((tapesModel) => [...Object.values?.(tapesModel?.allTapes?.hedstape), ...Object.values?.(tapesModel?.allTapes?.collabtape)]);
    },
    selectCurrentTapeSpaceTapeId() {
      return slice((tapesModel) => tapesModel?.spaceTapeId || ['heds', '', '']);
    },
  }),
  reducers: {
    setAllTapes: (state, allTapes) => ({ ...state, allTapes }),
    setCurrentTape: (state, currentTape) => ({ ...state, currentTape }),
    setSpaceTapeId: (state, [space, tape, id]: [string, string, string]) => ({ ...state, spaceTapeId: [space, tape, id] }),
  },
  effects: () => ({
    async getAllTapes() {
      const tapeSnap = await getDocs(query(collection(db, 'tapes')));
      const allTapesTank: { [key: string]: DocumentData } = {};
      tapeSnap.forEach((tape) => (allTapesTank[tape.id] = tape.data()));
      this.setAllTapes(allTapesTank);
    },
    async getTapeArtists([tape, artistMapping]: [TapeData, ArtistMapping]) {
      if (tape?.tracks?.length && artistMapping) {
        const artistAddresses = [...tape.tracks];
        const curatorData = artistMapping[tape.curator];
        const artistsData = artistAddresses.map((address: string) => artistMapping[address]);
        const currentTape: TapeAndTrackData = { ...tape, curator: curatorData, tracks: artistsData };
        this.setCurrentTape(currentTape);
      }
    },
  }),
});

import { User, Timeline } from './../../../models/common';
import type { RootModel } from '@/models';
import { collection, doc, DocumentData, documentId, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/App';
import { AllTapes, TapeAndTrackData, TapeData } from '@/models/common';
import { createModel } from '@rematch/core';
import { isEmpty } from '@/utils';
import { DateTime } from 'luxon';

export enum TapesTab {
  HEDSTAPE = 0,
  COLLABTAPE,
}

export interface TapesState {
  allTapes: AllTapes;
  currentTab: TapesTab;
  tapeTabs: string[];
  currentTape: TapeAndTrackData;
  spaceTapeId: [string, string, string];
}

export const tapesModel = createModel<RootModel>()({
  state: {
    currentTab: TapesTab.HEDSTAPE,
    tapeTabs: ['hedsTAPE', 'collabTAPE'],
  } as TapesState,
  reducers: {
    setAllTapes: (state, allTapes) => ({ ...state, allTapes }),
    setIsOpen: (state, isOpen: boolean) => ({ ...state, isOpen }),
    setCurrentTab: (state, currentTab: TapesTab) => ({ ...state, currentTab }),
    setCurrentTape: (state, currentTape: TapeAndTrackData) => ({ ...state, currentTape }),
    setSpaceTapeId: (state, spaceTapeId: [string, string, string]) => ({ ...state, spaceTapeId }),
  },
  selectors: (slice, createSelector, hasProps) => ({
    selectSpaceTapeId() {
      return slice((tapesModel): [string, string, string] => tapesModel?.spaceTapeId);
    },
    selectAllTapes() {
      return slice((tapesModel) => tapesModel.allTapes);
    },
    selectAllHedsTapes() {
      return slice((tapesModel) => tapesModel?.allTapes?.['hedstape']);
    },
    selectAllCollabTapes() {
      return slice((tapesModel) => tapesModel?.allTapes?.['collabtape']);
    },
    selectAllTapeData() {
      return slice((tapesModel) => {
        if (!isEmpty(tapesModel?.allTapes)) return [...Object.values?.(tapesModel?.allTapes?.hedstape), ...Object.values?.(tapesModel?.allTapes?.collabtape)];
      });
    },
    selectTapeTabs() {
      return slice((tapesModel) => tapesModel.tapeTabs);
    },
    selectCurrentTab() {
      return slice((tapesModel) => tapesModel.currentTab);
    },
    selectLatestHedsTape() {
      return slice((tapesModel) => {
        const allHedstapes = tapesModel?.allTapes?.hedstape;
        if (isEmpty(allHedstapes)) return null;
        else {
          const latestTapeId = Object.keys(allHedstapes)?.sort((a, b) => +b - +a)[0];
          return allHedstapes[latestTapeId];
        }
      });
    },
    selectIsTapeVoteCompleteBySpaceTapeId: hasProps(function (models, [space, tape, id]) {
      return slice((tapesModel) => {
        const currentTape = tapesModel?.allTapes?.[tape]?.[id];
        const now = DateTime.now().setZone('utc').toMillis();
        if (currentTape?.timeline?.vote?.end < now) return true;
        else return false;
      });
    }),
    selectCurrentVoteTape: hasProps(function (models, [tape, id]) {
      return slice((tapesModel) => tapesModel?.allTapes?.[tape]?.[id]);
    }),

    // const now = DateTime.now().setZone('utc').toMillis();

    selectCurrentTape() {
      return slice((tapesModel) => tapesModel.currentTape);
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
    selectCurrentTapePreMintStatus() {
      return createSelector(this.selectCurrentTape, (tape): boolean => {
        const now = DateTime.now().setZone('utc').toMillis();
        if (now > tape.timeline?.premint?.start && now < tape.timeline?.premint?.end) return true;
        else return false;
      });
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
  }),
  effects: () => ({
    async getAllTapes() {
      const tapeSnap = await getDocs(query(collection(db, 'tapes')));
      const allTapesTank: { [key: string]: DocumentData } = {};
      tapeSnap.forEach((tape) => (allTapesTank[tape.id] = tape.data()));
      this.setAllTapes(allTapesTank);
    },
    async getTapeArtists([tape]: [TapeData]) {
      if (tape?.tracks && tape?.video) {
        const artistAddresses = [...tape?.tracks];
        const { space, tape: tapeName, id } = tape;
        if (artistAddresses?.length) {
          const tracksTank: DocumentData[] = [];
          const curatorRef = doc(db, 'users', tape.curator);
          const tracksRef = query(collection(db, 'users'), where(documentId(), 'in', artistAddresses));
          const curatorSnap = await getDoc(curatorRef);
          const tracksSnapshot = await getDocs(tracksRef);
          tracksSnapshot.forEach((doc) => tracksTank.push(doc.data()));
          tracksTank.sort((a, b) => a.tracks[space][tapeName][id].no - b.tracks[space][tapeName][id].no);
          if (curatorSnap.exists()) this.setCurrentTape({ ...tape, curator: curatorSnap.data(), tracks: tracksTank });
          return;
        }
      } else if (tape?.id === 'secretgarden') {
        const curatorRef = doc(db, 'users', tape.curator);
        const curatorSnap = await getDoc(curatorRef);
        if (curatorSnap.exists()) this.setCurrentTape({ ...tape, curator: curatorSnap.data() });
      }
    },
    async getTapeCurator([tape]: [TapeData]) {
      const curatorRef = doc(db, 'users', tape.curator);
      const curatorSnap = await getDoc(curatorRef);
      if (curatorSnap.exists()) this.setCurrentTape({ ...tape, curator: curatorSnap.data() });
    },
  }),
});

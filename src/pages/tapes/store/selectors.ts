import { createSelector } from 'reselect';
import { RootState } from '@/store';
import { TapeData } from '@models/common';

// Space, Tape, Id
export const selectCurrentTapeSpace = (state: RootState) => state.tapesModel?.spaceTapeId?.[0] || 'heds';
export const selectCurrentTapeTape = (state: RootState) => state.tapesModel?.spaceTapeId?.[1];
export const selectCurrentTapeId = (state: RootState) => state.tapesModel?.spaceTapeId?.[2];
export const selectSpaceTapeId = (state: RootState) => state.tapesModel.spaceTapeId || ['', '', ''];

// Current Tape Data
export const selectHedsTapeById = (state: RootState, id: string) => state.tapesModel?.hedsTapes?.[id];
export const selectCurrentTape = (state: RootState) => state.tapesModel?.currentTape;
export const selectCurrentTapeBpm = (state: RootState) => state.tapesModel?.currentTape?.bpm || 0;
export const selectCurrentTapeCurator = (state: RootState) => state.tapesModel?.currentTape?.curator;
export const selectCurrentTapeTimeline = (state: RootState) => state.tapesModel?.currentTape?.timeline;
export const selectCurrentTapeName = (state: RootState) => state.tapesModel?.currentTape?.name || '';
export const selectCurrentTapeDescription = (state: RootState) => state.tapesModel?.currentTape?.description || '';
export const selectCurrentTapeCover = (state: RootState) => state.tapesModel?.currentTape?.image || '';
export const selectCurrentTapeEtherscanLink = (state: RootState) => state.tapesModel?.currentTape?.etherscan || '';
export const selectCurrentTapeOpenSeaLink = (state: RootState) => state.tapesModel?.currentTape?.opensea || '';
export const selectCurrentTapeTracks = (state: RootState) => state.tapesModel?.currentTape?.tracks || [];

// Global
export const selectAllHedsTapes = (state: RootState): { [key: string]: TapeData } => state.tapesModel.allTapes || {};
const selectAllTapes = createSelector(selectAllHedsTapes, (hedsTapes) => ({ ...hedsTapes }));

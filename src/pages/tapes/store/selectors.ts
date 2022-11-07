import { createSelector } from 'reselect';
import { RootState } from '@/store';
import { TapeData } from '@models/common';

export const selectSpaceTapeId = (state: RootState) => state.tapesModel.spaceTapeId || ['', '', ''];
export const selectCurrentTapeBpm = (state: RootState) => state.tapesModel?.currentTape?.bpm || 0;
export const selectCurrentTapeCurator = (state: RootState) => state.tapesModel?.currentTape?.curator;
export const selectCurrentTapeTimeline = (state: RootState) => state.tapesModel?.currentTape?.timeline;
export const selectCurrentTapeName = (state: RootState) => state.tapesModel?.currentTape?.name || '';
export const selectCurrentTapeDescription = (state: RootState) => state.tapesModel?.currentTape?.description || '';
export const selectCurrentTapeCover = (state: RootState) => state.tapesModel?.currentTape?.image || '';
export const selectCurrentTapeEtherscanLink = (state: RootState) => state.tapesModel?.currentTape?.etherscan || '';
export const selectCurrentTapeOpenSeaLink = (state: RootState) => state.tapesModel?.currentTape?.opensea || '';
export const selectCurrentTapeTracks = (state: RootState) => state.tapesModel?.currentTape?.tracks || [];
export const selectAllHedsTapes = (state: RootState): { [key: string]: TapeData } => state.tapesModel.allTapes || {};
const selectAllTapes = createSelector(selectAllHedsTapes, (hedsTapes) => ({ ...hedsTapes }));

import { createSelector } from 'reselect';
import { RootState } from '@/store';
import { TapeData } from '@models/common';

export const selectAllHedsTapes = (state: RootState): { [key: string]: TapeData } => state.tapesModel.allTapes?.hedstape || {};

const selectAllCollabTapes = (state: RootState): { [key: string]: TapeData } => state.tapesModel.allTapes?.collabtape || {};

const selectAllTapes = createSelector(selectAllHedsTapes, selectAllCollabTapes, (hedsTapes, collabTapes) => ({
  ...hedsTapes,
  ...collabTapes,
}));

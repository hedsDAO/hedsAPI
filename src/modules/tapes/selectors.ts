import { createSelector } from 'reselect';
import { RootState } from '@/store';

const selectAllHedsTapes = (state: RootState) => state.tapesModel.allTapes?.hedstape;

const selectAllCollabTapes = (state: RootState) => state.tapesModel.allTapes?.collabtape;

export const selectAllTapes = createSelector(selectAllHedsTapes, selectAllCollabTapes, (hedsTapes, collabTapes) => ({
  ...hedsTapes,
  ...collabTapes,
}));

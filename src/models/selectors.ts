import { createSelector } from 'reselect';
import { RootState } from '@/store';

export const selectUserSubmissionsOnHedsTapes = (state: RootState) => state.userModel.submissions?.heds?.hedstape || {};

const selectAllHedsTapes = (state: RootState) => state.tapesModel.allTapes?.hedstape;

const selectAllCollabTapes = (state: RootState) => state.tapesModel.allTapes?.collabtape;

const selectAllTapes = createSelector(selectAllHedsTapes, selectAllCollabTapes, (hedsTapes, collabTapes) => ({
  ...hedsTapes,
  ...collabTapes,
}));

// Currently only grabbing heds tapes from user submissions (not collabs yet)
export const selectUserFeaturedSubmissions = createSelector(selectUserSubmissionsOnHedsTapes, selectAllTapes, (userSubmissions, allTapes) => {
  return Object.keys(userSubmissions).reduce((acc, curr) => ({ ...acc, [curr]: allTapes[curr] }), {});
});

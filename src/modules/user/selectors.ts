import { RootState } from '@/store';
import { createSelector } from 'reselect';
import { selectAllHedsTapes } from '@/modules/tapes/selectors';
import { TrackMetadata } from '@models/common';

export const selectUserData = (state: RootState) => state.userModel;

export const selectUserDataLoading = (state: RootState) => state.loading.models.userModel;

const selectUserSubmissionsOnHedsTapes = (state: RootState): { [key: string]: TrackMetadata } => state.userModel.submissions?.heds?.hedstape || {};

// Currently only grabbing heds tapes from user submissions (not collabs yet)
export const selectUserFeaturedSubmissions = createSelector(selectUserSubmissionsOnHedsTapes, selectAllHedsTapes, (userSubmissions, allTapes) => {
  return Object.keys(userSubmissions).reduce((acc, curr) => ({ ...acc, [curr]: allTapes[curr] }), {});
});

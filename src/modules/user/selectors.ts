import { RootState } from '@/store';
import { createSelector } from 'reselect';
import { selectAllTapes } from '@/modules/tapes/selectors';

export const selectUserData = (state: RootState) => state.userModel;

export const selectUserDataLoading = (state: RootState) => state.loading.models.userModel;

export const selectUserSubmissionsOnHedsTapes = (state: RootState) => state.userModel.submissions?.heds?.hedstape || {};

// Currently only grabbing heds tapes from user submissions (not collabs yet)
export const selectUserFeaturedSubmissions = createSelector(selectUserSubmissionsOnHedsTapes, selectAllTapes, (userSubmissions, allTapes) => {
  return Object.keys(userSubmissions).reduce((acc, curr) => ({ ...acc, [curr]: allTapes[curr] }), {});
});

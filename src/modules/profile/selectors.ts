import { RootState } from '@/store';
import { createSelector } from 'reselect';
import { selectAllTapes } from '@/modules/tapes/selectors';

export const selectProfileData = (state: RootState) => state.profileModel;

export const selectProfileDataLoading = (state: RootState) => state.loading.models.profileModel;

export const selectUserSubmissionsOnHedsTapes = (state: RootState) => state.profileModel.submissions?.heds?.hedstape || {};

// Currently only grabbing heds tapes from user submissions (not collabs yet)
export const selectUserFeaturedSubmissions = createSelector(selectUserSubmissionsOnHedsTapes, selectAllTapes, (userSubmissions, allTapes) => {
  return Object.keys(userSubmissions).reduce((acc, curr) => ({ ...acc, [curr]: allTapes[curr] }), {});
});

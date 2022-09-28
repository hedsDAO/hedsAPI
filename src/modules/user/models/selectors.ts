import { RootState } from '@/store';
import { createSelector } from 'reselect';
import { selectAllHedsTapes } from '@/modules/tapes/selectors';
import { TrackMetadata } from '@models/common';

export const selectUserData = (state: RootState) => state.userModel;

export const selectUserDataLoading = (state: RootState) => state.loading.models.userModel;

export const selectUserSubmissionsOnHedsTapes = (state: RootState): { [key: string]: TrackMetadata } => state.userModel.submissions?.heds?.hedstape || {};

const selectUserTracksOnHedsTapes = (state: RootState): { [key: string]: TrackMetadata } => state.userModel.tracks?.heds?.hedstape || {};

export const selectUserFeaturedTracks = createSelector(selectUserTracksOnHedsTapes, selectAllHedsTapes, (userTracks, allTapes) => {
  return Object.keys(userTracks).reduce((acc, curr) => ({ ...acc, [curr]: allTapes[curr] }), {});
});

export const selectPublicUserProfile = (state: RootState): boolean => state.userModel.public;

import { RootState } from '@/store';

export const selectProfileData = (state: RootState) => state.profileModel;

export const selectProfileDataLoading = (state: RootState) => state.loading.models.profileModel;

export const selectUserSubmissionsOnHedsTapes = (state: RootState) => state.profileModel.submissions?.heds?.hedstape || {};

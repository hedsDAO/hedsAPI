import { RootState } from '@/store';

export const selectUserSubmissions = (state: RootState) => state.userModel.submissions?.heds?.hedstape || {};
export const selectUserBadges = (state: RootState) => state.userModel.badges || [];
export const selectUserTracks = (state: RootState) => state.userModel.tracks?.heds?.hedstape || {};
export const selectUserSamples = (state: RootState) => state.userModel.samples?.heds?.hedstape || {};
export const selectUserDisplayName = (state: RootState) => state.userModel.displayName || '';
export const selectUserBanner = (state: RootState) => state.userModel.banner || '';
export const selectUserWallet = (state: RootState) => state.userModel.wallet || '';
export const selectUserDescription = (state: RootState) => state.userModel.description || '';
export const selectUserTwitterHandle = (state: RootState) => state.userModel.twitterHandle || '';
export const selectUserCollection = (state: RootState) => state.userModel.collection || {};
export const selectUserSubmissionsBySpaceTapeId = (state: RootState, [space, tape, id]: [string, string, string]) =>
  state.userModel?.submissions?.[space]?.[tape]?.[id];

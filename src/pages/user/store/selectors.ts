import { RootState } from '@/store';

export const selectUserSubmissions = (state: RootState) => state.userModel.connectedUser.submissions?.heds?.hedstape || {};
export const selectUserBadges = (state: RootState) => state.userModel.connectedUser.badges || [];
export const selectUserTracks = (state: RootState) => state.userModel.connectedUser.tracks?.heds?.hedstape || {};
export const selectUserSamples = (state: RootState) => state.userModel.connectedUser.samples?.heds?.hedstape || {};
export const selectUserDisplayName = (state: RootState) => state.userModel.connectedUser.displayName || '';
export const selectUserBanner = (state: RootState) => state.userModel.connectedUser.banner || '';
export const selectUserWallet = (state: RootState) => state.userModel.connectedUser.wallet || '';
export const selectUserDescription = (state: RootState) => state.userModel.connectedUser.description || '';
export const selectUserTwitterHandle = (state: RootState) => state.userModel.connectedUser.twitterHandle || '';
export const selectUserCollection = (state: RootState) => state.userModel.connectedUser.collection || {};
export const selectUserSubmissionsBySpaceTapeId = (state: RootState, [space, tape, id]: [string, string, string]) =>
  state.userModel?.connectedUser.submissions?.[space]?.[tape]?.[id];

import { RootState } from '@/store';

export const selectProfileTwitterHandle = (state: RootState) => state.profileModel?.twitterHandle || '';
export const selectProfileWallet = (state: RootState) => state.profileModel?.wallet || '';
export const selectProfileDisplayName = (state: RootState) => state.profileModel?.displayName || '';
export const selectProfileSubmissionsBySpaceTapeId = (state: RootState, [space, tape, id]: [string, string, string]) =>
  state.profileModel?.submissions?.[space]?.[tape]?.[id];

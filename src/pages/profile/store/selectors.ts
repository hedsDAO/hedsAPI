import { RootState } from '@/store';

export const selectProfileTwitterHandle = (state: RootState) => state.profileModel?.twitterHandle || '';
export const selectProfileWallet = (state: RootState) => state.profileModel?.wallet || '';

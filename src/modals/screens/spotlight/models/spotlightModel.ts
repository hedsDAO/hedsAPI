import { getSongByHash } from '@/api/song';
import { updateUser } from '@/api/user';
import { SongHitProps } from '@/components/Search/models/common';
import * as constants from '@/modals/screens/spotlight/models/constants';
import { Song } from '@/models/common';
import { createModel } from '@rematch/core';
import { SpotlightSearchState, SpotlightState, SpotlightSteps } from './common';

import type { RootModel } from '@/models';
export const spotlightModel = createModel<RootModel>()({
  state: {
    currentStep: SpotlightSteps.SEARCH,
    searchState: { ...constants.emptySearchState },
  } as SpotlightState,
  reducers: {
    setCurrentStep: (state, currentStep: SpotlightSteps) => ({ ...state, currentStep }),
    setSpotlightTrack: (state, spotlightTrack: Song) => ({ ...state, spotlightTrack }),
    setSpotlightSearchState: (state, searchState: SpotlightSearchState) => ({ ...state, searchState }),
    setUserId: (state, userId: number) => ({ ...state, userId }),
    setSearchSongHits: (state, songHits: SongHitProps[]) => ({ ...state, searchState: { ...state.searchState, songHits } }),
    setSearchQuery: (state, query: string) => ({ ...state, searchState: { ...state.searchState, query } }),
    setSearchIsSearchOpen: (state, isSearchOpen: boolean) => ({ ...state, searchState: { ...state.searchState, isSearchOpen } }),
    setSpotlightId: (state, spotlightId: string) => ({ ...state, spotlightId }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setError: (state, error: boolean) => ({ ...state, error }),
    clearSearchState: (state) => ({ ...state, searchState: { ...state.searchState, query: '', searchState: constants.emptySearchState } }),
    clearState: () => null,
  },
  selectors: (slice) => ({
    selectState: () => slice((state) => state),
    selectSearchSongHits: () => slice((state) => state?.searchState?.songHits),
    selectSearchQuery: () => slice((state) => state?.searchState?.query),
    selectSearchIsSearchOpen: () => slice((state) => state?.searchState?.isSearchOpen),
    selectSpotlightTrack: () => slice((state) => state?.spotlightTrack),
    selectSpotlightSearchState: () => slice((state) => state?.searchState),
    selectCurrentStep: () => slice((state) => state?.currentStep),
    selectUserId: () => slice((state) => state?.userId),
    selectSpotlightId: () => slice((state) => state.spotlightId),
    selectIsLoading: () => slice((state) => state.isLoading),
    selectError: () => slice((state) => state.error),
  }),
  effects: (dispatch) => ({
    async getSpotlightSong(spotlightId: string) {
      try {
        const response = await getSongByHash(spotlightId);
        this.setSpotlightTrack(response.data);
      } catch (error: any) {
        console.log(error);
      }
    },
    async updateUserSpotlight([userId, wallet, spotlightId]: [number, string, string | null]) {
      const updatedUserData = {
        spotlight: spotlightId,
      };
      try {
        await updateUser(userId, updatedUserData);
        dispatch.authModel.getUser(wallet);
        dispatch.userModel.getUser(wallet);
        if (spotlightId !== null) this.clearState();
        else {
          this.clearSearchState();
          this.setCurrentStep(SpotlightSteps.SEARCH);
        }
      } catch (error) {
        console.log(error);
      }
    },
  }),
});

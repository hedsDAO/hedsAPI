import type { RootModel } from '@/models';
import { User } from '@/models/common';
import { ArtistModelState } from '@pages/artists/models/common';
import { createModel } from '@rematch/core';

export const artistsModel = createModel<RootModel>()({
  state: {} as ArtistModelState,
  reducers: {
    setState: (state, newState) => ({ ...state, ...newState }),
    setArtists: (state, artists: User[]) => ({ ...state, artists }),
    setCurators: (state, curators: User[]) => ({ ...state, curators }),
    clearState: () => ({} as ArtistModelState),
  },
  selectors: (slice) => ({
    selectArtists: () => slice((state) => state.artists),
    selectCurators: () => slice((state) => state.curators),
  }),
  effects: () => ({
    async getArtistsAndCurators() {
      // add get call to get all artist and curators and set them in state
    },
  }),
});

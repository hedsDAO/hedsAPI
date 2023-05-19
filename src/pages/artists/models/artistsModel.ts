import { getArtistsAndCurators } from '@/api/user';
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
      try {
        const response = await getArtistsAndCurators();
        const sortedArtists = response.data.artists.sort(function (a: any, b: any) {
          var textA = a.display_name.toUpperCase();
          var textB = b.display_name.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        this.setArtists(sortedArtists);
        this.setCurators(response.data.curators);
      } catch (error: any) {
        console.log(error);
      }
    },
  }),
});

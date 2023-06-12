import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { ArtistHitProps, SearchModelState, SearchProps, SongHitProps, TapeHitProps } from './common';

export const searchModel = createModel<RootModel>()({
  state: {
    query: '',
    searchState: { indices: {}, page: 1, query: '' },
    searchFocus: false,
    isSearchOpen: false,
    tapeHits: [],
    songHits: [],
    artistHits: [],
  } as SearchModelState,
  reducers: {
    setSearchState: (state: SearchModelState, searchState) => ({ ...state, searchState }),
    setIsSearchOpen: (state: SearchModelState, isSearchOpen: boolean) => ({ ...state, isSearchOpen }),
    setQuery: (state: SearchModelState, query: string) => ({ ...state, query }),
    setTapeHits: (state: SearchModelState, tapeHits: TapeHitProps[]) => ({ ...state, tapeHits }),
    setSongHits: (state: SearchModelState, songHits: SongHitProps[]) => ({ ...state, songHits }),
    setArtistHits: (state: SearchModelState, artistHits: ArtistHitProps[]) => ({ ...state, artistHits }),
    clearSearchState: (_) => ({
      query: '',
      tapeHits: [],
      songHits: [],
      artistHits: [],
      searchState: { indices: {}, page: 1, query: '' },
      searchFocus: false,
      isSearchOpen: false,
    }),
  },
  selectors: (slice) => ({
    selectSearchState() {
      return slice((state) => state?.searchState);
    },
    selectSearchFocus() {
      return slice((state) => state?.searchFocus);
    },
    selectIsSearchOpen() {
      return slice((state) => state?.isSearchOpen);
    },
    selectTapeHits() {
      return slice((state) => state?.tapeHits);
    },
    selectSongHits() {
      return slice((state) => state?.songHits);
    },
    selectArtistHits() {
      return slice((state) => state?.artistHits);
    },
    selectAreAllHitsEmpty() {
      return slice((state) => state?.artistHits?.length === 0 && state?.tapeHits?.length === 0 && state?.songHits?.length === 0);
    },
    selectQuery() {
      return slice((state) => state?.query);
    },
  }),
  effects: () => ({}),
});

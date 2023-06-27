import { SpotlightSearchState } from '@/modals/screens/spotlight/models/common';

/**
 * Constants for Algolia app id and search api key
 * @constant {string} ALGOLIA_APP_ID - Algolia app id
 * @constant {string} ALGOLIA_SEARCH_API_KEY - Algolia search api key
 */

export const ALGOLIA_APP_ID = 'PKM1MNL39Z';
export const ALGOLIA_SEARCH_API_KEY = '033edca7849e111d5d4188c9a538f71e';

export const emptySearchState: SpotlightSearchState = {
  query: '',
  searchState: { indices: {}, page: 1, query: '' },
  searchFocus: false,
  isSearchOpen: false,
  songHits: [],
};

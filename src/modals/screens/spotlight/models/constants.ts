import { SpotlightSearchState } from '@/modals/screens/spotlight/models/common';

/**
 * Constants for Algolia app id and search api key
 * @constant {string} ALGOLIA_APP_ID - Algolia app id
 * @constant {string} ALGOLIA_SEARCH_API_KEY - Algolia search api key
 * @constant {string} SEARCH_INDEX - Algolia search index
 * @constant {SpotlightSearchState} emptySearchState - Empty search state
 */

export const ALGOLIA_APP_ID = 'PKM1MNL39Z';
export const ALGOLIA_SEARCH_API_KEY = '033edca7849e111d5d4188c9a538f71e';
export const SEARCH_INDEX = 'songs';
export const emptySearchState: SpotlightSearchState = {
  query: '',
  searchState: { indices: {}, page: 1, query: '' },
  searchFocus: false,
  isSearchOpen: false,
  songHits: [],
};

/**
 * @constant {string} SEARCH_PLACEHOLDER - Placeholder text for the search box
 * @constant {string} SEARCH_BUTTON_TEXT - Text for the search button
 * @constant {string} BACK_BUTTON_TEXT - Text for the back button
 * @constant {string} REPLACE_BUTTON_TEXT - Text for the replace button
 * @constant {string} SPOTLIGHT_MODAL_HEADER - Text for the spotlight modal header
 */

export const SEARCH_PLACEHOLDER = 'search the heds community for songs';
export const BACK_BUTTON_TEXT = 'Back';
export const CONFIRM_BUTTON_TEXT = 'Confirm';
export const REPLACE_BUTTON_TEXT = 'Replace';
export const SPOTLIGHT_MODAL_HEADER = 'Spotlight';

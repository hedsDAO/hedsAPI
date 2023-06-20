import { SearchModelState } from '@components/Search/models/common';

/**
 * Constants for Algolia app id and search api key
 * @constant {string} ALGOLIA_APP_ID - Algolia app id
 * @constant {string} ALGOLIA_SEARCH_API_KEY - Algolia search api key
 */
export const ALGOLIA_APP_ID = 'PKM1MNL39Z';
export const ALGOLIA_SEARCH_API_KEY = '033edca7849e111d5d4188c9a538f71e';

/**
 * Constants for Algolia indices
 * @constant {string} ARTIST_INDEX - Algolia index for artists
 * @constant {string} SONG_INDEX - Algolia index for songs
 * @constant {string} TAPE_INDEX - Algolia index for tapes
 */

export const ARTIST_INDEX = 'artists';
export const SONG_INDEX = 'songs';
export const TAPE_INDEX = 'tapes';

/**
 * Title text for hits in tapes, songs, and artists
 * @constant {string} ARTIST_HIT_TITLE - Title for artists
 * @constant {string} SONG_HIT_TITLE - Title for songs
 * @constant {string} TAPE_HIT_TITLE - Title for tapes
 */
export const ARTIST_HIT_TITLE = 'ARTISTS';
export const SONG_HIT_TITLE = 'SONGS';
export const TAPE_HIT_TITLE = 'TAPES';

/**
 * Constants for search placeholder text and hit attribute names
 * @constant {string} SEARCH_PLACHOLDER - Search placeholder text
 * @constant {string} ARTIST_HIT_ATTRIBUTE - Hit attribute name for artists
 * @constant {string} SONG_HIT_ATTRIBUTE - Hit attribute name for songs
 * @constant {string} TAPE_HIT_ATTRIBUTE - Hit attribute name for tapes
 */

export const SEARCH_PLACHOLDER = 'Search the heds community';
export const ARTIST_HIT_ATTRIBUTE = 'display_name';
export const SONG_HIT_ATTRIBUTE = 'track_name';
export const TAPE_HIT_ATTRIBUTE = 'name';

/**
 * function for handling empty search results
 * @function handleEmptySearch
 * @param {string} query - search query
 * @returns {string} - string for empty search results
 */

export const handleEmptySearch = (query: string) => {
  return `No results found for your search "${query}"`;
};

/**
 * @const {SearchModelState} emptySearchState - Default state for search model
 */

export const emptySearchState: SearchModelState = {
  query: '',
  searchState: { indices: {}, page: 1, query: '' },
  searchFocus: false,
  isSearchOpen: false,
  tapeHits: [],
  songHits: [],
  artistHits: [],
};

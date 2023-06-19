/**
 * @name SearchProps
 * @description SearchProps is the interface for the Search output from the algolia component
 * @param indices: any
 * @param page: number
 * @param query: string
 */

export interface SearchProps {
  indices?: any;
  page?: number;
  query?: string;
}

/**
 * @name SearchModelState
 * @description SearchModelState is the interface for the Search model state
 * @param {string} query - the query string for the search
 * @param {SearchProps} searchState - the search state from the algolia component
 * @param {boolean} searchFocus - whether the search is focused
 * @param {boolean} isSearchOpen - whether the search is open
 * @param {TapeHitProps[]} tapeHits - tape hits from the algolia component
 * @param {SongHitProps[]} songHits - song hits from the algolia component
 * @param {ArtistHitProps[]} artistHits - artist hits from the algolia component
 */

export interface SearchModelState {
  query: string;
  searchState: SearchProps;
  searchFocus: boolean;
  isSearchOpen: boolean;
  tapeHits: TapeHitProps[];
  songHits: SongHitProps[];
  artistHits: ArtistHitProps[];
}

/**
 * @name TapeHitsProps
 * @description TapeHitsProps is the interface for the results of tape searches
 */

export interface TapeHitProps {
  name: string;
  image: string;
  songIDs: number[];
  objectID: string;
  _highlightResult?: {
    name: {
      value: string;
      matchLevel: string;
      matchedWords: [string];
    };
  };
}

/**
 * @name SongHitsProps
 * @description SongHitsProps is the interface for the results of song searches
 */

export interface SongHitProps {
  track_name: string;
  cover: string;
  audio: string;
  _highlightResult?: {
    track_name: {
      value: string;
      matchLevel: string;
      matchedWords: [string];
    };
  };
}

/**
 * @name ArtistHitsProps
 * @description ArtistHitsProps is the interface for the results of artist searches
 */

export interface ArtistHitProps {
  display_name: string;
  profile_picture: string;
  wallet: string;
  _highlightResult?: {
    display_name: {
      value: string;
      matchLevel: string;
      matchedWords: [string];
    };
  };
}

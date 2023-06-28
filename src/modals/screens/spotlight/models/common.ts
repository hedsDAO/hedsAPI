import { SearchProps, SongHitProps } from '@/components/Search/models/common';
import { Song } from '@/models/common';

/**
 * @name SpotlightSteps
 * @description Enum for spotlight steps in the spotlight modal
 */

export enum SpotlightSteps {
  SEARCH = 0,
  CONFIRM,
  REPLACE,
}

/**
 * @interface SpotlightSearchState
 * @description Interface for the spotlight search state
 * @property {string} query - Search query
 * @property {SearchProps} searchState - Search state
 * @property {boolean} searchFocus - Search focus
 * @property {boolean} isSearchOpen - Search open
 * @property {SongHitProps[]} songHits - Song hits
 */

export interface SpotlightSearchState {
  query: string;
  searchState: SearchProps;
  searchFocus: boolean;
  isSearchOpen: boolean;
  songHits: SongHitProps[];
}

/**
 * @interface SpotlightState
 * @description Interface for the spotlight state
 * @property {SpotlightSteps} currentStep - Current step
 * @property {number} userId - User id
 * @property {string} spotlightId - Spotlight id
 * @property {Song} spotlightTrack - Spotlight track
 * @property {boolean} isLoading - Loading state
 * @property {boolean} error - Error state
 * @property {SpotlightSearchState} searchState - Search state
 */

export interface SpotlightState {
  currentStep: SpotlightSteps;
  userId: number;
  spotlightId: string;
  spotlightTrack: Song;
  isLoading: boolean;
  error: boolean;
  searchState: SpotlightSearchState;
}

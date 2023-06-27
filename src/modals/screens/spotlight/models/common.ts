import { SearchProps, SongHitProps } from '@/components/Search/models/common';
import { Song } from '@/models/common';

export enum SpotlightSteps {
  SEARCH = 0,
  CONFIRM,
  REPLACE,
}

export interface SpotlightSearchState {
  query: string;
  searchState: SearchProps;
  searchFocus: boolean;
  isSearchOpen: boolean;
  songHits: SongHitProps[];
}

export interface SpotlightState {
  currentStep: SpotlightSteps;
  userId: number;
  spotlightId: string;
  spotlightTrack: Song;
  isLoading: boolean;
  error: boolean;
  searchState: SpotlightSearchState;
}

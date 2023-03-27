import { Tape } from '@/models/common';

export interface TapeState {
  currentTape: Tape;
  navbarTabs: string[];
  currentTab: number;
}

export enum NavbarTabs {
  TRACKS = 0,
  DETAILS = 1,
}

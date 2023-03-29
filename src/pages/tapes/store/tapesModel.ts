import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';

interface TimelineStatus {
  submit: Timeline;
  mint: Timeline;
  vote: Timeline;
  premint: Timeline;
}

interface Timeline {
  start: number;
  end: number;
}

enum TapeType {
  LEGACY,
  HEDSTAPE,
  COLLABTAPE,
}

enum Market {
  OPENSEA,
  SOUND,
}

interface Links {
  opensea: string;
  etherscan: string;
  sound: string;
}

export interface TapeResponse {
  id: number;
  contract: string;
  name: string;
  description: string;
  image: string;
  proposal_id: string;
  video: string;
  bpm: number;
  tracks: number[];
  timeline: string;
  type: TapeType;
  splits: string;
  market: Market;
  links: string;
}

export interface TapeState {
  id: number | undefined;
  contract: string;
  name: string;
  description: string;
  image: string;
  proposalId: string;
  video: string;
  bpm: number | undefined;
  tracks: number[];
  timeline: TimelineStatus | undefined;
  type: TapeType | undefined;
  splits: string;
  market: Market | undefined;
  links: Links | undefined;
}

export const tapesModel = createModel<RootModel>()({
  state: {
    id: undefined,
    contract: '',
    name: '',
    description: '',
    image: '',
    proposalId: '',
    video: '',
    bpm: undefined,
    tracks: [],
    timeline: undefined,
    type: undefined,
    splits: '',
    market: undefined,
    links: undefined,
  },
});

export interface TapeState {
  contract: string;
  name: string;
  description: string;
  image: string;
  proposal_id: string;
  video: string;
  bpm: number;
  tracks: number[];
  timeline: TimelineStatus;
  type: TapeType;
  splits: string;
  market: Market;
  links: Links;
}

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

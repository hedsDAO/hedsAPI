export class TimelineDescriptions {
  premint = 'hedsTAPE holders hold access to a premint 24 hours prior to the public drop.';
  mint = 'Own the collection on-chain.';
}

export class TimelineNames {
  premint = 'Pre Mint';
  mint = 'Mint';
}

export enum TimelineSteps {
  PREMINT = 0,
  MINT,
}

export enum TimelineStatus {
  CLOSED = 0,
  OPEN,
  UPCOMING,
}

export interface TimelineItem {
  name: string;
  description: string;
  start: number;
  end: number;
  status: TimelineStatus;
}

export interface HedstapeState {
  timeline: { [key: string]: TimelineItem };
  activeStep: TimelineSteps;
}

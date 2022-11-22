export class TimelineDescriptions {
  submit = 'Download the sample and submit your track for a chance to be on the tape.';
  vote = 'Vote on your favorite anonymous tracks submitted to the tape.';
  mint = 'Own the collection on-chain. Minting is only open for 24 hours.';
}

export class TimelineNames {
  submit = 'Submit';
  vote = 'Vote';
  mint = 'Mint';
}

export enum TimelineSteps {
  SUBMIT = 0,
  VOTE,
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

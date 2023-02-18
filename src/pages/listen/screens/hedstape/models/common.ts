export class TimelineDescriptions {
  submit = 'Download the sample and submit your track for a chance to be on the tape.';
  vote = 'Vote on your favorite anonymous tracks submitted to the tape.';
  premint = 'hedsTAPE holders hold access to a premint 24 hours prior to the public drop.';
  mint = 'Own the collection on-chain. Minting is only open for 24 hours.';
}

export class TimelineNames {
  submit = 'Submit';
  vote = 'Vote';
  premint = 'Premint';
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

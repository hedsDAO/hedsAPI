import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { TapeData } from '@/models/common';
import { DateTime } from 'luxon';
import { compareTimestamps } from '@/utils';

class TimelineDescriptions {
  submit = 'Download the sample and submit your track for a chance to be on the tape.';
  vote = 'Vote on your favorite anonymous tracks submitted to the tape.';
  mint = 'Own the collection on-chain. Minting is only open for 24 hours.';
}

class TimelineNames {
  submit = 'Submit';
  vote = 'Vote';
  mint = 'Mint';
}

interface TimelineItem {
  name: string;
  description: string;
  start: number;
  end: number;
  status: string;
}

export interface HedstapeState {
  timeline: { [key: string]: TimelineItem };
}

export const hedstapeModel = createModel<RootModel>()({
  state: {} as HedstapeState,
  reducers: {
    setTapeTimeline: (state, timeline) => ({ ...state, timeline }),
    setActiveStep: (state, activeStep) => ({ ...state, activeStep }),
  },
  effects: () => ({
    async getTapeTimeline(hedsTape: TapeData) {
      const timelineTank: { [key: string]: TimelineItem } = {};
      const now = DateTime.now().setZone('utc').toMillis();
      const submitTimes = hedsTape.timeline.submit;
      const voteTimes = hedsTape.timeline.vote;
      const mintTimes = hedsTape.timeline.mint;
      const names = new TimelineNames();
      const desc = new TimelineDescriptions();
      timelineTank['submit'] = {
        name: names.submit,
        description: desc.submit,
        start: submitTimes.start,
        end: submitTimes.end,
        status: compareTimestamps(now, submitTimes.start, submitTimes.end),
      };
      timelineTank['vote'] = {
        name: names.vote,
        description: desc.vote,
        start: voteTimes.start,
        end: voteTimes.end,
        status: compareTimestamps(now, voteTimes.start, voteTimes.end),
      };
      timelineTank['mint'] = {
        name: names.mint,
        description: desc.mint,
        start: mintTimes.start,
        end: mintTimes.end,
        status: compareTimestamps(now, mintTimes.start, mintTimes.end),
      };
      return this.setTapeTimeline(timelineTank);
    },
  }),
});

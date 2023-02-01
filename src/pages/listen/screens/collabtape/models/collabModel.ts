import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { TapeAndTrackData, TapeData } from '@/models/common';
import { DateTime } from 'luxon';
import { compareTimestamps } from '@/utils';
import { HedstapeState, TimelineItem, TimelineNames, TimelineDescriptions, TimelineStatus, TimelineSteps } from './common';

export const collabModel = createModel<RootModel>()({
  state: {} as HedstapeState,
  selectors: (slice, createSelector, hasProps) => ({
    selectTapeTimeline() {
      return slice((collabModel) => collabModel.timeline);
    },
    selectPremint() {
      return createSelector(this.selectTapeTimeline, (timeline: { [key: string]: TimelineItem }) => timeline.premint);
    },
    selectMint() {
      return createSelector(this.selectTapeTimeline, (timeline: { [key: string]: TimelineItem }) => timeline.mint);
    },
  }),
  reducers: {
    setTapeTimeline: (state, timeline) => ({ ...state, timeline }),
    setActiveStep: (state, activeStep) => ({ ...state, activeStep }),
  },
  effects: () => ({
    async getTapeTimeline(collabTape: TapeAndTrackData) {
      const timelineTank: { [key: string]: TimelineItem } = {};
      const now = DateTime.now().setZone('utc').toMillis();
      const premintTimes = collabTape.timeline.premint;
      const mintTimes = collabTape.timeline.mint;
      const names = new TimelineNames();
      const desc = new TimelineDescriptions();
      timelineTank['premint'] = {
        name: names.premint,
        description: desc.premint,
        start: premintTimes.start,
        end: premintTimes.end,
        status: compareTimestamps(now, premintTimes.start, premintTimes.end),
      };
      timelineTank['mint'] = {
        name: names.mint,
        description: desc.mint,
        start: mintTimes.start,
        end: mintTimes.end,
        status: compareTimestamps(now, mintTimes.start, mintTimes.end),
      };
      for (const step in timelineTank) {
        if (timelineTank[step].status === TimelineStatus.OPEN) {
          if (timelineTank[step].name === names.premint) this.setActiveStep(TimelineSteps.PREMINT);
          if (timelineTank[step].name === names.mint) this.setActiveStep(TimelineSteps.MINT);
        } else this.setActiveStep(TimelineSteps.MINT);
      }
      return this.setTapeTimeline(timelineTank);
    },
  }),
});

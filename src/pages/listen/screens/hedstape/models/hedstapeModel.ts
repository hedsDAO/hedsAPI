import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { TapeData } from '@/models/common';
import { DateTime } from 'luxon';
import { compareTimestamps } from '@/utils';
import { HedstapeState, TimelineItem, TimelineNames, TimelineDescriptions, TimelineStatus, TimelineSteps } from './common';

export const hedstapeModel = createModel<RootModel>()({
  state: {} as HedstapeState,
  selectors: (slice, createSelector, hasProps) => ({
    selectTapeTimeline() {
      return slice((hedstapeModel) => hedstapeModel.timeline);
    },
    selectMint() {
      return createSelector(this.selectTapeTimeline, (timeline: { [key: string]: TimelineItem }) => timeline.mint);
    },
    selectSubmit() {
      return createSelector(this.selectTapeTimeline, (timeline: { [key: string]: TimelineItem }) => timeline.submit);
    },
    selectVote() {
      return createSelector(this.selectTapeTimeline, (timeline: { [key: string]: TimelineItem }) => timeline.vote);
    },
  }),
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
      for (const step in timelineTank) {
        if (timelineTank[step].status === TimelineStatus.OPEN) {
          if (timelineTank[step].name === names.mint) this.setActiveStep(TimelineSteps.MINT);
          if (timelineTank[step].name === names.vote) this.setActiveStep(TimelineSteps.VOTE);
          if (timelineTank[step].name === names.submit) this.setActiveStep(TimelineSteps.SUBMIT);
        } else this.setActiveStep(TimelineSteps.MINT);
      }
      return this.setTapeTimeline(timelineTank);
    },
  }),
});

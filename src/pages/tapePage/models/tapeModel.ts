import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';

export const tapeModel = createModel<RootModel>()({
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

import { Models } from '@rematch/core';
import { navModel } from '@/components/Nav/models/navModel';
import { songModel } from '@/pages/Song/models/songModel';

export interface RootModel extends Models<RootModel> {
  navModel: typeof navModel;
  songModel: typeof songModel;
}

export const models: RootModel = {
  navModel,
  songModel,
};

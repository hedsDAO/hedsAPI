import { Models } from '@rematch/core';
import { navModel } from '@/components/nav/models/navModel';

export interface RootModel extends Models<RootModel> {
  navModel: typeof navModel;
}

export const models: RootModel = {
  navModel,
};

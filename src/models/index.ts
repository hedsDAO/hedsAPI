import { Models } from '@rematch/core';
import { layoutModel } from './layoutModel';

export interface RootModel extends Models<RootModel> {
  layoutModel: typeof layoutModel;
}

export const models: RootModel = {
  layoutModel,
};

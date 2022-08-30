import { Models } from '@rematch/core';
import { layoutModel } from './layoutModel';
import { userModel } from './userModel';

export interface RootModel extends Models<RootModel> {
  layoutModel: typeof layoutModel;
  userModel: typeof userModel;
}

export const models: RootModel = {
  layoutModel,
  userModel,
};

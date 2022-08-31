import { Models } from '@rematch/core';
import { layoutModel } from './layoutModel';
import { userModel } from './userModel';
import { modelModel } from './modalModel';
import { alertModel } from './alertModel';

export interface RootModel extends Models<RootModel> {
  layoutModel: typeof layoutModel;
  userModel: typeof userModel;
  modelModel: typeof modelModel;
  alertModel: typeof alertModel;
}

export const models: RootModel = {
  layoutModel,
  userModel,
  modelModel,
  alertModel,
};

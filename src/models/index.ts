import { Models } from '@rematch/core';
import { layoutModel } from './layoutModel';
import { userModel } from './userModel';
import { modelModel } from './modalModel';
import { alertModel } from './alertModel';
import { profileModel } from './profileModal';
import { artistModel } from './artistModel';
import { tapesModel } from './tapesModel';
import { audioModel } from './audioModel';

export interface RootModel extends Models<RootModel> {
  layoutModel: typeof layoutModel;
  userModel: typeof userModel;
  modelModel: typeof modelModel;
  alertModel: typeof alertModel;
  profileModel: typeof profileModel;
  artistModel: typeof artistModel;
  tapesModel: typeof tapesModel;
  audioModel: typeof audioModel;
}

export const models: RootModel = {
  layoutModel,
  userModel,
  modelModel,
  profileModel,
  alertModel,
  artistModel,
  tapesModel,
  audioModel
};

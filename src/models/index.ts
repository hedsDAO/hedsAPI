import { Models } from '@rematch/core';
import { userModel } from './userModel';
import { modelModel } from './modalModel';
import { profileModel } from './profileModal';
import { artistModel } from './artistModel';
import { tapesModel } from './tapesModel';
import { audioModel } from './audioModel';

export interface RootModel extends Models<RootModel> {
  userModel: typeof userModel;
  modelModel: typeof modelModel;
  profileModel: typeof profileModel;
  artistModel: typeof artistModel;
  tapesModel: typeof tapesModel;
  audioModel: typeof audioModel;
}

export const models: RootModel = {
  userModel,
  modelModel,
  profileModel,
  artistModel,
  tapesModel,
  audioModel,
};

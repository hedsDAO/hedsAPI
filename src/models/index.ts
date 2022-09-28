import { Models } from '@rematch/core';
import { userModel } from '../modules/user/userModel';
import { modalModel } from '../modals/modalModel';
import { profileModel } from '../modules/profile/profileModel';
import { artistModel } from '../modules/artists/artistModel';
import { tapesModel } from '../modules/tapes/tapesModel';
import { audioModel } from '../modules/audio/audioModel';

export interface RootModel extends Models<RootModel> {
  userModel: typeof userModel;
  modalModel: typeof modalModel;
  profileModel: typeof profileModel;
  artistModel: typeof artistModel;
  tapesModel: typeof tapesModel;
  audioModel: typeof audioModel;
}

export const models: RootModel = {
  userModel,
  modalModel,
  profileModel,
  artistModel,
  tapesModel,
  audioModel,
};

import { Models } from '@rematch/core';
import { userModel } from '@/modules/user/models/userModel';
import { modalModel } from '@/modals/modalModel';
import { profileModel } from '@/modules/profile/models/profileModel';
import { artistModel } from '@/modules/artists/artistModel';
import { tapesModel } from '@/modules/tapes/tapesModel';
import { audioModel } from '@/modules/audio/audioModel';
import { settingsModalModel } from '@/modules/profile/models/settingsModalModel';
import { twitterModalModel } from '@/modules/profile/models/twitterModalModel';

export interface RootModel extends Models<RootModel> {
  userModel: typeof userModel;
  modalModel: typeof modalModel;
  profileModel: typeof profileModel;
  artistModel: typeof artistModel;
  tapesModel: typeof tapesModel;
  audioModel: typeof audioModel;
  settingsModalModel: typeof settingsModalModel;
  twitterModalModel: typeof twitterModalModel;
}

export const models: RootModel = {
  userModel,
  modalModel,
  profileModel,
  artistModel,
  tapesModel,
  audioModel,
  settingsModalModel,
  twitterModalModel,
};

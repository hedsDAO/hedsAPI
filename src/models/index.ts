import { Models } from '@rematch/core';
import { userModel } from '@/modules/user/models/userModel';
import { modalModel } from '@/modules/modals/global/models/modalModel';
import { profileModel } from '@/modules/profile/models/profileModel';
import { artistModel } from '@/modules/artists/artistModel';
import { tapesModel } from '@/modules/tapes/tapesModel';
import { audioModel } from '@/modules/audio/audioModel';
import { settingsModel } from '@/modules/modals/screens/settings/models/settingsModel';
import { twitterModel } from '@/modules/modals/screens/twitter/models/twitterModel';

export interface RootModel extends Models<RootModel> {
  userModel: typeof userModel;
  modalModel: typeof modalModel;
  profileModel: typeof profileModel;
  artistModel: typeof artistModel;
  tapesModel: typeof tapesModel;
  audioModel: typeof audioModel;
  settingsModel: typeof settingsModel;
  twitterModel: typeof twitterModel;
}

export const models: RootModel = {
  userModel,
  modalModel,
  profileModel,
  artistModel,
  tapesModel,
  audioModel,
  settingsModel,
  twitterModel,
};

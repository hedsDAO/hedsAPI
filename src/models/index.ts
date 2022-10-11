import { Models } from '@rematch/core';
import { userModel } from '@/pages/user/store/userModel';
import { modalModel } from '@/modules/modals/store/modalModel';
import { profileModel } from '@/pages/profile/store/profileModel';
import { artistModel } from '@/pages/artists/store/artistModel';
import { tapesModel } from '@/pages/tapes/store/tapesModel';
import { audioModel } from '@/modules/audio/store/audioModel';
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

import { Models } from '@rematch/core';
import { navigationModel } from '@/modules/navigation/store/navigationModel';
import { tapesModel } from '@/modules/wrappers/store/tapesModel';
import { artistModel } from '@/pages/artists/store/artistModel';
import { userModel } from '@/modules/wrappers/store/userModal';
import { hedstapeModel } from '@/pages/listen/screens/hedstape/models/hedstapeModel';
import { collabModel } from '@/pages/listen/screens/collabtape/models/collabModel';
import { audioModel } from '@/modules/audio/store/audioModel';
import { voteModel } from '@/pages/vote/store/voteModel';
import { exploreModel } from '@/pages/explore/store/exploreModel';

// Modals
import { modalModel } from '@/modules/modals/store/modalModel';
import { settingsModel } from '@/modules/modals/screens/settings/models/settingsModel';

export interface RootModel extends Models<RootModel> {
  navigationModel: typeof navigationModel;
  tapesModel: typeof tapesModel;
  artistModel: typeof artistModel;
  audioModel: typeof audioModel;
  userModel: typeof userModel;
  collabModel: typeof collabModel;
  hedstapeModel: typeof hedstapeModel;
  voteModel: typeof voteModel;
  exploreModel: typeof exploreModel;
  // modals
  modalModel: typeof modalModel;
  settingsModel: typeof settingsModel;
}

export const models: RootModel = {
  navigationModel,
  tapesModel,
  artistModel,
  modalModel,
  userModel,
  collabModel,
  hedstapeModel,
  audioModel,
  exploreModel,
  // modals
  settingsModel,
  voteModel,
};

import { Models } from '@rematch/core';
import { navigationModel } from '@/modules/navigation/store/navigationModel';
import { tapesModel } from '@/modules/wrappers/store/tapesModel';
import { artistModel } from '@/pages/artists/store/artistModel';
import { userModel } from '@/modules/wrappers/store/userModel';
import { hedstapeModel } from '@/pages/listen/screens/hedstape/models/hedstapeModel';
import { collabModel } from '@/pages/listen/screens/collabtape/models/collabModel';
import { audioModel } from '@/modules/audio/store/audioModel';
import { voteModel } from '@/pages/vote/store/voteModel';
import { exploreModel } from '@/pages/explore/store/exploreModel';

// modals
import { modalModel } from '@/modules/modals/store/modalModel';
import { submitModel } from '@/modules/modals/screens/submit/models/submitModel';
import { settingsModel } from '@/modules/modals/screens/settings/models/settingsModel';
import { mintModel } from '@/modules/modals/screens/mint/models/mintModel';
import { twitterModel } from '@/modules/modals/screens/twitter/models/twitterModel';
import { sampleModel } from '@/modules/modals/screens/sample/models/sampleModel';
import { nameModel } from '@/modules/modals/screens/name/models/nameModel';

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
  submitModel: typeof submitModel;
  mintModel: typeof mintModel;
  twitterModel: typeof twitterModel;
  sampleModel: typeof sampleModel;
  nameModel: typeof nameModel;
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
  mintModel,
  settingsModel,
  voteModel,
  submitModel,
  twitterModel,
  sampleModel,
  nameModel,
};

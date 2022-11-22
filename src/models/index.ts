import { Models } from '@rematch/core';
import { userModel } from '@/pages/user/store/userModel';
import { modalModel } from '@/modules/modals/store/modalModel';
import { artistModel } from '@/pages/artists/store/artistModel';
import { tapesModel } from '@/pages/tapes/store/tapesModel';
import { hedstapeModel } from '@/pages/listen/screens/hedstape/models/hedstapeModel';
import { audioModel } from '@/modules/audio/store/audioModel';
import { settingsModel } from '@/modules/modals/screens/settings/models/settingsModel';
import { twitterModel } from '@/modules/modals/screens/twitter/models/twitterModel';
import { sampleModel } from '@/modules/modals/screens/sample/models/sampleModel';
import { submitModel } from '@/modules/modals/screens/submit/models/submitModel';
import { exploreModel } from '@/pages/explore/store/exploreModel';
import { collabModel } from '@/pages/listen/screens/collabtape/models/collabModel';

export interface RootModel extends Models<RootModel> {
  userModel: typeof userModel;
  modalModel: typeof modalModel;
  artistModel: typeof artistModel;
  tapesModel: typeof tapesModel;
  audioModel: typeof audioModel;
  settingsModel: typeof settingsModel;
  twitterModel: typeof twitterModel;
  hedstapeModel: typeof hedstapeModel;
  sampleModel: typeof sampleModel;
  submitModel: typeof submitModel;
  exploreModel: typeof exploreModel;
  collabModel: typeof collabModel;
}

export const models: RootModel = {
  userModel,
  modalModel,
  artistModel,
  tapesModel,
  audioModel,
  settingsModel,
  twitterModel,
  hedstapeModel,
  sampleModel,
  submitModel,
  exploreModel,
  collabModel,
};

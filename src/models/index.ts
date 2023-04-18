import { Models } from '@rematch/core';
import { songModel } from '@/pages/song/models/songModel';
import { modalModel } from '@/modals/models/modalModel';
import { authModel } from '@/auth/models/authModel';
import { userModel } from '@/pages/user/models/userModel';

export interface RootModel extends Models<RootModel> {
  songModel: typeof songModel;
  modalModel: typeof modalModel;
  authModel: typeof authModel;
  userModel: typeof userModel;
}

export const models: RootModel = {
  songModel,
  modalModel,
  authModel,
  userModel,
};

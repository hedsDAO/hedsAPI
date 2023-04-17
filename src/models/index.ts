import { Models } from '@rematch/core';
import { songModel } from '@/pages/song/models/songModel';
import { modalModel } from '@/modals/models/modalModel';
import { authModel } from '@/auth/models/authModel';

export interface RootModel extends Models<RootModel> {
  songModel: typeof songModel;
  modalModel: typeof modalModel;
  authModel: typeof authModel;
}

export const models: RootModel = {
  songModel,
  modalModel,
  authModel,
};

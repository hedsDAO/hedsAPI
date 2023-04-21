import { Models } from '@rematch/core';
import { songModel } from '@/pages/song/models/songModel';
import { modalModel } from '@/modals/models/modalModel';
import { authModel } from '@/auth/models/authModel';
import { userModel } from '@/pages/user/models/userModel';
import { navModel } from '@/components/Nav/models/navModel';
import { paginationModel } from '@/components/Pagination/models/paginationModel';

export interface RootModel extends Models<RootModel> {
  songModel: typeof songModel;
  modalModel: typeof modalModel;
  authModel: typeof authModel;
  userModel: typeof userModel;
  navModel: typeof navModel;
  paginationModel: typeof paginationModel;
}

export const models: RootModel = {
  songModel,
  modalModel,
  authModel,
  userModel,
  navModel,
  paginationModel,
};

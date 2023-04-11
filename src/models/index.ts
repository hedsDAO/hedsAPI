import { Models } from '@rematch/core';
import { songModel } from '@/pages/song/models/songModel';
import { modalModel } from '@/components/Modals/models/modalModel';

export interface RootModel extends Models<RootModel> {
  songModel: typeof songModel;
  modalModel: typeof modalModel;
}

export const models: RootModel = {
  songModel,
  modalModel,
};

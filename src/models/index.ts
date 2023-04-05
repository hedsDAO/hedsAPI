import { Models } from '@rematch/core';
import { navModel } from '@/components/Nav/models/navModel';
import { persistentAudioModel } from '@/components/PersistentAudio/models/persistentAudioModel';
import { songModel } from '@/pages/Song/models/songModel';

export interface RootModel extends Models<RootModel> {
  navModel: typeof navModel;
  persistentAudioModel: typeof persistentAudioModel;
  songModel: typeof songModel;
}

export const models: RootModel = {
  navModel,
  persistentAudioModel,
  songModel,
};

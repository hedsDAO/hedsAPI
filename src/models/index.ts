import { Models } from '@rematch/core';
import { navModel } from '@/components/Nav/models/navModel';
import { persistentAudioModel } from '@/components/PersistentAudio/models/persistentAudioModel';

export interface RootModel extends Models<RootModel> {
  navModel: typeof navModel;
  persistentAudioModel: typeof persistentAudioModel;
}

export const models: RootModel = {
  navModel,
  persistentAudioModel,
};

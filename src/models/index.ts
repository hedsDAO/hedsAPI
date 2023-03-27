import { Models } from '@rematch/core';

import { tapesModel } from '@/pages/Tape/models/tapeModel';

export interface RootModel extends Models<RootModel> {
    tapesModel: typeof tapesModel;
}

export const models: RootModel = {
    tapesModel,
};

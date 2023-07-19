import { Models } from '@rematch/core';
import { songModel } from '@/pages/song/models/songModel';
import { modalModel } from '@/modals/models/modalModel';
import { authModel } from '@/auth/models/authModel';
import { tapeModel } from '@/pages/tape/models/tapeModel';
import { userModel } from '@/pages/user/models/userModel';
import { navModel } from '@/components/Nav/models/navModel';
import { paginationModel } from '@/components/Pagination/models/paginationModel';
import { settingsModel } from '@/modals/screens/settings/models/settingsModel';
import { globalAudioModel } from '@/components/GlobalAudio/models/globalAudioModel';
import { audioModel } from '@/hooks/useAudio/models/audioModel';
import { waveformModel } from '@/hooks/useWaveform/models/waveformModel';
import { artistsModel } from '@/pages/artists/models/artistsModel';
import { tapesModel } from '@/pages/tapes/models/tapesModel';
import { exploreModel } from '@/pages/explore/models/exploreModel';
import { voteModel } from '@/pages/vote/models/voteModel';
import { connectModel } from '@/modals/screens/connect/models/connectModel';
import { adminModel } from '@/pages/admin/model/adminModel';
import { searchModel } from '@/components/Search/models/searchModel';
import { submitModel } from '@/modals/screens/submit/models/submitModel';

export interface RootModel extends Models<RootModel> {
  songModel: typeof songModel;
  modalModel: typeof modalModel;
  authModel: typeof authModel;
  tapeModel: typeof tapeModel;
  userModel: typeof userModel;
  navModel: typeof navModel;
  paginationModel: typeof paginationModel;
  settingsModel: typeof settingsModel;
  globalAudioModel: typeof globalAudioModel;
  audioModel: typeof audioModel;
  waveformModel: typeof waveformModel;
  artistsModel: typeof artistsModel;
  tapesModel: typeof tapesModel;
  exploreModel: typeof exploreModel;
  voteModel: typeof voteModel;
  connectModel: typeof connectModel;
  adminModel: typeof adminModel;
  searchModel: typeof searchModel;
  submitModel: typeof submitModel;
}

export const models: RootModel = {
  songModel,
  modalModel,
  authModel,
  tapeModel,
  userModel,
  navModel,
  paginationModel,
  settingsModel,
  globalAudioModel,
  audioModel,
  waveformModel,
  artistsModel,
  tapesModel,
  exploreModel,
  voteModel,
  connectModel,
  adminModel,
  searchModel,
  submitModel,
};

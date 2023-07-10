import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { storage } from '@/App';
import { ref, uploadBytes } from 'firebase/storage';
import { AdminState } from '@/pages/admin/model/common';
import { storageLink } from '@/pages/admin/model/constants';
import { getArtistsAndCurators } from '@/api/user';
import { User } from '@/models/common';

export const adminModel = createModel<RootModel>()({
  state: {} as AdminState,
  reducers: {
    setTapeDetails: (state, tapeDetails) => ({ ...state, tapeDetails }),
    setTapeTimeline: (state, timeline) => ({ ...state, tapeDetails: { ...state.tapeDetails, timeline } }),
    setCuratorWallet: (state, curatorWallet) => ({ ...state, curatorWallet }),
    setSampleDetails: (state, songDetails) => ({ ...state, songDetails }),
    setCoverImage: (state, coverImage) => ({ ...state, coverImage }),
    setSampleAudio: (state, sampleAudio) => ({ ...state, sampleAudio }),
    setArtistsWallets: (state, artists) => ({ ...state, artists: artists.map((artist: User) => artist.wallet) }),
  },
  selectors: (slice) => ({
    selectTapePayload: () => slice((state) => state),
    selectTapeDetails: () => slice((state) => state.tapeDetails),
    selectCuratorWallet: () => slice((state) => state.curatorWallet),
    selectSongDetails: () => slice((state) => state.songDetails),
    selectCoverImage: () => slice((state) => state.coverImage),
    selectSampleAudio: () => slice((state) => state.sampleAudio),
    selectAllArtistsWallets: () => slice((state) => state.artists),
  }),
  effects: (dispatch) => ({
    async uploadCoverImage(file: File) {
      try {
        await uploadBytes(ref(storage, 'cover-img.png'), file).then((snapshot) => {
          const fullPath = `${storageLink}/${snapshot.ref.bucket}/${snapshot.ref.fullPath}`;
          this.setCoverImage(fullPath);
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    async uploadSampleAudio(file: File) {
      try {
        await uploadBytes(ref(storage, 'sample-audio.mp3'), file).then((snapshot) => {
          const fullPath = `${storageLink}/${snapshot.ref.bucket}/${snapshot.ref.fullPath}`;
          this.setSampleAudio(fullPath);
        });
      } catch (error: any) {
        console.log(error);
      }
    },
    async getArtists() {
      try {
        const response = await getArtistsAndCurators();
        this.setArtistsWallets(response.data.artists);
      } catch (e) {
        console.error(e);
      }
    },
  }),
});

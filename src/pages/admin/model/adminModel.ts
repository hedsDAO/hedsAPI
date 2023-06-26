import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { storage } from '@/App';
import { ref, uploadBytes } from 'firebase/storage';
import { CreateTapePayload } from '@/pages/admin/model/common';
import { storageLink } from '@/pages/admin/model/constants';
import { getArtistsAndCurators } from '@/api/user';
import { User } from '@/models/common';

export const adminModel = createModel<RootModel>()({
  state: {
    tape: {} as CreateTapePayload,
    artists: [] as string[],
  },
  reducers: {
    setTapeDetails: (state, tapeData) => ({ ...state, tape: { ...state.tape, tapeData } }),
    setCuratorWallet: (state, curatorWallet) => ({ ...state, tape: { ...state.tape, curatorWallet } }),
    setSampleDetails: (state, songData) => ({ ...state, tape: { ...state.tape, songData } }),
    setCoverImage: (state, coverImage) => ({ ...state, tape: { ...state.tape, coverImage } }),
    setSampleAudio: (state, sampleAudio) => ({ ...state, tape: { ...state.tape, sampleAudio } }),
    setArtistsWallets: (state, artists) => ({ ...state, artists: artists.map((artist: User) => artist.wallet) }),
  },
  selectors: (slice) => ({
    selectTapePayload: () => slice((state) => state.tape),
    selectTapeData: () => slice((state) => state.tape.tapeData),
    selectCuratorWallet: () => slice((state) => state.tape.curatorWallet),
    selectSongData: () => slice((state) => state.tape.songData),
    selectCoverImage: () => slice((state) => state.tape.coverImage),
    selectSampleAudio: () => slice((state) => state.tape.sampleAudio),
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

import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { storage } from '@/App';
import { ref, uploadBytes } from 'firebase/storage';
import { CreateTapePayload } from '@/pages/admin/model/common';

export const adminModel = createModel<RootModel>()({
  state: {
    tape: {} as CreateTapePayload,
  },
  reducers: {
    setTapeDetails: (state, tapeData) => ({ ...state, tape: { ...state.tape, tapeData } }),
    setCuratorWallet: (state, curatorWallet) => ({ ...state, tape: { ...state.tape, curatorWallet } }),
    setSampleDetails: (state, songData) => ({ ...state, tape: { ...state.tape, songData } }),
  },
  selectors: (slice) => ({
    selectTapePayload: () => slice((state) => state.tape),
  }),
  effects: (dispatch) => ({
    async uploadCoverImage(file: File) {
      try {
        await uploadBytes(ref(storage, 'cover-img.png'), file).then((snapshot) => {
          console.log('snapshot', snapshot);
          this.setCoverImage(snapshot.ref.fullPath);
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  }),
});

// export const uploadFile = async (file: File) => {
//   await uploadBytes(ref(storage, 'cover-img.png'), file).then((snapshot) => {
//     console.log('snapshot', snapshot);
//   });
// };

// export const uploadSample = async (file: File) => {
//   await uploadBytes(ref(storage, 'sample-audio.mp3'), file).then((snapshot) => {
//     console.log('snapshot', snapshot);
//   });
// };

import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { storage } from '@/App';
import { ref, uploadBytes } from 'firebase/storage';

interface AdminState {
  coverImage: string;
  sampleAudio: string;
}

export const adminModel = createModel<RootModel>()({
  state: {} as AdminState,
  reducers: {
    setCoverImage: (state, payload) => ({ ...state, coverImage: payload }),
    setSampleAudio: (state, payload) => ({ ...state, sampleAudio: payload }),
  },
  selectors: (slice) => ({
    selectAdmins: () => slice((state) => state),
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

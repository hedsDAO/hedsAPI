import type { RootModel } from '@/models';
import { storage } from '@/App';
import { generateSampleLink } from '@/utils';
import { createModel } from '@rematch/core';
import { getDownloadURL, ref } from 'firebase/storage';
import { SampleModalState } from './common';

export const sampleModel = createModel<RootModel>()({
  state: {} as SampleModalState,
  reducers: {
    setIsLoading: (state, isLoading) => ({ ...state, isLoading }),
    setIsChecked: (state, isChecked) => ({ ...state, isChecked }),
    clearModalState: (state) => {
      const newState = { ...state };
      newState.isChecked = false;
      newState.isLoading = false;
      return newState;
    },
  },
  effects: (dispatch) => ({
    async getSampleDownload(id: string) {
      this.setIsLoading(true);
      const sampleRef = ref(storage, generateSampleLink(id));
      await getDownloadURL(sampleRef).then(async (url: string) => {
        this.setIsLoading(false);
        fetch(url)
          .then((resp) => resp.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `HT${id}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          })
          .catch((err) => console.log(err));
      });
      setTimeout(() => {
        this.setIsLoading(false);
        dispatch.modalModel.setModalOpen(false);
      }, 500);
    },
  }),
});

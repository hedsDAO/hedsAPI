import type { RootModel } from '@/models';
import { ref, uploadBytes } from 'firebase/storage';
import { createSubmission, deleteSubmission } from '@/api/song';
import { getUserSongsById } from '@/api/user';
import { storage } from '@/App';
import { Song } from '@/models/common';
import { computeLength } from '@/utils';
import { createModel } from '@rematch/core';
import { SubmitModelState, SubmitModelSteps } from '@/modals/screens/submit/models/common';
import * as constants from '@/modals/screens/submit/models/constants';

export const submitModel = createModel<RootModel>()({
  state: {
    currentStep: SubmitModelSteps.TERMS,
  } as SubmitModelState,
  reducers: {
    setCurrentStep: (state, step: SubmitModelSteps) => ({ ...state, currentStep: step }),
    setFile: (state, file: File) => ({ ...state, file }),
    setError: (state, error: string) => ({ ...state, error }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setIsUploading: (state, isUploading: boolean) => ({ ...state, isUploading }),
    setHasSubmitted: (state, hasSubmitted: boolean) => ({ ...state, hasSubmitted }),
    setHasAcceptedPreview: (state, hasAcceptedPreview: boolean) => ({ ...state, hasAcceptedPreview }),
    setHasAcceptedTerms: (state, hasAcceptedTerms: boolean) => ({ ...state, hasAcceptedTerms }),
    setPreviousSubmission: (state, prevSubmission: Song) => ({ ...state, prevSubmission }),
    setNewSubmission: (state, newSubmission: Song) => ({ ...state, newSubmission }),
    clearState: (_) => ({} as SubmitModelState),
  },
  selectors: (slice) => ({
    selectState: () => slice((state) => state),
    selectFile: () => slice((state) => state?.file),
    selectError: () => slice((state) => state?.error),
    selectIsLoading: () => slice((state) => state?.isLoading),
    selectIsUploading: () => slice((state) => state?.isUploading),
    selectHasSubmitted: () => slice((state) => state?.hasSubmitted),
    selectHasAcceptedPreview: () => slice((state) => state?.hasAcceptedPreview),
    selectHasAcceptedTerms: () => slice((state) => state?.hasAcceptedTerms),
    selectCurrentStep: () => slice((state) => state?.currentStep),
    selectIsLocked: () => slice((state) => state?.isLocked),
    selectNewSubmission: () => slice((state) => state?.newSubmission),
    selectPrevSubmission: () => slice((state) => state?.prevSubmission),
  }),
  effects: () => ({
    async validateSubmission(file: File) {
      this.setIsLoading(true);
      const { duration } = await computeLength(file);
      const { type, size } = file;
      if (constants.VALID_FILE_TYPES.indexOf(type) === -1) this.setError(constants.FILE_TYPE_ERROR);
      else if (size > constants.MAX_FILE_SIZE) this.setError(constants.FILE_SIZE_ERROR);
      else if (duration < constants.MIN_LENGTH || duration > constants.MAX_LENGTH) this.setError(constants.FILE_LENGTH_ERROR);
      else this.setFile(file);
      return this.setIsLoading(false);
    },
    async getUserSongs([id, tapeId]: [number, number]) {
      try {
        const user_songs = await getUserSongsById(id);
        user_songs?.data.map((song: Song) => (song?.tape_id === tapeId ? this.setPreviousSubmission(song) : null));
      } catch (error) {
        console.log(error);
      }
    },
    async uploadSubmission([file, wallet, userId, tapeId]: [File, string, number, number]) {
      this.setIsLoading(true);
      this.setCurrentStep(SubmitModelSteps.LOADING);
      this.setIsUploading(true);
      const fileExt = constants.handleFileExt(file);
      const tempAudioRef = `temp/${tapeId}-${wallet}${fileExt}`;
      try {
        const { duration } = await computeLength(file);
        await uploadBytes(ref(storage, tempAudioRef), file);
        const response = await createSubmission(tempAudioRef, userId, tapeId, duration);
        if (response?.data?.newSubmission) {
          this.setIsLoading(false);
          this.setIsUploading(false);
          this.setHasSubmitted(true);
          this.setNewSubmission(response?.data?.newSubmission);
          this.setFile(null);
          this.setCurrentStep(SubmitModelSteps.SUCCESS);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSubmission(song_id: number) {
      try {
        this.setIsLoading(true);
        await deleteSubmission(song_id);
        this.setHasSubmitted(false);
        this.setPreviousSubmission(null);
        this.setIsLoading(false);
        this.setCurrentStep(SubmitModelSteps.TERMS);
      } catch (error) {
        console.log(error);
      }
    },
  }),
});

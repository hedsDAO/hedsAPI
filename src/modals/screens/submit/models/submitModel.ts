import type { RootModel } from '@/models';
import { computeLength } from '@/utils';
import { createModel } from '@rematch/core';
import { MAX_FILE_SIZE, MAX_LENGTH, MIN_LENGTH, VALID_FILE_TYPES } from './constants';

export enum SubmitModelSteps {
  TERMS,
  UPLOAD,
  SUBMIT,
  PREVIEW,
  SUCCESS,
  REPLACE,
  ERROR,
  UPLOADING,
}

export interface SubmitModelState {
  currentStep: SubmitModelSteps;
  file: File;
  index: number;
  error: string;
  isLoading: boolean;
  isUploading: boolean;
  hasAcceptedTerms: boolean;
  hasAcceptedPreview: boolean;
  hasSubmitted: boolean;
}

export const submitModel = createModel<RootModel>()({
  state: {
    currentStep: SubmitModelSteps.TERMS,
  } as SubmitModelState,
  reducers: {
    setCurrentStep: (state, step: SubmitModelSteps) => ({ ...state, currentStep: step }),
    setFile: (state, file: File) => ({ ...state, file }),
    setIndex: (state, index: number) => ({ ...state, index }),
    setError: (state, error: string) => ({ ...state, error }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setIsUploading: (state, isUploading: boolean) => ({ ...state, isUploading }),
    setHasSubmitted: (state, hasSubmitted: boolean) => ({ ...state, hasSubmitted }),
    setHasAcceptedPreview: (state, hasAcceptedPreview: boolean) => ({ ...state, hasAcceptedPreview }),
    setHasAcceptedTerms: (state, hasAcceptedTerms: boolean) => ({ ...state, hasAcceptedTerms }),
    clearState: (state) => ({ currentStep: SubmitModelSteps.TERMS } as SubmitModelState),
  },
  selectors: (slice) => ({
    selectFile: () => slice((state) => state.file),
    selectIndex: () => slice((state) => state.index),
    selectError: () => slice((state) => state.error),
    selectIsLoading: () => slice((state) => state.isLoading),
    selectIsUploading: () => slice((state) => state.isUploading),
    selectHasSubmitted: () => slice((state) => state.hasSubmitted),
    selectHasAcceptedPreview: () => slice((state) => state.hasAcceptedPreview),
    selectHasAcceptedTerms: () => slice((state) => state.hasAcceptedTerms),
    selectCurrentStep: () => slice((state) => state.currentStep),
  }),
  effects: (dispatch) => ({
    async validateSubmission(file: File) {
      this.setIsLoading(true);
      const { duration } = await computeLength(file);
      const { type, size } = file;
      if (VALID_FILE_TYPES.indexOf(type) === -1) this.setError('Invalid file type');
      else if (size > MAX_FILE_SIZE) this.setError('File too large.');
      else if (duration < MIN_LENGTH || duration > MAX_LENGTH) this.setError('Submissions must be between 60-90 sec.');
      else {
        this.setIndex(2);
        this.setFile(file);
      }
      return this.setIsLoading(false);
    },
  }),
});

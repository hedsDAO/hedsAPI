import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import { MAX_FILE_SIZE, MAX_LENGTH, VALID_FILE_TYPES, MIN_LENGTH } from './constants';
import { computeLength } from '@/utils';

export interface SubmitState {
  hasAcceptedTerms: boolean;
  index: number;
  error: string;
  isLoading: boolean;
  file: File;
  hasAcceptedPreview: boolean;
  isUploading: boolean;
  hasSubmitted: boolean;
}

export const submitModel = createModel<RootModel>()({
  state: {
    hasAcceptedTerms: false,
    index: 0,
    isLoading: false,
    hasAcceptedPreview: false,
    isUploading: false,
    hasSubmitted: false,
  } as SubmitState,
  reducers: {
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setIsUploading: (state, isUploading: boolean) => ({ ...state, isUploading }),
    setHasSubmitted: (state, hasSubmitted: boolean) => ({ ...state, hasSubmitted }),
    setIndex: (state, index: number) => ({ ...state, index }),
    setFile: (state, file: File) => ({ ...state, file }),
    setError: (state, error: string) => ({ ...state, error }),
    setHasAcceptedPreview: (state, hasAcceptedPreview: boolean) => ({ ...state, hasAcceptedPreview }),
    setHasAcceptedTerms: (state) => ({ ...state, hasAcceptedTerms: !state.hasAcceptedTerms }),
    clearModalState: (state) => {
      return {
        hasAcceptedTerms: false,
        index: 0,
        isLoading: false,
      } as SubmitState;
    },
  },
  selectors: (slice) => ({
    selectHasAcceptedTerms() {
      return slice((submitModel): boolean => submitModel?.hasAcceptedTerms || false);
    },
    selectIndex() {
      return slice((submitModel): number => submitModel.index);
    },
    selectIsLoading() {
      return slice((submitModel) => submitModel.isLoading);
    },
    selectError() {
      return slice((submitModel) => submitModel.error);
    },
    selectFile() {
      return slice((submitModel) => submitModel.file);
    },
    selectHasAcceptedPreview() {
      return slice((submitModel) => submitModel.hasAcceptedPreview);
    },
    selectIsUploading() {
      return slice((submitModel) => submitModel.isUploading);
    },
    selectHasSubmitted() {
      return slice((submitModel) => submitModel.hasSubmitted);
    },
  }),
  effects: () => ({
    async toggleHasAcceptedTerms(hasAcceptedTerms: boolean) {
      if (hasAcceptedTerms) this.setIndex(1);
      this.setHasAcceptedTerms(hasAcceptedTerms);
    },
    async toggleHasAcceptedPreview(hasAcceptedPreview: boolean) {
      if (hasAcceptedPreview) this.setIndex(3);
      this.setHasAcceptedPreview(hasAcceptedPreview);
    },
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
    async uploadSubmissions() {},
  }),
});

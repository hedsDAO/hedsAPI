import { Song } from '@/models/common';

export enum SubmitModelSteps {
  TERMS,
  UPLOAD,
  SUBMIT,
  PREVIEW,
  SUCCESS,
  REPLACE,
  ERROR,
  LOADING,
}

export interface SubmitModelState {
  currentStep: SubmitModelSteps;
  file: File;
  error: string;
  isLoading: boolean;
  isUploading: boolean;
  hasAcceptedTerms: boolean;
  hasAcceptedPreview: boolean;
  hasSubmitted: boolean;
  isLocked: boolean;
  prevSubmission?: Song;
  newSubmission?: Song;
}

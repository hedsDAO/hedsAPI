import { TrackMetadata } from '@/models/common';

/**
 * @const {enum} SubmitSteps : Steps for the submission modal flow.
 * @const {class} SubmitModalState : Submit Modal Rematch State.
 */

export enum SubmitSteps {
  REQS_AND_DISCLAIMER = 0,
  UPLOAD_SUBMISSION,
  VERIFY_AND_SUBMIT,
  SUCCESS,
  PREVIOUS_SUBMISSION,
}

export class SubmitModalState {
  isLoading: boolean;
  isUploading: boolean;
  error: string;
  currentStep: SubmitSteps;
  isRequirementsChecked: boolean;
  isDisclaimerChecked: boolean;
  hasPrevSubmitted: boolean;
  submission: TrackMetadata;
  ipfsHash: string;
  file: File;
}

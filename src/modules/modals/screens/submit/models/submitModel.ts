import { ipfs } from '@/App';
import type { RootModel } from '@/models';
import { TapeData, TrackMetadata, User } from '@/models/common';
import { computeLength } from '@/utils';
import { createModel } from '@rematch/core';
import axios from 'axios';
import { IPFSHTTPClient } from 'ipfs-http-client/dist/src/types';

const GENERATE_ID_URL = 'https://us-central1-heds-34ac0.cloudfunctions.net/generateId';

export enum SubmitSteps {
  REQUIREMENTS_AND_DISCLAIMER = 0,
  UPLOAD_SUBMISSION,
  VERIFY_AND_SUBMIT,
}

class SubmitModalState {
  isLoading: boolean;
  error: string;
  currentStep: SubmitSteps;
  isRequirementsChecked: boolean;
  isDisclaimerChecked: boolean;
  pendingSubmission: TrackMetadata;
}

export const submitModel = createModel<RootModel>()({
  state: {
    isLoading: false,
    isRequirementsChecked: false,
    isDisclaimerChecked: false,
    currentStep: SubmitSteps.UPLOAD_SUBMISSION,
  } as SubmitModalState,
  reducers: {
    setCurrentStep: (state, currentStep) => ({ ...state, currentStep }),
    setIsLoading: (state, isLoading) => ({ ...state, isLoading }),
    setIsRequirementsChecked: (state, isRequirementsChecked: boolean) => ({ ...state, isRequirementsChecked }),
    setIsDisclaimerChecked: (state, isDisclaimerChecked) => ({ ...state, isDisclaimerChecked }),
    setPendingSubmission: (state, pendingSubmission: TrackMetadata) => ({ ...state, pendingSubmission }),
  },
  effects: () => ({
    async handleIpfsUpload([file, profileData, currentTape]: [File, User, TapeData]) {
      const { displayName: artist, wallet } = profileData;
      const { image: cover, name: tape } = currentTape;
      const track = await axios.get(GENERATE_ID_URL).then((res) => res.data);
      const result = await (ipfs as IPFSHTTPClient).add(file);
      const audio = `https://ipfs.io/ipfs/${result.cid}`;
      const { duration } = await computeLength(file);
      const newSubmission = { audio, duration, track, wallet, artist, cover, tape, public: false };
      console.log(newSubmission);
      this.setPendingSubmission(newSubmission);
    },
  }),
});

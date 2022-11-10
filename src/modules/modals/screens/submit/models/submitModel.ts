import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import axios from 'axios';
import { IPFSHTTPClient } from 'ipfs-http-client/dist/src/types';
import { ipfs } from '@/App';
import { TapeData, TrackMetadata, User } from '@/models/common';
import { SubmitSteps, GENERATE_ID_FUNC, PINATA_IPFS_URL, PIN_HASH_TO_IPFS_FUNC } from './common';
import { computeLength, handlePinataMetadata } from '@/utils';

class SubmitModalState {
  isLoading: boolean;
  isUploading: boolean;
  error: string;
  currentStep: SubmitSteps;
  isRequirementsChecked: boolean;
  isDisclaimerChecked: boolean;
  pendingSubmission: TrackMetadata;
  ipfsHash: string;
  file: File;
}

export const submitModel = createModel<RootModel>()({
  state: {
    isLoading: false,
    isRequirementsChecked: false,
    isDisclaimerChecked: false,
    currentStep: SubmitSteps.REQS_AND_DISCLAIMER,
  } as SubmitModalState,
  reducers: {
    setCurrentStep: (state, currentStep) => ({ ...state, currentStep }),
    setIsLoading: (state, isLoading) => ({ ...state, isLoading }),
    setIsUploading: (state, isUploading) => ({ ...state, isUploading }),
    setError: (state, error) => ({ ...state, error }),
    setIsRequirementsChecked: (state, isRequirementsChecked: boolean) => ({ ...state, isRequirementsChecked }),
    setIsDisclaimerChecked: (state, isDisclaimerChecked) => ({ ...state, isDisclaimerChecked }),
    setPendingSubmission: (state, pendingSubmission: TrackMetadata) => ({ ...state, pendingSubmission }),
    setFile: (state, file: File) => ({ ...state, file }),
    setIpfsHash: (state, ipfsHash) => ({ ...state, ipfsHash }),
    removeCurrentSubmission: (state) => {
      const newState = { ...state };
      delete newState.file;
      delete newState.pendingSubmission;
      return newState;
    },
    clearModalState: (state) => {
      const newState = { ...state };
      newState.currentStep = SubmitSteps.REQS_AND_DISCLAIMER;
      newState.isDisclaimerChecked = false;
      newState.isRequirementsChecked = false;
      delete newState.pendingSubmission;
      delete newState.file;
      return newState;
    },
  },
  effects: (dispatch) => ({
    async handleIpfsUpload([file, profileData, currentTape]: [File, User, TapeData]) {
      this.setIsLoading(true);
      this.setFile(file);
      const { displayName: artist, wallet } = profileData;
      const { image: cover, name: tape } = currentTape;
      const track = await axios.get(GENERATE_ID_FUNC).then((res) => res.data);
      const result = await (ipfs as IPFSHTTPClient).add(file);
      const audio = `https://heds.infura-ipfs.io/ipfs/${result.cid}`;
      const { duration } = await computeLength(file);
      const newSubmission = { audio, duration: Math.round(duration), track, wallet, artist, cover, tape, public: false };
      this.setIpfsHash(audio);
      this.setPendingSubmission(newSubmission);
      this.setIsLoading(false);
    },
    async handleUploadSubmission([currentSubmission, [space, tape, id], [name, cover]]: [TrackMetadata, [string, string, string], [string, string]]) {
      this.setIsUploading(true);
      const { track, duration, artist, wallet, audio: tempAudio } = currentSubmission;
      const hash = tempAudio.split('https://heds.infura-ipfs.io/ipfs/')[1];
      const options = handlePinataMetadata(wallet, artist, track, space, tape, id, duration);
      const audio = await axios.post(`${PIN_HASH_TO_IPFS_FUNC}/${hash}`, options).then((res) => PINATA_IPFS_URL + res.data.ipfsHash);
      const submission: TrackMetadata = { audio, track, duration, artist, wallet, cover, tape: name, public: false };
      await dispatch.profileModel.newUserSubmission([submission, [space, tape, id]]);
      this.setIsUploading(false);
      this.setCurrentStep(SubmitSteps.SUCCESS);
    },
  }),
});

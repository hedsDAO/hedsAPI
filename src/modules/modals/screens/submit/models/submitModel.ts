import type { RootModel } from '@/models';
import axios from 'axios';
import { TapeData, TrackMetadata, User } from '@/models/common';
import { computeLength, handlePinataMetadata } from '@/utils';
import { createModel } from '@rematch/core';
import { SubmitModalState, SubmitSteps } from './common';
import { ID_FUNC, INFURA_IPFS_URL, MAX_FILE_SIZE, MAX_LENGTH, MIN_LENGTH, PIN_HASH_TO_IPFS_FUNC, PINATA_IPFS_URL, VALID_FILE_TYPES } from './constants';
// import { create, IPFSHTTPClient } from 'ipfs-http-client';

// const token = process.env.INFURA_IPFS_PROJECT_ID + ':' + process.env.INFURA_IPFS_SECRET;
// const auth = 'Basic ' + Buffer.from(token).toString('base64');
// export const ipfs: IPFSHTTPClient | undefined = create({
//   url: process.env.INFURA_URL,
//   headers: { authorization: auth },
// });

// const testing units without IPFS
type IPFSHTTPClient = { add: (file: File) => { cid: number } };
const ipfs = {};

export const submitModel = createModel<RootModel>()({
  state: {
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
      delete newState.error;
      delete newState.file;
      delete newState.pendingSubmission;
      return newState;
    },
    clearModalState: (state) => new SubmitModalState(),
  },
  effects: (dispatch) => ({
    async validateSubmission(file: File) {
      this.setIsLoading(true);
      const { duration } = await computeLength(file);
      const { type, size } = file;
      if (VALID_FILE_TYPES.indexOf(type) === -1) return this.setError('Invalid file type');
      else if (size > MAX_FILE_SIZE) return this.setError('File too large.');
      else if (duration < MIN_LENGTH || duration > MAX_LENGTH) return this.setError('Submissions must be between 60-90 sec.');
      return this.setIsLoading(false);
    },
    async handleIpfsUpload([file, profileData, currentTape]: [File, User, TapeData]) {
      this.setIsLoading(true);
      const { displayName: artist, wallet } = profileData;
      const { image: cover, name: tape } = currentTape;
      const track = await axios.get(ID_FUNC).then((res) => res.data);
      const result = await (ipfs as IPFSHTTPClient).add(file);
      const audio = `${INFURA_IPFS_URL}${result.cid}`;
      const { duration } = await computeLength(file);
      const newSubmission = { audio, duration: Math.round(duration), track, wallet, artist, cover, tape, public: false };
      this.setIpfsHash(audio), this.setPendingSubmission(newSubmission), this.setIsLoading(false);
    },
    async handleUploadSubmission([currentSubmission, [space, tape, id], [name, cover]]: [TrackMetadata, [string, string, string], [string, string]]) {
      this.setIsUploading(true);
      const { track, duration, artist, wallet, audio: tempAudio } = currentSubmission;
      const hash = tempAudio.split(INFURA_IPFS_URL)[1];
      const options = handlePinataMetadata(wallet, artist, track, space, tape, id, duration);
      const audio = await axios.post(`${PIN_HASH_TO_IPFS_FUNC}/${hash}`, options).then((res) => PINATA_IPFS_URL + res.data.ipfsHash);
      const submission: TrackMetadata = { audio, track, duration, artist, wallet, cover, tape: name, public: false };
      await dispatch.profileModel.newUserSubmission([submission, [space, tape, id]]);
      this.setIsUploading(false), this.setCurrentStep(SubmitSteps.SUCCESS);
    },
  }),
});

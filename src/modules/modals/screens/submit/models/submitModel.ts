import type { RootModel } from '@/models';
import axios from 'axios';
import { TrackMetadata } from '@/models/common';
import { computeLength, handlePinataMetadata, removeFileFromPinata, uploadFileToPinata } from '@/utils';
import { createModel } from '@rematch/core';
import { SubmitModalState, SubmitSteps } from './common';
import { ID_FUNC, MAX_FILE_SIZE, MAX_LENGTH, MIN_LENGTH, PINATA_IPFS_URL, VALID_FILE_TYPES } from './constants';

export const submitModel = createModel<RootModel>()({
  state: {
    currentStep: SubmitSteps.REQS_AND_DISCLAIMER,
  } as SubmitModalState,
  reducers: {
    clearModalState: (state) => new SubmitModalState(),
    setCurrentStep: (state, currentStep) => ({ ...state, currentStep }),
    setIsLoading: (state, isLoading) => ({ ...state, isLoading }),
    setIsUploading: (state, isUploading) => ({ ...state, isUploading }),
    setError: (state, error) => ({ ...state, error }),
    setIsRequirementsChecked: (state, isRequirementsChecked: boolean) => ({ ...state, isRequirementsChecked }),
    setIsDisclaimerChecked: (state, isDisclaimerChecked) => ({ ...state, isDisclaimerChecked }),
    setFile: (state, file: File) => ({ ...state, file }),
    setIpfsHash: (state, ipfsHash) => ({ ...state, ipfsHash }),
    setHasPrevSubmitted: (state, hasPrevSubmitted) => ({ ...state, hasPrevSubmitted }),
    setSubmission: (state, submission: TrackMetadata) => ({ ...state, submission }),
  },
  effects: (dispatch) => ({
    async validateSubmission(file: File) {
      this.setIsLoading(true);
      const { duration } = await computeLength(file);
      const { type, size } = file;
      if (VALID_FILE_TYPES.indexOf(type) === -1) return this.setError('Invalid file type');
      else if (size > MAX_FILE_SIZE) return this.setError('File too large.');
      else if (duration < MIN_LENGTH || duration > MAX_LENGTH) return this.setError('Submissions must be between 60-90 sec.');
      else this.setFile(file);
      return this.setIsLoading(false);
    },
    async handleUploadSubmission([file, wallet, artist, [space, tape, id], [name, cover]]: [File, string, string, [string, string, string], [string, string]]) {
      this.setIsUploading(true);
      const { duration } = await computeLength(file);
      const track = await axios.get(ID_FUNC).then((res) => res.data);
      const options = handlePinataMetadata(wallet, artist, track, space, tape, id, duration);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pinataMetadata', JSON.stringify({ ...options.pinataMetadata }));
      const res = await uploadFileToPinata(formData);
      const audio = PINATA_IPFS_URL + res.IpfsHash;
      const newSub: TrackMetadata = { track, audio, artist, duration, wallet, cover, album: name, public: false, space, tape, id };
      await dispatch.profileModel.newUserSubmission([newSub, [space, tape, id]]);
      this.setSubmission(newSub);
      this.setIsUploading(false);
      this.setCurrentStep(SubmitSteps.SUCCESS);
    },
    async removePreviousSubmission(prevSub: TrackMetadata) {
      const { audio } = prevSub;
      const cid = audio.split(PINATA_IPFS_URL)[1];
      await removeFileFromPinata(cid);
    },
  }),
});

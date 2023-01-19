import { TrackMetadata, TrackType } from '@/models/common';
import { createModel } from '@rematch/core';
import type { RootModel } from '@/models';
import { MAX_FILE_SIZE, MAX_LENGTH, VALID_FILE_TYPES, MIN_LENGTH, SUB_ART_FUNCTION, UNPIN_HASH_FUNCTION, PINATA_URL_PREFIX } from './constants';
import { computeLength, formatSubId, handlePinataMetadata, uploadFileToPinata } from '@/utils';
import axios from 'axios';

export interface SubmitState {
  file: File;
  index: number;
  error: string;
  isLoading: boolean;
  isUploading: boolean;
  hasAcceptedTerms: boolean;
  hasAcceptedPreview: boolean;
  hasSubmitted: boolean;
  generatedSubmission: TrackMetadata;
}

export const submitModel = createModel<RootModel>()({
  state: {
    index: 0,
    isLoading: false,
    isUploading: false,
    hasSubmitted: false,
    hasAcceptedTerms: false,
    hasAcceptedPreview: false,
  } as SubmitState,
  reducers: {
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setIsUploading: (state, isUploading: boolean) => ({ ...state, isUploading }),
    setHasSubmitted: (state, hasSubmitted: boolean) => ({ ...state, hasSubmitted }),
    setIsGeneratingSubmission: (state, isGeneratingSubmission: boolean) => ({ ...state, isGeneratingSubmission }),
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
    selectGeneratedSubmission() {
      return slice((submitModel) => submitModel.generatedSubmission);
    },
  }),
  effects: (dispatch) => ({
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
    async deletePreviousSubmission([sub, wallet]) {
      this.setIsLoading(true);
      const { subImage, audio } = sub;
      const subImageHash = subImage.split(PINATA_URL_PREFIX)[1];
      const audioHash = audio.split(PINATA_URL_PREFIX)[1];
      try {
        await axios.delete(`${UNPIN_HASH_FUNCTION}/${subImageHash}`);
        await axios.delete(`${UNPIN_HASH_FUNCTION}/${audioHash}`);
        this.setIsLoading(false);
        dispatch.userModel.deletePreviousSubmission([sub, wallet]);
        this.clearModalState();
      } catch (err) {
        console.log(err);
        this.setIsLoading(false);
      }
    },
    async uploadSubmissions([space, tape, id, wallet, artist, album, cover, file]: [string, string, string, string, string, string, string, File]) {
      this.setIsUploading(true);
      this.setIsLoading(true);
      const testURL = `${SUB_ART_FUNCTION}/${space}/${tape}/${id}/${wallet}`;
      const { subId, subArtIpfsHash } = await axios.get(testURL).then((res) => res.data);
      const { duration } = await computeLength(file);
      const options = handlePinataMetadata(wallet, artist, subId, space, tape, id, duration);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pinataMetadata', JSON.stringify({ ...options.pinataMetadata }));
      const subAudioIpfsHash = await uploadFileToPinata(formData).then((res) => PINATA_URL_PREFIX + res.IpfsHash);
      const newSub: TrackMetadata = {
        track: formatSubId(subId),
        audio: subAudioIpfsHash,
        subId: formatSubId(subId),
        subImage: PINATA_URL_PREFIX + subArtIpfsHash,
        artist,
        duration,
        wallet,
        cover,
        album,
        public: false,
        space,
        tape,
        id,
        type: TrackType.SUBMISSION,
        stats: {
          likes: 0,
          likedBy: {},
          plays: 0,
        },
      };
      await dispatch.userModel.newUserSubmission([newSub, wallet]);
      return this.setIsLoading(false), this.setIsUploading(false);
    },
  }),
});

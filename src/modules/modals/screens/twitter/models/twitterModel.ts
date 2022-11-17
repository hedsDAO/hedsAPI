import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { sha256 } from 'js-sha256';
import axios from 'axios';
import { User } from '@/models/common';
import { TwitterModalState, TwitterStep } from './common';
const TWITTER_AUTH_CLOUD_FN = 'https://us-central1-heds-34ac0.cloudfunctions.net/twitterAuth/';

export const twitterModel = createModel<RootModel>()({
  state: {
    currentStep: TwitterStep.GENERATE_HASH,
    copied: false,
  } as TwitterModalState,
  reducers: {
    setCurrentStep: (state, currentStep: TwitterStep) => ({ ...state, currentStep }),
    setLoading: (state, loading: boolean) => ({ ...state, loading }),
    setTweetUrl: (state, tweetUrl: string) => ({ ...state, tweetUrl }),
    setUserHash: (state, userHash: string) => ({ ...state, userHash }),
    setHashedTweet: (state, hashedTweet: string) => ({ ...state, hashedTweet }),
    setCopied: (state, copied: boolean) => ({ ...state, copied }),
    setPastedTweetUrl: (state, pastedTweetUrl: string) => ({ ...state, pastedTweetUrl }),
    setWindowParams: (state, windowParams: [string, string, string]) => ({ ...state, windowParams }),
    setTwitterHandle: (state, twitterHandle: string) => ({ ...state, twitterHandle }),
    setError: (state, error: string) => ({ ...state, error }),
    clearTwitterModalState: (state) => new TwitterModalState(),
  },
  effects: (dispatch) => ({
    async generateHash(wallet: string) {
      this.setLoading(true);
      const VERIFICATION_MESSAGE = 'verification for @hedsDAO HDS';
      const userHash = sha256(wallet);
      const hashedTweet = VERIFICATION_MESSAGE + userHash;
      this.setUserHash(userHash);
      this.setHashedTweet(hashedTweet);
      const windowTank = [`https://twitter.com/intent/tweet?text=${hashedTweet}`, 'mywin', 'width=700,height=700'];
      this.setWindowParams(windowTank);
      setTimeout(() => {
        this.setLoading(false);
        this.setCurrentStep(TwitterStep.COPY_TWEET);
      }, 1000);
    },
    async verifyTweet([pastedTweetUrl, userHash]: [string, string]) {
      this.setError('');
      this.setLoading(true);
      const urlTank = pastedTweetUrl.split('/');
      let tweetId = urlTank[urlTank.length - 1];
      const twitterHandle = urlTank[3];
      tweetId = tweetId.slice(0, 19);
      axios
        .get(TWITTER_AUTH_CLOUD_FN + tweetId)
        .then((res) => {
          if (res?.data?.data?.[0]?.text?.split('HDS')[1] === userHash) {
            this.setTwitterHandle(twitterHandle);
            setTimeout(() => {
              this.setLoading(false);
              this.setCurrentStep(TwitterStep.LINK_ACCOUNT);
            }, 1000);
          } else {
            this.setLoading(false);
            this.setError('there was a problem verifying your tweet');
          }
        })
        .catch(() => {
          console.log('here');
          this.setLoading(false);
          this.setError('there was a problem verifying your tweet');
        });
    },
    async linkTwitterHandleToUser([wallet, userData, twitterHandle]: [string, User, string]) {
      this.setLoading(true);
      if (wallet?.length && userData && twitterHandle?.length) {
        const newUserData = { ...userData, twitterHandle };
        dispatch.userModel.updateConnectedUserTwitterHandle([wallet, newUserData]);
      }
      setTimeout(() => {
        this.setLoading(false);
      }, 1000);
    },
  }),
});

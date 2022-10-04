import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { sha256 } from 'js-sha256';
const TWITTER_AUTH_CLOUD_FN = 'https://us-central1-heds-34ac0.cloudfunctions.net/twitterAuth/';

export enum TwitterStep {
  GENERATE_HASH = 0,
  COPY_TWEET,
  TWEET_HASH,
  VERIFY_TWEET,
  LINK_ACCOUNT,
  COMPLETE,
  ERROR,
}

class TwitterModalState {
  currentStep: TwitterStep = TwitterStep.GENERATE_HASH;
  loading = false;
  tweetUrl = '';
  twitterHandle = '';
  userHash = '';
  hashedTweet = '';
  error = '';
  copied = false;
  pastedTweetUrl = '';
  windowParams: [string, string, string];
}

export const twitterModalModel = createModel<RootModel>()({
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
    async verifyTweet(pastedTweetUrl: string) {
      this.setLoading(true);
      const urlTank = pastedTweetUrl.split("/");
			let tweetId = urlTank[urlTank.length - 1];
			tweetId = tweetId.slice(0, 19);
      console.log(tweetId)
      setTimeout(() => {
        this.setLoading(false);
        this.setCurrentStep(TwitterStep.LINK_ACCOUNT);
      }, 2000)
    }
  }),
});

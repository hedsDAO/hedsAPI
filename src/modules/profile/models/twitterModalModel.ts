import type { RootModel } from '@/models';
import { createModel } from '@rematch/core';
const TWITTER_AUTH_CLOUD_FN = 'https://us-central1-heds-34ac0.cloudfunctions.net/twitterAuth/';
const VERIFICATION_MESSAGE = 'verification for @hedsDAO HDS';
// const winTank = [`https://twitter.com/intent/tweet?text=${HASHED_TWEET}`, "mywin", "width=700,height=700"];

enum TwitterStep {
  NOT_VERIFIED = 0,
  VERIFYING,
  LINKING,
  COMPLETE,
  ERROR,
}

class TwitterModalState {
  currentStep: TwitterStep = TwitterStep.NOT_VERIFIED;
  loading = false;
  tweetUrl = '';
  twitterHandle = '';
  userHash = '';
  hashedTweet = '';
  error = '';
}

export const twitterModalModel = createModel<RootModel>()({
  state: {
    currentStep: TwitterStep.NOT_VERIFIED,
  } as TwitterModalState,
  reducers: {
    setCurrentStep: (state, currentStep: TwitterStep) => ({ ...state, currentStep }),
    setLoading: (state, loading: boolean) => ({ ...state, loading }),
    setTweetUrl: (state, tweetUrl: string) => ({ ...state, tweetUrl }),
    setUserHash: (state, userHash: string) => ({ ...state, userHash }),
    setHashedTweet: (state, hashedTweet: string) => ({ ...state, hashedTweet }),
    clearTwitterModalState: (state) => new TwitterModalState(),
  },
  effects: (dispatch) => ({}),
});

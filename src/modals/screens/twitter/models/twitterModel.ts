import { createModel } from '@rematch/core';
import { RootModel } from '@/models';
import { sha256 } from 'js-sha256';
import { User } from '@/models/common';
import { TwitterModalState, TwitterModalSteps } from '@/modals/screens/twitter/models/common';
import * as constants from '@/modals/screens/twitter/models/constants';

export const twitterModel = createModel<RootModel>()({
  state: { currentStep: TwitterModalSteps.GENERATE_AND_COPY_TWEET } as TwitterModalState,
  reducers: {
    setUser: (state, user: User) => ({ ...state, user }),
    setTweet: (state, tweet: string) => ({ ...state, tweet }),
    setHash: (state, hash: string) => ({ ...state, hash }),
    setCurrentStep: (state, currentStep: TwitterModalSteps) => ({ ...state, currentStep }),
    setIsCopied: (state, isCopied: boolean) => ({ ...state, isCopied }),
    setHasCopied: (state, hasCopied: boolean) => ({ ...state, hasCopied }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setTweetUrl: (state, tweetUrl: string) => ({ ...state, tweetUrl }),
    setTwitterHandle: (state, twitterHandle: string) => ({ ...state, twitterHandle }),
    setError: (state, error: string) => ({ ...state, error }),
    setTwitterWindowUrl: (state, twitterWindowUrl: string[]) => ({ ...state, twitterWindowUrl }),
    clearState: (state) => ({ currentStep: TwitterModalSteps.GENERATE_AND_COPY_TWEET } as TwitterModalState),
  },
  selectors: (slice) => ({
    selectState: () => slice((state) => state),
    selectUser: () => slice((state) => state.user),
    selectCurrentStep: () => slice((state) => state.currentStep),
    selectTweet: () => slice((state) => state.tweet),
    selectHash: () => slice((state) => state.hash),
    selectIsCopied: () => slice((state) => state.isCopied),
    selectHasCopied: () => slice((state) => state.hasCopied),
    selectIsGenerated: () => slice((state) => state.isGenerated),
    selectIsLoading: () => slice((state) => state.isLoading),
    selectTwitterWindowUrl: () => slice((state) => state.twitterWindowUrl),
    selectTwitterHandle: () => slice((state) => state.twitterHandle),
    selectTweetUrl: () => slice((state) => state.tweetUrl),
    selectError: () => slice((state) => state.error),
  }),

  effects: () => ({
    async generateTweet(wallet: string) {
      this.setIsLoading(true);
      setTimeout(() => {
        const hash = sha256(wallet + Date.now().toPrecision(20).toString());
        const tweet = constants.VERIFICATION_MESSAGE + hash;
        const twitterWindowUrl = constants.getTwitterWindowUrl(tweet);
        this.setHash(hash);
        this.setTweet(tweet);
        this.setIsCopied(false);
        this.setIsLoading(false);
        this.setTwitterWindowUrl(twitterWindowUrl);
      }, 1000);
    },
    async handleCopy(tweet: string) {
      this.setIsCopied(true);
      this.setHasCopied(true);
      navigator.clipboard.writeText(tweet);
      setTimeout(() => this.setHasCopied(false), 200)
    },
    async verifyTweet(tweetUrl: string) {
      this.setIsLoading(true);
      const urlTank = tweetUrl.split('/');
      let tweetId = urlTank[urlTank.length - 1].slice(0, 19);
      let twitterHandle = urlTank[3];
      this.setTwitterHandle(twitterHandle);
      // **
      // make call to FB/DB const url = `${VALIDATE_TWITTER_URL}/${wallet}/${tweetId}/${twitterHandle}/${userHash}`;
      // if success, set currentStep to CONFIRM
      setTimeout(() => this.setIsLoading(false), 2000);
      this.setCurrentStep(TwitterModalSteps.CONFIRM);
      // **
      // if error (pick error and use settimeout to clear UI after 4 seconds)
      // duplicate error this.setError(DUPLICATE_ERROR_TEXT);
      // invalid url / unable to veriy this.setError(VERIFICATION_ERROR_TEXT);
      // all other errors this.setError(GENERAL_ERROR_TEXT);
      // **
      // setTimeout(() => this.setError(''), 4000);
    },
    async linkTwitterHandle([twitterHandle, user_id]: [string, number]) {
      this.setIsLoading(true);
      // update user with new twitterHandle
      // close modal
      this.setIsLoading(false);
      this.clearState();
    },
  }),
});

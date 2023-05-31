import { createModel } from '@rematch/core';
import { RootModel } from '@/models';
import { sha256 } from 'js-sha256';
import { User } from '@/models/common';
import { TwitterModalState, TwitterModalSteps } from '@/modals/screens/twitter/models/common';
import * as constants from '@/modals/screens/twitter/models/constants';
import { verifyTweet } from '@/api/auth';
import { updateUser } from '@/api/user';

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
      setTimeout(() => this.setHasCopied(false), 200);
    },
    async verifyTweet([tweetUrl, userHash]: [string, string]) {
      this.setIsLoading(true);
      const urlTank = tweetUrl.split('/');
      let tweetId = urlTank[urlTank.length - 1].slice(0, 19);
      let twitterHandle = urlTank[3];
      this.setTwitterHandle(twitterHandle);
      try {
        const res = await verifyTweet(tweetId, twitterHandle, userHash);
        if (res.data?.validated) {
          this.setIsLoading(false);
          this.setCurrentStep(TwitterModalSteps.CONFIRM);
        } else {
          this.setError(constants.GENERAL_ERROR_TEXT);
          this.setIsLoading(false), 2000;
          setTimeout(() => this.setError(''), 4000);
        }
      } catch (e) {
        if (e.response.data.error === 'Failed to validate Twitter handle: Twitter handle already exists in the database')
          this.setError(constants.DUPLICATE_ERROR_TEXT);
        setTimeout(() => this.setIsLoading(false), 2000);
        setTimeout(() => this.setError(''), 4000);
      }
    },
    async linkTwitterHandle([twitterHandle, user_id]: [string, number]) {
      this.setIsLoading(true);
      await updateUser(user_id, { twitter_handle: twitterHandle });
      setTimeout(() => this.setIsLoading(false), 2000);
      this.setIsLoading(false);
      this.clearState();
    },
  }),
});

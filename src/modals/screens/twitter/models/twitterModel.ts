import { RootModel } from '@/models';
import { createModel } from '@rematch/core';
import { TwitterModalState, TwitterModalSteps } from '@/modals/screens/twitter/models/common';
import { sha256 } from 'js-sha256';
import { getTwitterWindowUrl, VERIFICATION_MESSAGE } from '@/modals/screens/twitter/models/constants';
import { User } from '@/models/common';

export const twitterModel = createModel<RootModel>()({
  state: {
    isLoading: false,
    error: '',
    user: null,
    tweet: null,
    hash: null,
    tweetUrl: '',
    twitterHandle: 'testName',
    isCopied: false,
    isGenerated: false,
    twitterWindowUrl: null,
    currentStep: TwitterModalSteps.CONFIRM,
  } as TwitterModalState,
  reducers: {
    setUser: (state, user: User) => ({ ...state, user }),
    setTweet: (state, tweet: string) => ({ ...state, tweet }),
    setHash: (state, hash: string) => ({ ...state, hash }),
    setCurrentStep: (state, currentStep: TwitterModalSteps) => ({ ...state, currentStep }),
    setIsCopied: (state, isCopied: boolean) => ({ ...state, isCopied }),
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setTweetUrl: (state, tweetUrl: string) => ({ ...state, tweetUrl }),
    setTwitterHandle: (state, twitterHandle: string) => ({ ...state, twitterHandle }),
    setTwitterWindowUrl: (state, twitterWindowUrl: string[]) => ({ ...state, twitterWindowUrl }),
    clearState: (state) => ({} as TwitterModalState),
  },
  selectors: (slice) => ({
    selectState: () => slice((state) => state),
    selectUser: () => slice((state) => state.user),
    selectCurrentStep: () => slice((state) => state.currentStep),
    selectTweet: () => slice((state) => state.tweet),
    selectHash: () => slice((state) => state.hash),
    selectIsCopied: () => slice((state) => state.isCopied),
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
        const tweet = (VERIFICATION_MESSAGE + hash).toUpperCase();
        const twitterWindowUrl = getTwitterWindowUrl(tweet);
        this.setHash(hash);
        this.setTweet(tweet);
        this.setIsCopied(false);
        this.setIsLoading(false);
        this.setTwitterWindowUrl(twitterWindowUrl);
      }, 1000);
    },
    async verifyTweet(tweetUrl: string) {
      this.setIsLoading(true);
      setTimeout(() => {
        const urlTank = tweetUrl.split('/');
        let tweetId = urlTank[urlTank.length - 1].slice(0, 19);
        let twitterHandle = urlTank[3];
        // add call to FB/DB const url = `${VALIDATE_TWITTER_URL}/${wallet}/${tweetId}/${twitterHandle}/${userHash}`;
        // if success, set currentStep to CONFIRM
        this.setTwitterHandle(twitterHandle);
        this.setCurrentStep(TwitterModalSteps.CONFIRM);
        // if fail, setError to relevant error message
        this.setIsLoading(false);
      }, 1000);
    },
    async linkTwitterHandle([twitterHandle, user_id]: [string, number]) {
      this.setIsLoading(true);
      // update user with new twitterHandle
      // close modal
      this.setIsLoading(false);
    },
  }),
});

/**
 * @name TwitterModal
 * @summary types, text and data used for the twitter verification modal.
 */

/**
 * @const {enum} TwitterStep : Steps for twitter verification modal 
 * @const {class} TwitterModalState : twitter model state.
 */

export enum TwitterStep {
  GENERATE_HASH = 0,
  COPY_TWEET,
  TWEET_HASH,
  VERIFY_TWEET,
  LINK_ACCOUNT,
  COMPLETE,
  ERROR,
}

export class TwitterModalState {
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

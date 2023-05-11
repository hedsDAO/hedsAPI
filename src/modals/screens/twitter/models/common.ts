import { User } from '@/models/common';

/**
 * @name TwitterModalState
 * @summary types, text and data used for the profile settings modal.
 *
 */

export class TwitterModalState {
  user: User;
  currentStep: TwitterModalSteps;
  tweet: string;
  twitterWindowUrl: string[];
  tweetUrl: string;
  twitterHandle: string;
  hash: string;
  isLoading: boolean;
  error: string;
  isCopied: boolean;
  isGenerated: boolean;
}

/**
 * @name TwitterModalSteps
 * @summary steps for the twitter modal flow.
 */

export enum TwitterModalSteps {
  GENERATE_AND_COPY_TWEET = 0,
  VERIFY_TWEET,
  CONFIRM,
}

export const TWITTER_MODAL_HEADING = 'VERIFICATION';
export const VERIFICATION_MESSAGE = 'verification for @hedsDAO HDS';
export const getTwitterWindowUrl = (hashedTweet: string) => [`https://twitter.com/intent/tweet?text=${hashedTweet}`, 'mywin', 'width=700,height=700'];

//  1. GENERATE_TWEET
export const GENERATE_TWEET_HEADING = 'Generate your tweet';
export const GENERATE_TWEET_DESCRIPTION = 'Generate a unique tweet to help us connect your twitter to your account';
export const GENERATE_TWEET_BUTTON_TEXT = 'GENERATE';
export const GENERATE_TWEET_NEXT_BUTTON_TEXT = 'NEXT';

//  2. COPY_TWEET
export const COPY_TWEET_HEADING = 'Copy your tweet and press next';
export const COPY_TWEET_DESCRIPTION = 'Generate a unique tweet to help us connect your twitter to your account';
export const COPY_TWEET_BUTTON_TEXT = 'COPY';
export const COPY_TWEET_COPIED_TEXT = 'COPIED';
export const COPY_TWEET_NEXT_BUTTON_TEXT = 'NEXT';

//  3. VERIFY_TWEET
export const VERIFY_TWEET_HEADING = 'Open Twitter and tweet the copied message';
export const VERIFY_TWEET_DESCRIPTION = ['Make sure your tweet is', 'public', 'and', 'the url matches the format below'];

export const VERIFY_TWEET_EXAMPLE_TEXT = 'https://twitter.com/you/status/123456789876543210';
export const VERIFY_TWEET_SUBHEADING = 'Copy the tweet url and paste';
export const VERIFY_TWEET_SUBHEADING_DESCRIPTION = 'After posting, copy the url of the tweet and paste it in the field below to verify.';
export const VERIFY_TWEET_BUTTON_TEXT = 'VERIFY';

//  4. CONFIRM
export const CONFIRM_HEADING = 'DISCLAIMER';
export const CONFIRM_DESCRIPTION = 'Are you sure you want to link your twitter? Once linked your profile, it cannot be unlinked.';
export const CONFIRM_BUTTON_TEXT = 'CONFIRM AND LINK';
export const CONFIRM_BUTTON_CANCEL_TEXT = 'CANCEL';

//  ERRORS
export const GENERAL_ERROR_TEXT = 'There was an issue linking your twitter account, please try again later.';
export const DUPLICATE_ERROR_TEXT = 'This twitter account is already linked to another profile. Please try again with a different account.';
export const VERIFICATION_ERROR_TEXT = 'Unable to verify your tweet, please try again.';

/**
 * @api
 * @const VALIDATE_TWITTER_URL: cloud function for twitter verification and validation.
 */

export const VALIDATE_TWITTER_URL = 'https://us-central1-heds-104d8.cloudfunctions.net/twitterAuth';

/*
 * @component <SampleModel/> :
 * @const TWITTER_MODAL_TITLE : Twitter modal title.
 * @const CONFIRM_BUTTON_TEXT : Confirm twitter verification button.
 * @const BACK_BUTTON_TEXT : Exit modal test.
 */

export const TWITTER_MODAL_TITLE = 'Twitter Verification';
export const CONFIRM_BUTTON_TEXT = 'Confirm';
export const BACK_BUTTON_TEXT = 'Back';

/**
 * @component <GenerateHashForm/> :
 * @const TWITTER_MODAL_TITLE : Twitter modal title.
 * @const CONFIRM_BUTTON_TEXT : Confirm twitter verification button.
 * @const BACK_BUTTON_TEXT : Exit modal test.
 */

/*
 * @const URL : Twitter URL
 * @const TARGET : Browsing context
 * @const SIZE : Window size
 * @const VOTED_TWEET: Tweet to display;
 * @const VOTE_PAGE_LINK: Link to display;
 */

export const URL = 'https://twitter.com/intent/tweet?text=';
export const TARGET = 'mywin';
export const SIZE = 'width=700,height=700';
export const VOTED_TWEET = 'just voted on hedsTAPE';
export const VOTE_PAGE_LINK = 'https://www.heds.app/vote/';

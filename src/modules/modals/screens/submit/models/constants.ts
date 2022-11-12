/**
 * @urls Firebase (FB) Cloud Functions and URL references.
 * @const PINATA_IPFS_URL : Heds Pinata Gateway URL reference.
 * @const ID_FUNC : FB/API for generating random track IDs.
 * @const PIN_HASH_TO_IPFS_FUNC: FB/API for pinning IPFS cids (hashes) to Heds Pinata Gateway.
 */

export const PINATA_IPFS_URL = 'https://www.heds.cloud/ipfs/';
export const ID_FUNC = 'https://us-central1-heds-34ac0.cloudfunctions.net/generateId';
export const PIN_HASH_TO_IPFS_FUNC = 'https://us-central1-heds-34ac0.cloudfunctions.net/pinHashToIpfs';

/**
 * @component <UserAuthWrapper/>
 * @const CONNECT_WALLET_TEXT : Heading for connected users.
 * @const VERIFY_TWITTER_TEXT : Heading for unverified twitter users.
 * @const VERIFY_BUTTON_TEXT : Twitter verification button.
 */

export const CONNECT_WALLET_TEXT = 'Connect your wallet';
export const VERIFY_TWITTER_TEXT = 'Verify with twitter';
export const VERIFY_BUTTON_TEXT = 'Verify';

/**
 * @component <ReqsAndDisclaimer/>
 * @const SUBMIT_MODAL_TITLE : Submission modal title
 * @const REQUIREMENTS : Submission requirements checkbox text.
 * @const DISCLAIMER : Copyright disclaimer checkbox text.
 * @const EXIT_MODAL_BUTTON_TEXT : Leave to tape page button.
 * @const CONTINUE_AGREE_BUTTON_TEXT : Continue to upload button.
 * @const BPM_LABEL : BPM requirement label.
 * @const LENGTH_LABEL : Track length requirement label.
 * @const LENGTH_VALUE : Length requirement.
 * @const SAMPLE_LABEL : Total sample used requirement label.
 * @const SAMPLE_VALUE : Sample used requirement.
 */

export const SUBMIT_MODAL_TITLE = 'Upload Submission';
export const REQUIREMENTS_HEADING = 'Submission Requirements';
export const BPM_LABEL = 'BPM';
export const LENGTH_LABEL = 'Length';
export const LENGTH_VALUE = '60-90 sec';
export const SAMPLE_LABEL = 'Sample Used';
export const SAMPLE_VALUE = '> 1 sec';
export const DISCLAIMER_HEADING = 'Disclaimer';
export const REQUIREMENTS = 'I understand that my submission may be subject to disqualification if it does not follow the requirements above.';
export const DISCLAIMER = 'I acknowledge that my submission contains no copyrighted content.';
export const EXIT_MODAL_BUTTON_TEXT = 'Exit';
export const CONTINUE_AGREE_BUTTON_TEXT = 'Accept and Continue';

/**
 * @component <UploadSubmission/>
 * @const VALID_FILE_TYPES : Web MIME types refer to {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types}.
 * @const VALID_FILE_EXT : Common text value of accepted file extensions.
 * @const MAX_FILE_SIZE : Evaluated in bytes (1e^-6).
 * @const MIN_LENGTH : Minimum length of audio file.
 * @const MAX_LENGTH : Maximum length of audio file.
 * @const MAX_FILES : Maximum amount of files accepted.
 * @const BACK_TO_REQ_BUTTON_TEXT : Back to req and disclaimer page.
 * @const CONTINUE_TO_PREVIEW_BUTTON_TEXT : Continue to preview sub page.
 *
 */

export const VALID_FILE_TYPES = ['audio/mpeg', 'audio/wav'];
export const VALID_FILE_EXT = ['.mp3', '.wav'];
export const MAX_FILE_SIZE = 20000000;
export const MIN_LENGTH = 60;
export const MAX_LENGTH = 90;
export const MAX_FILES = 1;
export const BACK_TO_REQ_BUTTON_TEXT = 'Back';
export const CONTINUE_TO_PREVIEW_BUTTON_TEXT = 'Continue';

/**
 * @component <VerifyAndSubmit/>
 * @const IPFS_LOADING_TEXT : Awaiting IPFS upload.
 * @const PREVIEW_SUBMISSION_TEXT : Disclaimer to preview track before submitting.
 * @const CONFIRM_AND_UPLOAD_BUTTON_TEXT : Continue to user track confirmation/submission.
 * @const BACK_BUTTON_TEXT : Back to upload file screen.
 */

export const IPFS_LOADING_TEXT = 'uploading to ipfs...';
export const PREVIEW_SUBMISSION_TEXT = 'always preview your track before submitting...';
export const CONFIRM_AND_UPLOAD_BUTTON_TEXT = 'Upload Submission';
export const BACK_TO_UPLOAD_BUTTON_TEXT = 'Back to upload';

/**
 * @component <PrevSubmission/>
 * @const PREVIOUS_SUBMISSION_TITLE : Heading for previously submitted users.
 * @const PREVIOUS_SUBMISSION_DISLAIMER : Disclaimer for unsaved files in previous submission.
 * @const EXIT_MODAL_BUTTON_TEXT : Leave to tape page button (same as <ReqsAndDisclaimer> secondary button)
 * @const CONTINUE_TO_REQ_BUTTON_TEXT : Continue to replace submission flow.
 */

export const PREVIOUS_SUBMISSION_TITLE = 'You have previously submitted for this tape.';
export const PREVIOUS_SUBMISSION_DISCLAIMER = 'Replacing your submission will remove the previously uploaded track.';
export const CONTINUE_TO_REQ_BUTTON_TEXT = 'Replace Submission';

/**
 * @component <SubmitSucess/>
 * @const SUCCESS_TITLE : Heading for successful submission.
 * @const SUCCESS_MESSAGE_TEXT : Displays successful submission to a tape.
 * @const ANON_ID_TEXT : Users' anonymous id.
 * @const BACK_TO_TAPE : Leave modal after success button.
 */

export const SUCCESS_TITLE = 'Success';
export const SUCCESS_MESSAGE_TEXT = 'Your submission has been successfully submitted.';
export const ANON_ID_TEXT = 'Your anonymous id is';
export const BACK_TO_TAPE_BUTTON_TEXT = 'Back to tape';

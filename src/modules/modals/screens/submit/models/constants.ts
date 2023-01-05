/**
 * @component <SubmitModal/>
 * @const SUBMIT_MODAL_TITLE : Heading for submit modal.
 * @const SAVE_BUTTON_TEXT : settings save button text.
 * @const BACK_BUTTON_TEXT : exit secondary button text.
 */

export const SUBMIT_MODAL_TITLE = 'Submit';
export const SAVE_BUTTON_TEXT = 'Save';
export const BACK_BUTTON_TEXT = 'Back';

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
 * @component <PreviewSubmission/>
 * @const IPFS_LOADING_TEXT : Awaiting IPFS upload.
 * @const PREVIEW_SUBMISSION_TEXT : Disclaimer to preview track before submitting.
 * @const CONFIRM_AND_UPLOAD_BUTTON_TEXT : Continue to user track confirmation/submission.
 * @const BACK_BUTTON_TEXT : Back to upload file screen.
 */

export const IPFS_LOADING_TEXT = 'uploading to ipfs...';
export const PREVIEW_SUBMISSION_TEXT = 'Always preview your track before submitting...';
export const CONFIRM_AND_UPLOAD_BUTTON_TEXT = 'Upload Submission';
export const BACK_TO_UPLOAD_BUTTON_TEXT = 'Back to upload';

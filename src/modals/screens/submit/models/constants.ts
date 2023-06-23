import { SubmitModelSteps } from '@/modals/screens/submit/models/common';

/**
 * @const {Function} handleModelHeader
 * @description Function that returns the header text for the modal based on the current step.
 */

export const handleModalHeader = (step: SubmitModelSteps) => {
  if (step === SubmitModelSteps.TERMS) return 'CURATED BY';
  if (step === SubmitModelSteps.UPLOAD) return 'UPLOAD SUBMISSION';
  if (step === SubmitModelSteps.PREVIEW) return 'PREVIEW SUBMISSION';
  if (step === SubmitModelSteps.LOADING) return 'GENERATING SUBMISSION';
  if (step === SubmitModelSteps.SUBMIT) return 'SUBMIT SUBMISSION';
  if (step === SubmitModelSteps.SUCCESS) return 'TRACK SUBMITTED';
  if (step === SubmitModelSteps.REPLACE) return 'REPLACE SUBMISSION';
  if (step === SubmitModelSteps.ERROR) return 'ERROR';
};

/**
 * @description : Constants for the submit modal.
 * @const VALID_FILE_TYPES : Web MIME types refer to {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types}.
 * @const VALID_FILE_EXT : Common text value of accepted file extensions.
 * @const MAX_FILE_SIZE : Evaluated in bytes (1e^-6).
 * @const MIN_LENGTH : Minimum length of audio file.
 * @const MAX_LENGTH : Maximum length of audio file.
 * @const MAX_FILES : Maximum amount of files accepted.
 * @const BACK_TO_REQ_BUTTON_TEXT : Back to req and disclaimer page.
 * @const CONTINUE_TO_PREVIEW_BUTTON_TEXT : Continue to preview sub page.
 */

export const VALID_FILE_TYPES = ['audio/mpeg', 'audio/wav'];
export const VALID_FILE_EXT = ['.mp3', '.wav'];
export const MAX_FILE_SIZE = 20000000;
export const MIN_LENGTH = 60;
export const MAX_LENGTH = 90;
export const MAX_FILES = 1;
export const BACK_TO_REQ_BUTTON_TEXT = 'Back';
export const CONTINUE_TO_PREVIEW_BUTTON_TEXT = 'Continue';

export const FILE_TYPE_ERROR = 'Invalid file type';
export const FILE_SIZE_ERROR = 'File too large.';
export const FILE_LENGTH_ERROR = 'Submissions must be between 60-90 sec.';

export const handleFileExt = (file: File) => {
  return file?.type === 'audio/mpeg' ? '.mp3' : '.wav';
};
export const REPLACE_TEXT_INFO = 'REPLACING YOUR SUBMISSION WILL OVERWRITE THE CURRENT TRACK.'
export const REPLACE_TEXT_WARNING = 'THIS CANNOT BE UNDONE.'
export const REPLACE_BUTTON_TEXT = 'REPLACE';
export const REPLACE_BACK_BUTTON_TEXT = 'BACK';
export const LOADING_SCREEN_TEXT = `this will take a few moments`;
export const CONTINUE_BUTTON_TEXT = 'CONTINUE';
export const SUCCESS_TEXT = `DON'T SHARE THESE DETAILS.`;
export const SUCCESS_WARNING_TEXT = `SUBMISSION NAMES MUST STAY ANONYMOUS.`;
export const EXIT_BUTTON_TEXT = `EXIT`;
export const UPLOAD_BUTTON_TEXT = `UPLOAD`;
export const COUNTDOWN_HEADER_TEXT = 'SUBMISSIONS CLOSE IN';
export const TERMS_CONTINUE_BUTTON_TEXT = 'CONTINUE';
export const TERMS_BACK_RADIO_TEXT = 'I UNDERSTAND AND AGREE';
export const DISCLAIMER_TEXT_TITLE = 'BEFORE YOU SUBMIT';
export const DISCLAIMER_TEXT_BODY = (bpm: string | number) => [
  `All submissions must be `,
  `original `,
  `and `,
  `not contain any copyrighted content. `,
  `The track must be `,
  `${bpm} BPM `,
  `and have a length between `,
  `60 to 90 seconds. `,
];

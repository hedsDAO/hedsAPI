import { SubmitModelSteps } from './submitModel';

export const MODAL_HEADER_TEXT = 'CURATED BY:';

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

export const handleModalHeader = (step: SubmitModelSteps) => {
  if (step === SubmitModelSteps.TERMS) return 'CURATED BY:';
  if (step === SubmitModelSteps.UPLOAD) return 'UPLOAD SUBMISSION';
  if (step === SubmitModelSteps.PREVIEW) return 'PREVIEW SUBMISSION';
  if (step === SubmitModelSteps.UPLOADING) return 'UPLOADING';
  if (step === SubmitModelSteps.SUBMIT) return 'SUBMIT SUBMISSION';
  if (step === SubmitModelSteps.SUCCESS) return 'TRACK SUBMITTED';
  if (step === SubmitModelSteps.REPLACE) return 'REPLACE SUBMISSION';
  if (step === SubmitModelSteps.ERROR) return 'ERROR';
};

// Global Variables
export const PINATA_IPFS_URL = 'https://www.heds.cloud/ipfs/';
export const GENERATE_ID_FUNC = 'https://us-central1-heds-34ac0.cloudfunctions.net/generateId';
export const PIN_HASH_TO_IPFS_FUNC = 'https://us-central1-heds-34ac0.cloudfunctions.net/pinHashToIpfs';

export enum SubmitSteps {
  REQS_AND_DISCLAIMER = 0,
  UPLOAD_SUBMISSION,
  VERIFY_AND_SUBMIT,
  SUCCESS,
  PREVIOUS_SUBMISSION,
}

export const SubmitModalTitle = 'Upload Submission';

export class ReqsAndDisclaimerText {
  requirements = 'I understand that my submission may be subject to disqualification if it does not follow the requirements above.';
  disclaimer = 'I acknowledge that my submission contains no copyrighted content.';
}

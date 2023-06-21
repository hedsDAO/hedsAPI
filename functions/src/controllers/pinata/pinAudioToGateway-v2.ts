import axios from 'axios';
import * as admin from 'firebase-admin';
import FormData from 'form-data';
import * as functions from 'firebase-functions';

/**
 * @function pinAudioToGateway - Pin a single audio submission to IPFS through Pinata's gateway.
 * @version 2.0.0
 *
 * @param {string} tempAudioRef - The name of the audio file in the temp folder.
 * @param {number} user_id - The user_id of the user who submitted the audio.
 * @param {number} tape_id - The tape_id of the tape the audio was submitted to.
 * @param {string} submissionId - The submissionId of the submission.
 */

export const pinAudioToGateway = async (tempAudioRef: string, user_id: number, tape_id: number, submissionId: string) => {
  try {
    const tempFile = await admin
      .storage()
      .bucket()
      .file('temp/' + tempAudioRef)
      .get();
    const filePath = await tempFile[0].getMetadata().then((res) => res[0].name.split('temp/')[1]);
    const fileStream = tempFile[0].createReadStream();
    const data = new FormData();
    const pinataMetadata = {
      name: `${user_id}-${submissionId}`,
      keyvalues: {
        id: user_id,
        tape: tape_id,
      },
    };
    data.append('pinataMetadata', JSON.stringify({ ...pinataMetadata }));
    data.append('file', fileStream, { filepath: filePath });
    await axios
      .post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
        maxBodyLength: Infinity,
        headers: {
          pinata_api_key: `${process.env.PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.PINATA_API_SECRET}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async (response) => {
        if (tempAudioRef !== 'test.mp3') await tempFile[0].delete();
        return response.data.IpfsHash;
      })
      .catch((error) => functions.logger.log('error pinning audio to gateway', error));
  } catch (error) {
    functions.logger.log('error pinning audio to gateway', error);
    return;
  }
};

import axios from 'axios';
import FormData from 'form-data';
import * as functions from 'firebase-functions';
import axiosRetry from 'axios-retry';

/**
 * @function pinImageToGateway - Pin an image to IPFS through Pinata's gateway.
 * @version 2.0.0
 * 
 * @param {string} imageUrl - The url of the image file to pin to gateway.
 * @param {number} user_id - The user_id of the user who submitted the audio.
 * @param {number} tape_id - The tape_id of the tape the audio was submitted to.
 * @param {string} submissionId - The submissionId of the submission.
 */

export const pinImageToGateway = async (imageUrl: string, user_id: number, tape_id: number, submissionId: string) => {
  try {
    const data = new FormData();
    const pinataMetadata = {
      name: `${tape_id}-ai-${submissionId}-${user_id}`,
      keyvalues: { id: user_id, tape: tape_id },
    };
    data.append('pinataMetadata', JSON.stringify({ ...pinataMetadata }));
    const axiosInstance = axios.create();
    axiosRetry(axiosInstance, { retries: 5 });
    const sourceData = await axiosInstance(imageUrl, {
      method: 'GET',
      responseType: 'stream',
    });
    data.append('file', sourceData.data);
    await axios
      .post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
        maxBodyLength: Infinity,
        headers: {
          pinata_api_key: `${process.env.PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.PINATA_API_SECRET}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const ipfsImageUrl = response?.data?.IpfsHash;
        return ipfsImageUrl;
      })
      .catch((error) => functions.logger.log(error));
  } catch (error) {
    functions.logger.log(error);
    return;
  }
};

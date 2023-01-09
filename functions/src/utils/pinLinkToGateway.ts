import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';
import FormData from 'form-data';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { Options, TypedRequestBody } from '../common';

// The express instance
const app = express.default();

// Automatically allow cross-origin requests
app.use(cors.default({ origin: true }));

app.post('/', (request: TypedRequestBody<{ options: Options }>, response: express.Response) => {
  functions.logger.log(request.body.options, 'req body options');
  (async function () {
    const data = new FormData();
    data.append('pinataMetadata', JSON.stringify({ ...request.body.options.pinataMetadata }));
    const axiosInstance = axios.create();
    axiosRetry(axiosInstance, { retries: 5 });
    const sourceData = await axiosInstance(request.body.options.sourceUrl, {
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
      .then((res) => response.status(200).json(res.data))
      .catch((err) => response.status(400).json(err));
  })();
});

// Expose Express API as a single Cloud Function:
export default functions.https.onRequest(app);

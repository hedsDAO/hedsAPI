import * as express from 'express';
import * as functions from 'firebase-functions';
import axios from 'axios';

export const unpinHashFromGateway = async (req: express.Request, res: express.Response) => {
  functions.logger.log(req.params?.ipfsCid);
  var config = {
    method: 'delete',
    url: `https://api.pinata.cloud/pinning/unpin/${req.params.ipfsCid}`,
    headers: {
      pinata_api_key: `${process.env.PINATA_API_KEY}`,
      pinata_secret_api_key: `${process.env.PINATA_API_SECRET}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  await axios(config)
    .then((response) => {
      if (response.status === 200) return res.status(200).json(res);
      return res.status(404);
    })
    .catch((err) => {
      functions.logger.log(err);
      console.log(err);
      return res.status(400);
    });
};

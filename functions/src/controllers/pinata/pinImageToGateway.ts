import * as express from "express";
import * as functions from "firebase-functions";
import FormData from "form-data";
import axios from "axios";
import axiosRetry from "axios-retry";

export const pinImageToGateway = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  functions.logger.log(req.params?.space, req.params?.tape, req.params?.id, "params: space, tape, id, wallet");
  functions.logger.log(req.params?.wallet, "params: wallet");
  if (req.params?.space && req.params?.tape && req.params?.id && req.params?.wallet) {
    const {imageUrl} = res.locals;
    const data = new FormData();
    const pinataMetadata = {
      name: `${req.params.id}-ai-${req.params.wallet}`,
      keyvalues: {
        id: req.params.id,
        tape: req.params.tape,
        space: req.params.space,
      },
    };
    data.append("pinataMetadata", JSON.stringify({...pinataMetadata}));
    const axiosInstance = axios.create();
    axiosRetry(axiosInstance, {retries: 5});
    const sourceData = await axiosInstance(imageUrl, {
      method: "GET",
      responseType: "stream",
    });
    data.append("file", sourceData.data);
    await axios
        .post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
          maxBodyLength: Infinity,
          headers: {
            "pinata_api_key": `${process.env.PINATA_API_KEY}`,
            "pinata_secret_api_key": `${process.env.PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          res.locals.subArtIpfsHash = response.data?.IpfsHash;
          next();
        })
        .catch(() => res.status(400));
  }
  return res.status(400);
};

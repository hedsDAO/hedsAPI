import * as express from "express";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import FormData from "form-data";
import axios from "axios";

export const pinAudioToGateway = async (req: express.Request, res: express.Response) => {
  functions.logger.log(req.params?.space, req.params?.tape, req.params?.id, req.params?.wallet, "params: space, tape, id, wallet");
  functions.logger.log(req.params?.audioRef, "params: audioRef");
  try {
    const tempFile = await admin.storage().bucket("gs://heds-104d8.appspot.com").file(req.params.audioRef).get();
    const filePath = await tempFile[0].getMetadata().then((res) => res[0].name.split("temp/")[1]);
    const fileStream = tempFile[0].createReadStream();
    const data = new FormData();
    const pinataMetadata = {
      name: `${req.params.id}-${req.params.wallet}`,
      keyvalues: {
        id: req.params.id,
        tape: req.params.tape,
        space: req.params.space,
      },
    };
    data.append("pinataMetadata", JSON.stringify({...pinataMetadata}));
    data.append("file", fileStream, {
      filepath: filePath,
    });
    await axios
        .post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
          maxBodyLength: Infinity,
          headers: {
            "pinata_api_key": `${process.env.PINATA_API_KEY}`,
            "pinata_secret_api_key": `${process.env.PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (response) => {
          functions.logger.log(response.data?.IpfsHash, "response.data.IpfsHash");
          res.locals.audioLinkHash = response.data?.IpfsHash;
          await tempFile[0].delete();
          return res.status(201), res.json({subId: res.locals.subId, subArtIpfsHash: res.locals?.subArtIpfsHash, audioLinkIpfsHash: response.data?.IpfsHash});
        })
        .catch(() => res.status(400));
  } catch {
    return res.status(400);
  }

  return res.status(400);
};

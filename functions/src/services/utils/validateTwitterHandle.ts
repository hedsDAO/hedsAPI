import * as express from "express";
import {getFirestore} from "firebase-admin/firestore";
import * as functions from "firebase-functions";

export const validateTwitterHandle = async (req: express.Request, res: express.Response) => {
  const {response} = res.locals; // twitter-v2 lookup response;
  functions.logger.log("locals:", response, "tweet lookup res");
  functions.logger.log("params:", req.params.wallet, "wallet", req.params.tweetId, "tweetId", req.params.twitterHandle, "userHash", req.params.userHash);
  const db = getFirestore();
  const docRef = db.collection("twitter").doc(req.params.twitterHandle);
  const handleExists = await (await docRef.get())?.exists;
  functions.logger.log("handleExists:", handleExists);
  if (handleExists) {
    return res.status(400).json({validated: false});
  } else if (response?.data?.[0]?.text?.split("HDS")[1] === req.params.userHash) {
    return res.status(200).json({validated: true});
  } else return res.status(400).json({validated: false});
};

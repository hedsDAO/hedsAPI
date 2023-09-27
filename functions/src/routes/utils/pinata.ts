import * as express from 'express';
import { pinFileToIpfs, unpinFromIpfs } from '../../controllers/utils/pinata';
import * as functions from "firebase-functions";

const router = express.Router();

/**
 * Validate a given display name.
 *
 * @route GET /validate-display-name/:displayName
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
router.post('/file', async (req, res) => {
  functions.logger.log("body", req.body);
  const formData = req.body;

  const pinataPinResult = await pinFileToIpfs(formData);
  functions.logger.log("pinata pin result", pinataPinResult);
  if (pinataPinResult.data.IpfsHash) {
    return res.status(200).json(pinataPinResult.data);
  } else {
    return res.status(400).send("error pinning file");
  }
});

/**
 * Validate a given display name.
 *
 * @route GET /validate-display-name/:displayName
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 */
 router.delete('/:CID', async (req, res) => {
    functions.logger.log("params", req.params);
    const { CID } = req.params;
  
    const pinataUnpinResult = await unpinFromIpfs(CID);
    functions.logger.log("pinata unpin result", pinataUnpinResult);
    if (pinataUnpinResult.data.IpfsHash) {
      return res.status(200).json(pinataUnpinResult.data);
    } else {
      return res.status(400).send("error unpinning file");
    }
  });

  export default router;
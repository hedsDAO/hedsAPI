import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import FormData from 'form-data';
import * as functions from 'firebase-functions';
export interface RequestWithFile extends Request {
  files?: any;
}

/**
  * Pins a file to the Pinata IPFS gateway.
  * @param {string} fieldName The name of the field in the request body that contains the file.
 */
export function pinFileToGateway(fieldName: string) {
  return async (req: RequestWithFile, res: Response, next: NextFunction) => {
    functions.logger.info(`Pinning file to gateway for field name: ${fieldName}`);
    functions.logger.info(`audio: ${req.files ? true : false}`);

    if (!req.files) {
        return res.status(400).send(`No file uploaded for field name: ${fieldName}`);
    }
    const fileBuffer = req.files[fieldName][0].buffer;
    const data = new FormData();
    
    // Metadata for pinata can be customized as needed
    const pinataMetadata = {
      name: fieldName,
      keyvalues: {
        fieldName: fieldName,
      },
    };

    data.append('pinataMetadata', JSON.stringify(pinataMetadata));
    data.append('file', fileBuffer, { filename: fieldName });

    try {
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
        maxBodyLength: Infinity,
        headers: {
          ...data.getHeaders(),
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_API_SECRET,
        },
      });

      // Save the IPFS hash (CID) to res.locals
      res.locals[`${fieldName}IpfsHash`] = response.data.IpfsHash;

      return next();
    } catch (error) {
      // Error handling
      console.error(error);
      next(error)
    }
  };
}

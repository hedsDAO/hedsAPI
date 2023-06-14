import axios from 'axios';
// import { Request, Response, NextFunction } from 'express';
import FormData from 'form-data';
import * as functions from 'firebase-functions';
// export interface RequestWithFile extends Request {
//   files?: any;
// }

/**
  * Pins a file to the Pinata IPFS gateway.
  * @param {string} fieldName The name of the field in the request body that contains the file.
 */
export async function pinFileToGateway(link: string, name: string) {
    const response = await axios.get(link, { responseType: 'arraybuffer' });
    functions.logger.info(`Pinning file to gateway for field name: ${name}`);

    const data = new FormData();
    
    // Metadata for pinata can be customized as needed
    const pinataMetadata = {
      name: name,
      keyvalues: {
        fieldName: name,
      },
    };

    data.append('pinataMetadata', JSON.stringify(pinataMetadata));
    data.append('file', response.data, name);

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
      // res.locals[`${name}IpfsHash`] = response.data.IpfsHash;
      functions.logger.log("IpfsHash: ", response.data.IpfsHash);

      return response.data.IpfsHash;
    } catch (error) {
      // Error handling
      console.error(error);
      // next(error)
    }
  };

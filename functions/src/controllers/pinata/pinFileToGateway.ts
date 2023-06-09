import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import FormData from 'form-data';

export function pinFileToGateway(fieldName: string) {
  return async (req: Request, res: Response, next: NextFunction) => {

    if (!req.files) {
        return res.status(400).send(`No file uploaded for field name: ${fieldName}`);
    }
    const fileBuffer = (req.files as { [fieldname: string]: Express.Multer.File[] })[fieldName][0].buffer;
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

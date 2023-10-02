import axios from "axios";
import { Proposal } from "hedsvote";
import * as functions from "firebase-functions";
// import { Readable } from "stream";
import FormData  from "form-data";

/**
 * Pins a proposal to IPFS
 * @param {Proposal} proposal - The proposal to pin to IPFS
 * @return {string} The IPFS hash of the pinned proposal
 * @throws {Error} If issue with pinning to IPFS
 */
 export const pinProposalToIpfs = async (proposal: Proposal) => {
    const {author, title} = proposal;
    const data = JSON.stringify({
      "pinataOptions": {
        "cidVersion": 1,
      },
      "pinataMetadata": {
        "name": `${title}`,
        "keyvalues": {
          "author": `${author}`,
        },
      },
      "pinataContent": proposal,
    });
  
    const config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        accept: 'application/json',
        "Authorization": `Bearer ${process.env.PINATA_JWT}`,
      },
      data: data,
    };
  
    try {
      const ipfsHashObject = await axios(config);
      return ipfsHashObject.data.IpfsHash;
    } catch (e: any) {
      console.log(e);
      throw new Error(e);
    }
  };

/**
 * Pins a file to IPFS using the Pinata service.
 *
 * @async
 * @function
 * @param {data} Buffer - The file as a Buffer to be pinned to IPFS.
 * @returns {Promise<Object>} Returns a promise that resolves into a response object from Pinata service. 
 * The response object should contain information about the pinned file.
 * @throws Will throw an error if pinning process to IPFS fails, or if there is a network error.
 * @example
 * try {
 *   const pinResponse = await pinFileToIpfs(formData);
 *   console.log(pinResponse);
 * } catch (error) {
 *   console.error('Failed to pin file to IPFS:', error);
 * }
 */
  export const pinFileToIpfs = async (buffer: Buffer, metadata: { name: string, keyvalues: { id: string, type: string}}) => {
    // const stream = Readable.from(buffer)
    const formData = new FormData();
    formData.append('file', buffer, { filepath: metadata.name});
    formData.append("pinataMetadata", JSON.stringify(metadata));
    const options = {
      method: 'POST',
      url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
      maxBodyLength: Infinity,
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: process.env.PINATA_JWT,
      },
      formData
    };

    try {
      const response = await axios.post(options.url, formData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': `multipart/form-data`,
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
      });
  
      if (!response.data) {
        throw new Error("no repsonse after attempting to pin file");
      }
      functions.logger.log("ipfs Object", response.data)
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  /**
   * Unpins a CID from IPFS
   * @param {string} CID - The CID to unpin
   * @returns {string} The unpinned CID
   * @throws {Error} If issue with unpinning from IPFS
   */
  
  export const unpinFromIpfs = async (CID: string) => {
    functions.logger.log(CID);
    const config = {
      method: "delete",
      url: `https://api.pinata.cloud/pinning/unpin/${CID}`,
      headers: {
        accept: 'application/json',
        "Authorization": `Bearer ${process.env.PINATA_JWT}`,
      },
    };
    try {
      const ipfsUnpinObject = await axios(config);
      functions.logger.log("file unpinned", ipfsUnpinObject);
      return ipfsUnpinObject;
    } catch (e: any) {
      console.log(e);
      throw new Error(e);
    }
  };
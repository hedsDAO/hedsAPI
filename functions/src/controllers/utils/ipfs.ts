import axios from "axios";
import { Proposal } from "hedsvote";
import * as functions from "firebase-functions";

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
        "Content-Type": "application/json",
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
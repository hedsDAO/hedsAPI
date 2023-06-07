import axios from "axios";
import { TapeData } from "../tapes/types";


/**
 * Pins a proposal to IPFS
 * @param {TapeData} proposal - The proposal to pin to IPFS
 * @return {string} The IPFS hash of the pinned proposal
 * @throws {Error} If issue with pinning to IPFS
 */
 export const pinJSONToIpfs = async (tape: TapeData) => {
    const {name} = tape;
    const data = JSON.stringify({
      "pinataOptions": {
        "cidVersion": 1,
      },
      "pinataMetadata": {
        "name": `${name}`
      },
      "pinataContent": tape,
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
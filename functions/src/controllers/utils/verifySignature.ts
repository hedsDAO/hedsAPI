import {ethers} from "ethers-ts";

/**
 * Verifies the provided signature and recovers the address that signed the message.
 * @param {string} message - The message that was signed.
 * @param {string} signature - The signature provided by the signer.
 * @return {Promise<string>} The recovered address of the signer.
 */
export async function verifySignature(message: string, signature: string): Promise<string> {
    return ethers.utils.verifyMessage(message, signature);
  }
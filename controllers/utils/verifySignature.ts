// import {ethers} from "ethers-ts";
// import { recoverMessageAddress } from "viem"
// import {Request, Response, NextFunction} from "express";

// /**
//  * Verifies the provided signature and recovers the address that signed the message.
//  * @param {Request} req - The request object.
//  * @param {Response} res - The response object.
//  * @param {NextFunction} next - The next function in the express middleware.
//  */
//  export const verifySignature = async (req: Request, res: Response, next:NextFunction) => {
//     try {
//       const { message, signature, adminWallet } = req.body;
//       const signerAddress = ethers.utils.verifyMessage(message, signature).toLowerCase();
//       if (signerAddress !== adminWallet) {
//       return res.status(401).send('Unauthorized');
//       }

//       res.locals.signerAddress = signerAddress;

  
//       return next();
//     } catch (error) {
//       return next(error);
//     }
//   };

//   /**
//  * Verifies the provided signature and recovers the address that signed the message.
//  * @param {string} message - The message that was signed.
//  * @param {string} signature - The signature provided by the signer.
//  * @return {Promise<string>} The recovered address of the signer.
//  */
// export async function verifyWalletSignature(message: string, signature: `0x${string}`): Promise<string> {
//   return recoverMessageAddress({message, signature});
// }
  
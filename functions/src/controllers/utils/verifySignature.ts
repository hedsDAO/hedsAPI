import {ethers} from "ethers-ts";
import {Request, Response, NextFunction} from "express";

/**
 * Verifies the provided signature and recovers the address that signed the message.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the express middleware.
 */
 export const verifySignature = async (req: Request, res: Response, next:NextFunction) => {
    try {
      const { message, signature, adminWallet } = req.body;
      const signerAddress = ethers.utils.verifyMessage(message, signature).toLowerCase();
      if (signerAddress !== adminWallet) {
      return res.status(401).send('Unauthorized');
      }

      res.locals.signerAddress = signerAddress;

  
      return next();
    } catch (error) {
      return next(error);
    }
  };
  
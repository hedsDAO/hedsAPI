import { Request, Response, NextFunction } from 'express';
import { pool } from '../../database';
import schemaName from '../../../config';
import * as functions from 'firebase-functions';

/**
 * Verifies if the user is an admin.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the express middleware.
 */
export const checkAdminStatus = async (req: Request, res: Response, next: NextFunction) => {
    const adminWallet = "0x55c59ae5b124261d021421f07c6cad699c993b3d"  // get the signer address from res.locals
    functions.logger.info(`body: ${req.body}`);
    functions.logger.info(`songData: ${req.body.songData}`);
    functions.logger.info(`tapeData: ${req.body.tapeData}`);
    functions.logger.info(`wallet: ${req.body.curatorWallet}`);
    functions.logger.info(`audio: ${req.body.sampleAudio ? true : false}`);
    functions.logger.info(`image: ${req.body.coverImage ? true : false}`);
  
    try {
      const { rows: adminRows } = await pool.query(`SELECT id, role FROM ${schemaName}.users WHERE wallet = $1`, [adminWallet]);
  
      if (adminRows.length === 0 || adminRows[0].role !== 'admin') {
        return res.status(403).send('User is not an admin'); // Forbidden
      }
  
      // If the user is an admin, attach their id to res.locals
      res.locals.adminId = adminRows[0].id;

  
      return next();
    } catch (error: any) {
      return next(error);
    }
  };
  
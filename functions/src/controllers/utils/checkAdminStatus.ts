import { Request, Response, NextFunction } from 'express';
import { pool } from '../../database';
import schemaName from '../../../config';

/**
 * Verifies if the user is an admin.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function in the express middleware.
 */
export const checkAdminStatus = async (req: Request, res: Response, next: NextFunction) => {
    const adminWallet = res.locals.signerAddress;  // get the signer address from res.locals
  
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
  
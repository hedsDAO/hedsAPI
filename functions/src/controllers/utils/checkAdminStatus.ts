import { Request, Response, NextFunction } from 'express';
import { pool } from '../../database';
import schemaName from '../../../config';

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
  
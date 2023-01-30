import { Request, Response, NextFunction } from 'express';
import * as functions from 'firebase-functions';
import * as randomData from '../../data/randomData';

export const generateId = async (req: Request, res: Response, next: NextFunction) => {
  if (req.params?.wallet?.length) {
    functions.logger.log(req.params.wallet, 'req params wallet');
    const { adjectives, animals } = randomData;
    const randomAdj = Math.ceil(Math.random() * adjectives.length);
    const randomAnimal = Math.ceil(Math.random() * animals.length);
    const submissionId = [adjectives[randomAdj], animals[randomAnimal]].join(' ');
    functions.logger.log(submissionId);
    res.locals.subId = submissionId;
    res.locals.wallet = req.params.wallet;
    if (randomAdj && randomAnimal) return next();
    else return res.status(400);
  } else return res.status(400);
};

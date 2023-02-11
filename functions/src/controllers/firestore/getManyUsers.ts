import * as express from 'express';
import * as functions from 'firebase-functions';
import { getFirestore, DocumentData } from 'firebase-admin/firestore';
import admin from 'firebase-admin';

export const getManyUsers = async (req: express.Request, res: express.Response) => {
  functions.logger.log(req?.body?.users || 'no body');

  const firestore = getFirestore();
  const UID = admin.firestore.FieldPath.documentId();
  const arrOfUsers = req?.body?.users;
  let usersTank = {} as { [key: string]: DocumentData };
  /**
   * @name queryFirebaseData
   * @param {string[]} currentUserQueue array of wallets to query
   * @description queries firestore by wallets for user data, pushs to usersTank.
   * @return {Promise<undefined>}
   */
  function queryFirebaseData(currentUserQueue: string[]) {
    return new Promise(async (resolve) => {
      await firestore
        .collection('users')
        .where(UID, 'in', currentUserQueue)
        .get()
        .then((snap) => {
          snap.docs.map((doc) => {
            usersTank[doc.id] = doc.data();
          });
        });
      resolve('');
    });
  }

  if (arrOfUsers?.length) {
    const numOfRequests = Math.ceil(arrOfUsers.length / 10);
    for (let i = 0; i < numOfRequests; i++) {
      const factor = i * 10;
      const margin = factor + 10 > arrOfUsers.length ? arrOfUsers.length : factor + 10;
      const currentUserQueue: string[] = arrOfUsers.slice(factor, margin).map((wallet: string) => wallet.toLowerCase());
      await queryFirebaseData(currentUserQueue);
    }
    return res.status(200), res.json(usersTank);
  }
  return res.status(400), res.send('no wallets provided');
};

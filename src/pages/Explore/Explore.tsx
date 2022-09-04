import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../App';

export const Explore = ({ wallet }: { wallet?: string }) => {
  const firebaseTest = async () => {
    if (wallet) {
      const docRef = doc(db, 'users', wallet.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
      }
    }
  };
  return <></>;
};

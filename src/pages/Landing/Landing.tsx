import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../src/App';

export const Landing = ({ wallet }: { wallet?: string }) => {
  const firebaseTest = async () => {
    if (wallet) {
      const docRef = doc(db, 'users', wallet.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
      }
    }
  };
  return <></>;
};

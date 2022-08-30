import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../src/App';

export const Landing = ({ wallet }: { wallet?: string }) => {
  const [userWallet, setUserWallet] = useState();
  const firebaseTest = async () => {
    if (wallet) {
      const docRef = doc(db, 'users', wallet.toLowerCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
      }
    }
  };
  return (
    <div>
      <button className="bg-amber-500" onClick={firebaseTest}>
        test me
      </button>
      <p>{userWallet}</p>
    </div>
  );
};

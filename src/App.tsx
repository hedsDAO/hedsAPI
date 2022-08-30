import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing/Landing';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBL3xNUXJjHipMLaAP7EOD4KfVDeQe6Jq8',
  authDomain: 'heds-34ac0.firebaseapp.com',
  projectId: 'heds-34ac0',
  storageBucket: 'heds-34ac0.appspot.com',
  messagingSenderId: '951859114471',
  appId: '1:951859114471:web:a8e6cfe3751dd063040d42',
  measurementId: 'G-X21PE2JM6B',
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app, 'gs://heds-34ac0.appspot.com');

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
};

export default App;

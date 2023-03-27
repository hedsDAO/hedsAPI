import { Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import firebaseConfig from './firebaseConfig';

import { Song } from './common/song/Song';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

const App = (): JSX.Element => {
  return <Song />;
};

export default App;

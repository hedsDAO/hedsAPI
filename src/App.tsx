import { Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import firebaseConfig from './firebaseConfig';

import { Tape } from './pages/Tape/Tape';
import { Song } from './pages/Song/Song';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/song/:id" element={<Song />} />
      <Route path="/tape/:id" element={<Tape />} />
    </Routes>
  );
};

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import Navigation from './components/Navigation';
import { About } from '@pages/About/About';
import { Explore } from '@pages/Explore/Explore';
import { Artists } from '@pages/Artists/Artists';
import { Vote } from '@pages/Vote/Vote';
import { Tapes } from '@pages/Tapes/Tapes';
import { User } from '@pages/User/User';
import Footer from './components/Footer';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBL3xNUXJjHipMLaAP7EOD4KfVDeQe6Jq8',
//   authDomain: 'heds-34ac0.firebaseapp.com',
//   projectId: 'heds-34ac0',
//   storageBucket: 'heds-34ac0.appspot.com',
//   messagingSenderId: '951859114471',
//   appId: '1:951859114471:web:a8e6cfe3751dd063040d42',
//   measurementId: 'G-X21PE2JM6B',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyAooTUjBN2EaCg9X6w0sYbRz2ba9_6mdYw',
  authDomain: 'hedsdev.firebaseapp.com',
  projectId: 'hedsdev',
  storageBucket: 'hedsdev.appspot.com',
  messagingSenderId: '1071073703557',
  appId: '1:1071073703557:web:4ed7423ed84d6fe1205bec',
  measurementId: 'G-J3NSZFZDS3',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app, 'gs://heds-34ac0.appspot.com');

const App = (): JSX.Element => {
  return (
    <div>
      <Navigation />
      <div className='min-h-[90vh]'>
      <Routes>
        <Route path="/u/:wallet" element={<User />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/Vote" element={<Vote />} />
        <Route path="/tapes" element={<Tapes />} />
      </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;

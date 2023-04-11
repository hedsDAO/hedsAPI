import { Fragment } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from './firebaseConfig';

import { Tape } from '@pages/tape/screens/Tape';
import { Song } from '@pages/song/screens/Song';
import { User } from '@/pages/user/screens/User';
import { Footer } from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar/Navbar';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

const App = (): JSX.Element => {
  const NavAndFooterWrapper = (
    <Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </Fragment>
  );

  return (
    <Routes>
      <Route element={NavAndFooterWrapper}>
        <Route path="/u/:wallet" element={<User />} />
        <Route path="/s/:cid" element={<Song />} />
        <Route path="/t/:id" element={<Tape />} />
      </Route>
    </Routes>
  );
};

export default App;

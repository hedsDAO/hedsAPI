import { Fragment } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { Footer, Navbar } from './modules/navigation';
import { User } from './pages/user/page/User';
import { Tapes } from './pages/tapes/page/Tapes';
import { Artists } from './pages/artists/page/Artists';
import { Listen } from './pages/listen/page/Listen';
import { Vote } from './pages/vote/page/Vote';
import { Explore } from './pages/explore/page/Explore';
import { Landing } from './pages/landing/page/Landing';

const firebaseConfig = {
  apiKey: process.env.FB_DEV_API,
  authDomain: process.env.FB_DEV_AUTHDOMAIN,
  projectId: process.env.FB_DEV_PROJECT_ID,
  storageBucket: process.env.FB_DEV_STORAGE,
  messagingSenderId: process.env.FB_DEV_MSG_SENDER_ID,
  appId: process.env.FB_DEV_APP_ID,
  measurementId: process.env.FB_DEV_MESUREMENT_ID,
};

// TODO: add conditional for dev/prod
const app = initializeApp(process.env.NODE_ENV === 'development' && firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app, `gs://${process.env.FB_PROD_STORAGE}`);

const App = (): JSX.Element => {
  const location = useLocation();

  return location.pathname === '/' ? (
    <Landing />
  ) : (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/tapes" element={<Tapes />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/u/:wallet" element={<User />} />
        <Route path="/listen/:space/:tape/:id" element={<Listen />} />
        <Route path="/vote/:space/:tape/:id" element={<Vote />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
      <Footer />
    </Fragment>
  );
};

export default App;

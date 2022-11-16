import { Fragment } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Navigation, Footer } from '@/common/navs';
import { Explore } from '@/pages/explore/pages/Explore';
import { Artists } from '@/pages/artists/page/Artists';
import { Tapes } from '@/pages/tapes/page/Tapes';
import { Collab } from '@/pages/collab/page/Collab';
import { User } from '@/pages/user/page/User';
import { Listen } from '@/pages/listen/page/Listen';
import { Profile } from '@/pages/profile/page/Profile';
import { Landing } from '@pages/landing/page/Landing';

const firebaseConfig = {
  apiKey: process.env.FB_DEV_API,
  authDomain: process.env.FB_DEV_AUTHDOMAIN,
  projectId: process.env.FB_DEV_PROJECT_ID,
  storageBucket: process.env.FB_DEV_STORAGE,
  messagingSenderId: process.env.FB_DEV_MSG_SENDER_ID,
  appId: process.env.FB_DEV_APP_ID,
  measurementId: process.env.FB_DEV_MESUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(app, `gs://${process.env.FB_PROD_STORAGE}`);

const App = (): JSX.Element => {
  const location = useLocation();

  return location.pathname === '/' ? (
    <Landing />
  ) : (
    <Fragment>
      <Navigation />
      <Routes>
        <Route path="/u/:wallet" element={<User />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/tapes" element={<Tapes />} />
        <Route path="/collab" element={<Collab />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/listen/:space/:tape/:id" element={<Listen />} />
      </Routes>
      <Footer />
    </Fragment>
  );
};

export default App;

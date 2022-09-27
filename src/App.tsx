import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Navigation } from '@/common/components/Navigation';
import { Footer } from '@/common/components/Footer';
import { About } from '@/modules/about/pages/About';
import { Explore } from '@/modules/explore/pages/Explore';
import { Artists } from '@/modules/artists/pages/Artists';
import { Vote } from '@/modules/vote/pages/Vote';
import { Tapes } from '@/modules/tapes/pages/Tapes';
import { User } from '@/modules/user/User/User';
import { Listen } from '@/modules/listen/pages/Listen';
import { Profile } from '@/modules/profile/pages/Profile';

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
  return (
    <Fragment>
      <Navigation />
      <Routes>
        <Route path="/u/:wallet" element={<User />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/Vote" element={<Vote />} />
        <Route path="/tapes" element={<Tapes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/listen/:space/:tape/:id" element={<Listen />} />
      </Routes>
      <Footer />
    </Fragment>
  );
};

export default App;

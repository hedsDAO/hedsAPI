import { Routes, Route, useLocation } from 'react-router-dom';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

import { NavbarFooterWrapper } from './modules/navigation';
import { User } from './pages/user/page/User';
import { Tapes } from './pages/tapes/page/Tapes';
import { Artists } from './pages/artists/page/Artists';
import { Listen } from './pages/listen/page/Listen';
import { Vote } from './pages/vote/page/Vote';
import { Explore } from './pages/explore/page/Explore';
import { Landing } from './pages/landing/page/Landing';

const stagingFirebaseConfig = (): FirebaseOptions => ({
  apiKey: process.env.FB_STAGING_API,
  authDomain: process.env.FB_STAGING_AUTHDOMAIN,
  projectId: process.env.FB_STAGING_PROJECT_ID,
  storageBucket: process.env.FB_STAGING_STORAGE,
  messagingSenderId: process.env.FB_STAGING_MSG_SENDER_ID,
  appId: process.env.FB_STAGING_APP_ID,
  measurementId: process.env.FB_STAGING_MEASUREMENT_ID,
});

const prodFirebaseConfig = (): FirebaseOptions => ({
  apiKey: process.env.FB_PROD_API,
  authDomain: process.env.FB_PROD_AUTHDOMAIN,
  projectId: process.env.FB_PROD_PROJECT_ID,
  storageBucket: process.env.FB_PROD_STORAGE,
  messagingSenderId: process.env.FB_PROD_MSG_SENDER_ID,
  appId: process.env.FB_PROD_APP_ID,
  measurementId: process.env.FB_PROD_MEASUREMENT_ID,
});

const prodApp: FirebaseApp = initializeApp(prodFirebaseConfig());
const stagingApp: FirebaseApp = initializeApp(stagingFirebaseConfig(), 'staging');
const prodDb: Firestore = getFirestore(prodApp);
const stagingDB: Firestore = getFirestore(stagingApp);

export const db: Firestore = process.env.NODE_ENV === 'production' ? prodDb : stagingDB;
export const storage: FirebaseStorage = getStorage(prodApp, `gs://${process.env.FB_PROD_STORAGE}`);

const App = (): JSX.Element => {
  const location = useLocation();
  const isLanding = location?.pathname === '/';
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route element={!isLanding ? <NavbarFooterWrapper /> : <></>}>
        <Route path="/tapes" element={<Tapes />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/u/:wallet" element={<User />} />
        <Route path="/listen/:space/:tape/:id" element={<Listen />} />
        <Route path="/vote/:space/:tape/:id" element={<Vote />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/explore" element={<Explore />} />
      </Route>
    </Routes>
  );
};

export default App;

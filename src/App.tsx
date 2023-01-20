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
import firebaseConfig from '../firebase/firebaseConfig';

const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);;
export const storage: FirebaseStorage = getStorage(app, `gs://${process.env.FB_PROD_STORAGE}`);

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

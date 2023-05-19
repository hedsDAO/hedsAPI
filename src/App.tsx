import { Fragment } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from './firebaseConfig';

import { Tape } from '@/pages/tape/screens/Tape';
import { Song } from '@/pages/song/screens/Song';
import { User } from '@/pages/user/screens/User';
import { NotFound } from '@/pages/404/screens/NotFound';
import { FAQ } from '@/pages/faq/screens/FAQ';
import { Artists } from '@/pages/artists/screens/Artists';
import { Tapes } from '@/pages/tapes/screens/Tapes';
import { TestSDK } from '@/pages/vote/screens/TestSDK';
// import { Vote } from '@/pages/vote/screens/Vote';

import { Footer } from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar/Navbar';
import { Box } from '@chakra-ui/react';
import { Landing } from './pages/landing/screens/Landing';
import { Explore } from './pages/explore/screens/Explore';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
const App = (): JSX.Element => {
  const { pathname } = useLocation();
  const isOnHomeOrExplore = pathname === '/' || pathname === '/explore';

  const NavAndFooterWrapper = (
    <Fragment>
      <Navbar />
      <Box minH="100vh" mt={isOnHomeOrExplore ? 0 : '67px'}>
        <Outlet />
      </Box>
      <Footer />
    </Fragment>
  );

  const LandingExploreWrapper = (
    <Fragment>
      <Landing />
      <Explore />
    </Fragment>
  );

  return (
    <Routes>
      <Route element={NavAndFooterWrapper}>
        <Route path="/" element={LandingExploreWrapper} />
        <Route path="/explore" element={LandingExploreWrapper} />
        <Route path="/u/:wallet" element={<User />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/tapes" element={<Tapes />} />
        <Route path="/song/:id" element={<Song />} />
        <Route path="/t/:id" element={<Tape />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/sdk" element={<TestSDK />} />
        {/* <Route path="/Vote" element={<Vote />} /> */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;

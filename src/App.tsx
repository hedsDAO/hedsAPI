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
import { FAQPage } from '@/pages/FAQ/screens/FAQ';
import { Artists } from '@/pages/artists/screens/Artists';

import { Footer } from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar/Navbar';
import { Box } from '@chakra-ui/react';


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

  return (
    <Routes>
      <Route element={NavAndFooterWrapper}>
        <Route path="/u/:wallet" element={<User />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/song/:id" element={<Song />} />
        <Route path="/t/:id" element={<Tape />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;

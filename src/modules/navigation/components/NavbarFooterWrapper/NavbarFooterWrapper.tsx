import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@/modules/navigation/components/Footer/Footer';
import Navbar from '@/modules/navigation/components/Navbar/Navbar';

const NavbarFooterWrapper = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default NavbarFooterWrapper;

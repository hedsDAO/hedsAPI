import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

/**
 * @function ScrollWrapper
 * @description Wrapper component for landing page to manage scroll position and adding/removing event listeners.
 * @param {React.ReactNode} children - child components to render on landing page.
 * @returns {JSX.Element} - Rendered ScrollWrapper component.
 **/

export const ScrollWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    if (pathname === '/' && scrollPosition > windowHeight) {
      navigate('/explore');
    }
    if (pathname === '/explore' && scrollPosition === 0) {
      navigate('/');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    if (pathname === '/explore' && scrollPosition < windowHeight) {
      scroll.scrollTo(window.innerHeight);
      navigate('/explore');
    }
    if (pathname === '/' && scrollPosition > 0) {
      scroll.scrollTo(0, { duration: 1000 });
      handleScroll();
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return <>{children}</>;
};

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * @function useScrollPosition
 * @description A custom hook that tracks the current scroll position and provides
 * utility flags based on the scroll position and current route. It can be used to
 * control animations or visibility of components based on the user's scroll position.
 * @returns {Object} An object containing the scroll position and boolean flags indicating
 * various scroll-based conditions.
 */

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { pathname } = useLocation();
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const isTopOfHomeOrExplorePage = scrollPosition === 0 && (pathname === '/' || pathname === '/explore');
  const isNotTopOfHomePage = scrollPosition > 0 || pathname !== '/';
  const isScrolled = scrollPosition > 0;
  const isHomePageOrScrolled = scrollPosition > 0 || pathname === '/';
  const isExploreOrHomeAndScrolled = pathname === '/explore' || (pathname === '/' && scrollPosition > 0);

  return { scrollPosition, isTopOfHomeOrExplorePage, isNotTopOfHomePage, isScrolled, isHomePageOrScrolled, isExploreOrHomeAndScrolled };
};

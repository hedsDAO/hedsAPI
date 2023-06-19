import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { useScrollPosition } from '@/components/Navbar/components/useScrollPosition/useScrollPosition';
import HedLogo from '@public/logo.svg';

/**
 * @function BrandLogo
 * @description BrandLogo component displays the brand logo. It adjusts the size of the logo
 * based on the current scroll position, which is managed by the `useScrollPosition` hook.
 * @returns {JSX.Element} Rendered BrandLogo component.
 */

export const BrandLogo = () => {
  const { scrollPosition } = useScrollPosition();
  const MotionImage = motion.img;
  const brandLogoControls = useAnimation();

  useEffect(() => {
    const brandImageWidth = scrollPosition === 0 ? '55px' : '45px';
    brandLogoControls.start({
      width: brandImageWidth,
    });
  }, [brandLogoControls, scrollPosition]);

  return (
    <Flex alignItems={'center'} as={Link} to="/">
      <MotionImage animate={brandLogoControls} src={HedLogo} height="auto" transition={{ type: 'spring', damping: 20, stiffness: 100 }} />
    </Flex>
  );
};

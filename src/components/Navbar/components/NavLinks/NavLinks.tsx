import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { Button, Text } from '@chakra-ui/react';
import { useScrollPosition } from '@/components/Navbar/components/useScrollPosition/useScrollPosition';
import * as styles from '@/components/Navbar/components/NavLinks/styles';
import { Link } from 'react-router-dom';

/**
 * @function NavLinks
 * @description NavLinks component renders the navigation links in the Navbar.
 * The current active link is highlighted.
 * @param {Object} props - Component props.
 * @param {string} props.text - Link text.
 * @param {string} props.link - Link URL.
 * @returns {JSX.Element} Rendered NavLinks component.
 */

export const NavLinks = ({ text, link }: { text: string; link: string }) => {
  const { scrollPosition, isHomePageOrScrolled } = useScrollPosition();
  const { pathname } = useLocation();
  const textControls = useAnimation();
  const MotionText = motion.p;

  useEffect(() => {
    const textMarginTop = isHomePageOrScrolled ? 0 : 8;
    textControls.start({
      marginTop: textMarginTop,
    });
  }, [scrollPosition, pathname]);

  return (
    <Button as={Link} to={link} {...styles.$textStyles}>
      <MotionText animate={textControls} transition={{ type: 'spring', damping: 20, stiffness: 100 }}>
        {text}
      </MotionText>
    </Button>
  );
};

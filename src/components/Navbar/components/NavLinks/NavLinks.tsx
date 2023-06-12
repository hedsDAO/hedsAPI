import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@chakra-ui/react';
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
  const textControls = useAnimation();
  const MotionText = motion.p;

  useEffect(() => {
    const textMarginTop = scrollPosition === 0 ? '0.5px' : '2.5px';
    textControls.start({
      marginTop: textMarginTop,
    });
  }, [scrollPosition, MotionText, isHomePageOrScrolled]);

  return (
    <Button as={Link} to={link} {...styles.$textStyles}>
      <MotionText animate={textControls} transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
        {text}
      </MotionText>
    </Button>
  );
};

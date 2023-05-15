import { useEffect } from 'react';
import { Box, useTheme } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useScrollPosition } from '@/components/Navbar/components/useScrollPosition/useScrollPosition';

/**
 * @function NavbarContainer
 * @description NavbarContainer component acts as a wrapper for the Navbar.
 * It contains logic for animating and styling the Navbar based on the scroll position.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Children components to render inside the NavbarContainer.
 * @returns {JSX.Element} Rendered NavbarContainer component.
 */

export const NavbarContainer = ({ children }: { children: React.ReactNode }) => {
  const { scrollPosition, isTopOfHomeOrExplorePage, isScrolled, isNotTopOfHomePage, isExploreOrHomeAndScrolled } = useScrollPosition();
  const theme = useTheme();
  const MotionBox = motion.div;
  const boxControls = useAnimation();

  useEffect(() => {
    const boxPosition = isTopOfHomeOrExplorePage ? '-100%' : '0';
    const boxBackgroundColor = isScrolled ? 'rgba(24, 21, 28, 1)' : 'rgba(24, 21, 28, 1)';
    const boxPadding = isTopOfHomeOrExplorePage ? 0 : isExploreOrHomeAndScrolled ? 3 : isScrolled ? 5 : 14;
    boxControls.start({
      y: boxPosition,
      opacity: isNotTopOfHomePage && isScrolled ? 0.75 : 1,
      backgroundColor: boxBackgroundColor,
      paddingTop: boxPadding,
      paddingBottom: boxPadding,
    });
  }, [scrollPosition]);

  return (
    <Box as={MotionBox} position="fixed" top={0} left={0} right={0} zIndex={theme.zIndices.sticky}>
      <MotionBox animate={boxControls} style={{ y: '-100%', opacity: 1 }} transition={{ type: 'spring', damping: 20, stiffness: 100 }}>
        {children}
      </MotionBox>
    </Box>
  );
};

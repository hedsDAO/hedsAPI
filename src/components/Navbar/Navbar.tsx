import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Dispatch, store } from '@/store';
import { Avatar, Box, Button, Flex, Image, ImageProps, Text, useTheme } from '@chakra-ui/react';

import HedLogo from '@public/logo.svg';
import { Modals } from '@/modals/models/modalModel';

const MotionBox = motion.div;
const MotionImage = motion.img;
const MotionText = motion.p;

export const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isConnected } = useAccount();
  const connectedUser = useSelector(store.select.authModel.selectUser);
  const dispatch = useDispatch<Dispatch>();
  
  const boxControls = useAnimation();
  const imageControls = useAnimation();
  const textControls = useAnimation();
  const theme = useTheme();

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    boxControls.start({
      backgroundColor: scrollPosition > 0 ? 'rgba(24, 21, 28, 0.7)' : 'rgba(24, 21, 28, 1)',
      paddingTop: scrollPosition > 0 ? 4 : 12,
      paddingBottom: scrollPosition > 0 ? 4 : 12,
    });
    imageControls.start({
      width: scrollPosition > 0 ? '30px' : '75px',
    });
    textControls.start({
      marginTop: scrollPosition > 0 ? 0 : 8,
    });
  }, [scrollPosition, boxControls, imageControls, textControls]);

  const navLinks = {
    explore: {
      text: 'explore',
      link: '/explore',
      isActive: pathname === '/explore',
    },
    tapes: {
      text: 'tapes',
      link: '/tapes',
      isActive: pathname === '/tapes',
    },
    about: {
      text: 'about',
      link: '/about',
      isActive: pathname === '/about',
    },
  };

  return (
    <Box as={MotionBox} position="fixed" top={0} left={0} right={0} zIndex={theme.zIndices.sticky}>
      <MotionBox animate={boxControls} transition={{ type: 'spring', damping: 20, stiffness: 100 }}>
        <Flex px={10} alignItems="center" justifyContent={'space-between'}>
          <Flex gap={10}>
            <MotionImage animate={imageControls} src={HedLogo} height="auto" transition={{ type: 'spring', damping: 20, stiffness: 100 }} />
            <Flex gap={5}>
              {Object.values(navLinks).map((link) => (
                <Text
                  key={link.link}
                  to={link.link}
                  as={Link}
                  opacity={link.isActive ? '100%' : '70%'}
                  letterSpacing={'wide'}
                  fontSize="xs"
                  textTransform={'uppercase'}
                  fontFamily={'karla'}
                  color="white"
                  fontWeight={'light'}
                >
                  <MotionText animate={textControls} transition={{ type: 'spring', damping: 20, stiffness: 100 }}>
                    {link.text}
                  </MotionText>
                </Text>
              ))}
            </Flex>
          </Flex>
          {isConnected ? (
            <Avatar
              pointerEvents={'auto'}
              role="button"
              onClick={() => navigate(`/u/${connectedUser.wallet}`)}
              size="sm"
              variant={'user'}
              src={connectedUser?.profile_picture}
              _hover={{ transform: 'scale(1.02)' }}
            />
          ) : (
            <Button
              rounded={'full'}
              py={1}
              px={2}
              h={7}
              letterSpacing={'widest'}
              color="heds.400"
              fontSize={'sm'}
              fontFamily={'karla'}
              fontWeight={'normal'}
              bg="transparent"
              _hover={{ bg: 'transparent', color: 'heds.300' }}
              borderColor={'transparent'}
              onClick={() => dispatch.modalModel.setModal(Modals.CONNECT)}
            >
              connect
            </Button>
          )}
        </Flex>
      </MotionBox>
    </Box>
  );
};

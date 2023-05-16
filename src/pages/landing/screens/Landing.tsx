import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { useLocation, useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    console.log(scrollPosition, windowHeight);
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
  return (
    <>
      <Box position="relative" width="100vw" height="100vh" overflow="hidden">
        <Image
          src="https://www.heds.cloud/ipfs/QmfMEiTip2jMB1xHL4ciaenMQxh5XghyUtSN4dAY4nqjDq" // Change this to your video path
          width="100%"
          height="100%"
          objectFit="cover"
        />
        <Box position="absolute" top={{ base: '20', lg: 'unset' }} bottom={{ base: 'unset', lg: '20' }} left={{ base: '10', lg: '20' }} p={5}>
          <Flex gap={5}>
            <Box opacity="80%" bg="white" width="12px" minH="full"></Box>
            <VStack justify={'end'} align="start">
              <Text mt={{ lg: '2 !important' }} fontFamily={'"Space Mono", monospace'} fontStyle={'italic'} fontSize={{ base: '2xs', lg: 'sm' }} color="white">
                heds presents:
              </Text>
              <Text
                mt={{ base: '2 !important', lg: '4 !important' }}
                mb={{ base: '-2 !important', lg: '-6 !important' }}
                fontFamily={'"Space Mono", monospace'}
                fontSize={{ base: 'md', lg: '4xl' }}
                color="white"
              >
                Reo Cragun
              </Text>
              <Text
                mb={{ lg: '-4 !important' }}
                fontWeight={'extrabold'}
                fontFamily={'"Space Mono", monospace'}
                fontSize={{ base: '3xl', lg: '6xl' }}
                color="white"
              >
                hedsTAPE 13
              </Text>
            </VStack>
          </Flex>
        </Box>
        <Box position="absolute" bottom="20" right={{ base: '10', lg: '20' }} p={5}>
          <VStack color="white" fontSize="3xl" align="center" spacing={10}>
            <i className="fa-regular fa-circle-user"></i>
            <i className="fa-sharp fa-light fa-cassette-tape"></i>
            <i className="fa-regular fa-circle-play"></i>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

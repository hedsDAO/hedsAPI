import { useState } from 'react';
import { Box, Flex, Image, Center, useBreakpointValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

export const Explore = () => {
  const items = [
    'https://www.heds.cloud/ipfs/QmSy3SvxY9HPvH2cEjb1NT8Y5rfcCmaWEge2vxhFvRvXj1',
    'https://www.heds.cloud/ipfs/QmbnGKrUsfRwxcPNxdXuKwHFmtu29F7UYSAfY5aEMGZtPc',
    'https://www.heds.cloud/ipfs/QmY2z5HEK6rD3SQ27MPpitZmqeqywKEwB7Ci1ABjqwe6J9',
    'https://www.heds.cloud/ipfs/QmfDej1TKoo7Aqi1Pf5P6WGzPus4RzWi2tq77U3MzxzWt6',
    'https://www.heds.cloud/ipfs/QmQTv6yF5rQCxwgXa6AKHJZGx1NUwS4KVAwjrg6muLzufJ',
  ];
  const [activeIndex, setActiveIndex] = useState(2);
  const imageSize = useBreakpointValue({ base: '200px', md: '300px' });
  const imageSizeInteger = useBreakpointValue({ base: 200, md: 300 });
  const handlePrev = () => setActiveIndex((old) => (old === 0 ? items.length - 1 : old - 1));
  const handleNext = () => setActiveIndex((old) => (old === items.length - 1 ? 0 : old + 1));
  const calculateZIndex = (offset: number) => (offset === 0 ? 2 : offset === 1 || offset === -1 ? 1 : 0);
  const calculateScale = (offset: number) => (offset === 0 ? 1.3 : 1);

  return (
    <Center minH="400px" position="relative" style={{ perspective: 1000 }}>
      <MotionBox position="absolute" left={0} onClick={handlePrev} p={4} cursor="pointer" fontSize="2xl" zIndex="1" color="white">
        {'<'}
      </MotionBox>
      <Flex w="full" overflow="hidden" justifyContent="center" alignItems="center">
        <AnimatePresence initial={false} custom={activeIndex}>
          {items.map((src, i) => {
            const offset = i - activeIndex;
            const isCenter = offset === 0;
            return (
              <MotionBox
                key={i}
                position="absolute"
                shadow="md"
                zIndex={calculateZIndex(offset)} // Adjust zIndex based on position
                initial={{ x: offset * 200 }} // Adjust x value here
                animate={{
                  x: offset * 200,
                  scale: calculateScale(offset),
                  rotateY: isCenter ? 0 : '45deg',
                  // height: isCenter ? imageSize: '250px',
                  // width: isCenter ? imageSize: '300px',
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              >
                <Image onClick={() => setActiveIndex(i)} rounded={'lg'} src={src} h={imageSize} w={imageSize} />
              </MotionBox>
            );
          })}
        </AnimatePresence>
      </Flex>
      <MotionBox position="absolute" right={0} onClick={handleNext} p={4} cursor="pointer" fontSize="2xl" zIndex="1" color="white">
        {'>'}
      </MotionBox>
    </Center>
  );
};

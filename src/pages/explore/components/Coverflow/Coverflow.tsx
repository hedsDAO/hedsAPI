import { Dispatch, store } from '@/store';
import { Box, Center, Flex, Image, useBreakpointValue } from '@chakra-ui/react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { items } from '@/pages/explore/models/constants';
import { Link } from 'react-router-dom';

/**
 * @function Coverflow
 * @description Renders the image carousel in the style of a coverflow for the explore page.
 * @returns {JSX.Element} - Rendered Coverflow component.
 **/

// TODO: refactor styles and logic - current: mvp

const MotionBox = motion(Box);
export const Coverflow = () => {
  const dispatch = useDispatch<Dispatch>();
  const activeIndex = useSelector(store.select.exploreModel.selectActiveIndex);
  const imageSize = useBreakpointValue({ base: 200, md: 400 });
  const handlePrev = () => dispatch.exploreModel.setActiveIndex(activeIndex === 0 ? items.length - 1 : activeIndex - 1);
  const handleNext = () => dispatch.exploreModel.setActiveIndex(activeIndex === items.length - 1 ? 0 : activeIndex + 1);
  const calculateZIndex = (offset: number) => (offset === 0 ? 2 : -Math.abs(offset) + 1);

  const handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void = (_, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) > 0;
    const swipePower = Math.abs(offset.x) * velocity.x;
    if (swipePower > 50 || swipe) {
      if (offset.x > 0) dispatch.exploreModel.setActiveIndex(activeIndex === 0 ? items.length - 1 : activeIndex - 1);
      else dispatch.exploreModel.setActiveIndex(activeIndex === items.length - 1 ? 0 : activeIndex + 1);
    }
  };
  
  return (
    <Center
      mt={{ base: 5, lg: -10 }}
      mb={{ base: 20, lg: 20 }}
      maxW="100vw"
      overflow={'hidden'}
      minH={{ base: imageSize + 150, lg: imageSize + 350 }}
      position="relative"
      style={{ perspective: 1000 }}
    >
      <MotionBox position="absolute" left={0} onClick={handlePrev} p={4} cursor="pointer" fontSize="2xl" zIndex="1" color="white">
        <i className="fa-solid fa-chevron-left"></i>
      </MotionBox>
      <Flex w="full" overflow="hidden" justifyContent="center" alignItems="center">
        <AnimatePresence initial={false} custom={activeIndex}>
          {items.map((src, i) => {
            const offset = i - activeIndex;
            return (
              <MotionBox
                key={i}
                width={imageSize}
                height={imageSize}
                position="absolute"
                shadow="md"
                zIndex={calculateZIndex(offset)}
                initial={{ x: offset * 200 }}
                animate={{
                  x: i === activeIndex ? 0 : Math.abs(offset) === 1 ? offset * 250 : offset * 200,
                  y: -0.5 * Math.abs(5 * offset),
                  scale: offset === 0 ? 1.3 : 1 - 0.05 * Math.abs(offset),
                  rotateY: i === activeIndex ? 0 : offset * 10,
                  skewY: i === activeIndex ? 0 : offset * 0.25,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                drag={'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.35}
                onDragEnd={handleDragEnd}
                onClick={i === activeIndex ? () => {} : () => dispatch.exploreModel.setActiveIndex(i)}
              >
                <Box position="relative">
                  { activeIndex === i ? 
                    <Box overflow="hidden" to={src.link} as={Link}>
                      <Image draggable={false} objectFit={'cover'} rounded={'lg'} src={src.cover} h={imageSize} w={imageSize} />
                    </Box> :
                    <Box overflow="hidden">
                    <Image draggable={false} objectFit={'cover'} rounded={'lg'} src={src.cover} h={imageSize} w={imageSize} />
                  </Box>
                  }
                  <Box
                    position="absolute"
                    top="100%"
                    left={0}
                    width="100%"
                    height="100%"
                    _after={{
                      rounded: 'lg',
                      content: '""',
                      zIndex: calculateZIndex(offset),
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${src.cover})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      transform: 'scaleY(-1)',
                      opacity: i === activeIndex ? '20%' : `${2 * (1 / Math.abs(offset))}%`,
                    }}
                  />
                </Box>
              </MotionBox>
            );
          })}
        </AnimatePresence>
      </Flex>
      <MotionBox position="absolute" right={0} onClick={handleNext} p={4} cursor="pointer" fontSize="2xl" zIndex="1" color="white">
        <i className="fa-solid fa-chevron-right"></i>
      </MotionBox>
    </Center>
  );
};

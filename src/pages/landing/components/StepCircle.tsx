import { Icon, Flex } from '@chakra-ui/react';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons';
import { animated, useInView } from 'react-spring';

interface ownProps {
  multiplier: number;
}

export const StepCircle = ({ multiplier }: ownProps) => {
  const rootMarginPercentage = 15 + multiplier * 5;

  const [dashedRef, dashedProps] = useInView(
    () => ({
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0,
      },
      config: {
        tension: 30,
      },
      delay: 1000,
    }),
    {
      rootMargin: `-${rootMarginPercentage}% 0px`,
      once: true,
    },
  );
  const [checkRef, checkProps] = useInView(
    () => ({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      config: {
        velocity: -1,
        tension: 20,
      },
    }),
    {
      rootMargin: `-${rootMarginPercentage}% 0px`,
      once: true,
    },
  );

  return (
    <Flex justify="center">
      <animated.div ref={dashedRef} style={{ position: 'fixed', zIndex: 1, ...dashedProps }}>
        <Icon as={IconCircleDashed} boxSize="8" />
      </animated.div>
      <animated.div ref={checkRef} style={{ position: 'fixed', zIndex: 0, ...checkProps }}>
        <Icon as={IconCircleCheck} color="black" boxSize="8" />
      </animated.div>
    </Flex>
  );
};

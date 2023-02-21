import { Icon, Flex } from '@chakra-ui/react';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons';
import { animated, useInView } from 'react-spring';

interface ownProps {
  dashedProps: any;
  checkProps: any;
}

export const StepCircle = ({ dashedProps, checkProps }: ownProps) => {
  return (
    <Flex justify="center">
      <animated.div style={{ position: 'fixed', zIndex: 1, ...dashedProps }}>
        <Icon as={IconCircleDashed} boxSize="8" />
      </animated.div>
      <animated.div style={{ position: 'fixed', zIndex: 0, ...checkProps }}>
        <Icon as={IconCircleCheck} color="black" boxSize="8" />
      </animated.div>
    </Flex>
  );
};
